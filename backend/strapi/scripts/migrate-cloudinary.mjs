/**
 * 把 Strapi 媒体库里的所有图片从旧 Cloudinary 账号复制到新账号，并更新数据库里的 URL。
 *
 * 做法：按原 public_id 把每张图（包括 thumbnail/small/medium/large 各个尺寸）从旧账号的公开地址
 * 重新上传到新账号，再把 files 表里的 url / formats 改成新地址；其他表里（比如富文本）出现的
 * 旧账号地址，统一把 cloud name 替换成新的。只读取旧账号的公开图片地址，不需要旧账号的密钥。
 *
 * 可以重复运行：已经指向新账号的记录会跳过，失败的记录下次再跑会重试。
 *
 * 用法（在 backend/strapi 目录下）：
 *   OLD_CLOUDINARY_NAME=旧cloud名 \
 *   CLOUDINARY_NAME=新cloud名 CLOUDINARY_KEY=新key CLOUDINARY_SECRET=新secret \
 *   DATABASE_URL=postgresql://... \
 *   node scripts/migrate-cloudinary.mjs
 */
import { v2 as cloudinary } from 'cloudinary';
import pg from 'pg';

const { OLD_CLOUDINARY_NAME, CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET, DATABASE_URL } = process.env;

if (!OLD_CLOUDINARY_NAME || !CLOUDINARY_NAME || !CLOUDINARY_KEY || !CLOUDINARY_SECRET || !DATABASE_URL) {
  console.error('缺少环境变量：OLD_CLOUDINARY_NAME / CLOUDINARY_NAME / CLOUDINARY_KEY / CLOUDINARY_SECRET / DATABASE_URL');
  process.exit(1);
}
if (OLD_CLOUDINARY_NAME === CLOUDINARY_NAME) {
  console.error('新旧 cloud name 相同，不需要迁移');
  process.exit(1);
}

cloudinary.config({ cloud_name: CLOUDINARY_NAME, api_key: CLOUDINARY_KEY, api_secret: CLOUDINARY_SECRET });

const OLD_HOST = `res.cloudinary.com/${OLD_CLOUDINARY_NAME}/`;
const NEW_HOST = `res.cloudinary.com/${CLOUDINARY_NAME}/`;
const isOld = (url) => typeof url === 'string' && url.includes(OLD_HOST);

// 从旧地址拉取并按原 public_id 上传到新账号，返回新地址
async function copyAsset(url, meta) {
  const publicId = meta?.public_id;
  if (!publicId) throw new Error(`缺少 provider_metadata.public_id：${url}`);
  const res = await cloudinary.uploader.upload(url, {
    public_id: publicId,
    resource_type: meta.resource_type || 'image',
    overwrite: true,
  });
  return res.secure_url;
}

const db = new pg.Client({ connectionString: DATABASE_URL });
await db.connect();

// ── 1. files 表：逐个复制主图和各尺寸，写回新地址 ──
const { rows } = await db.query(
  `select id, name, url, formats, provider_metadata from files
   where url like $1 or formats::text like $1
   order by id`,
  [`%${OLD_HOST}%`],
);
console.log(`files 表里有 ${rows.length} 条记录需要迁移`);

const failed = [];
for (const [i, row] of rows.entries()) {
  try {
    const url = isOld(row.url) ? await copyAsset(row.url, row.provider_metadata) : row.url;
    const formats = row.formats || null;
    if (formats) {
      for (const f of Object.values(formats)) {
        if (isOld(f.url)) f.url = await copyAsset(f.url, f.provider_metadata);
      }
    }
    await db.query('update files set url = $1, formats = $2 where id = $3', [
      url,
      formats && JSON.stringify(formats),
      row.id,
    ]);
    console.log(`[${i + 1}/${rows.length}] ✓ #${row.id} ${row.name}`);
  } catch (err) {
    failed.push(row);
    console.error(`[${i + 1}/${rows.length}] ✗ #${row.id} ${row.name}：${err.message || err.error?.message || err}`);
  }
}

// ── 2. 其他表的文本/JSON 字段：把旧 cloud name 替换成新的 ──
// public_id 没变，只换 cloud name 就能指向新账号里的同一张图
const { rows: columns } = await db.query(
  `select table_name, column_name, data_type from information_schema.columns
   where table_schema = 'public' and table_name <> 'files'
     and data_type in ('text', 'character varying', 'json', 'jsonb')`,
);
for (const { table_name: t, column_name: c, data_type: type } of columns) {
  const cast = type === 'json' || type === 'jsonb' ? `::${type}` : '';
  const res = await db.query(
    `update "${t}" set "${c}" = replace("${c}"::text, $1, $2)${cast} where "${c}"::text like $3`,
    [OLD_HOST, NEW_HOST, `%${OLD_HOST}%`],
  );
  if (res.rowCount) console.log(`${t}.${c}：替换了 ${res.rowCount} 行`);
}

// ── 3. 汇总 ──
const { rows: [left] } = await db.query(
  `select count(*)::int as n from files where url like $1 or formats::text like $1`,
  [`%${OLD_HOST}%`],
);
await db.end();

console.log(`\n完成：成功 ${rows.length - failed.length}，失败 ${failed.length}，files 表里还剩 ${left.n} 条旧地址`);
if (failed.length) {
  console.log('失败的记录可以直接重跑本脚本重试；如果一直失败，在 Strapi 后台重新上传这些图片：');
  for (const r of failed) console.log(`  #${r.id} ${r.name}  ${r.url}`);
  process.exit(1);
}
