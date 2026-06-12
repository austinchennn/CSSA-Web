import { v2 as cloudinary } from 'cloudinary';
import pg from 'pg';
import fs from 'fs';
import path from 'path';

const { Client } = pg;

cloudinary.config({
  cloud_name: 'dv7vrwclf',
  api_key: '355267631183558',
  api_secret: 'cP8xh94a-yYtbzU61mPYXv6n6RY',
});

const DB_URL = 'postgresql://postgres:qHrPKOEHSRSEhoWkvOpYDaobghzDONwV@zephyr.proxy.rlwy.net:42404/railway';
const PHOTO_DIR = '/Users/austin/Desktop/未命名文件夹';

// 文件名 -> member id 映射（从数据库查到的）
const memberMap = {
  '舒越Allen': 28,
  'Austin陈冠诚': 25,
  'Jackson李秉骏': 23,
  'Jenny 林楚杭': 24,
  'Lucy闫璐彤': 26,
  'Marcus刘博远': 29,
  'Rheya闵宸扬': 27,
  'Sherry 石佳玉': 22,
  'Tan谭巍琦': 10,
  'Victor 陈思屹': 20,
};

// member id -> 现有 file id 映射
const existingFileMap = {
  28: 7,
  25: 2,
  23: 1,
  24: 3,
  26: 4,
  29: 8,
  27: 11,
  22: 12,
  10: 13,
  20: 10,
};

async function main() {
  const client = new Client({ connectionString: DB_URL });
  await client.connect();
  console.log('Connected to DB');

  const files = fs.readdirSync(PHOTO_DIR).filter(f => f.endsWith('.avif'));

  for (const filename of files) {
    const nameWithoutExt = filename.replace('.avif', '');
    const memberId = memberMap[nameWithoutExt];
    if (!memberId) {
      console.log(`Skip: no member found for "${nameWithoutExt}"`);
      continue;
    }

    const filePath = path.join(PHOTO_DIR, filename);
    const publicId = `members/${nameWithoutExt.replace(/\s+/g, '_')}`;

    console.log(`Uploading ${filename} -> Cloudinary public_id: ${publicId}`);

    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
    });

    console.log(`  ✓ Uploaded: ${result.secure_url}`);

    const fileId = existingFileMap[memberId];
    const now = new Date().toISOString();

    if (fileId) {
      // 更新现有 files 记录
      await client.query(
        `UPDATE files SET
          name = $1,
          url = $2,
          provider = 'cloudinary',
          provider_metadata = $3,
          ext = '.avif',
          mime = 'image/avif',
          size = $4,
          width = $5,
          height = $6,
          hash = $7,
          formats = NULL,
          updated_at = $8
        WHERE id = $9`,
        [
          filename,
          result.secure_url,
          JSON.stringify({ public_id: result.public_id, resource_type: 'image' }),
          Math.round(result.bytes / 1024 * 100) / 100,
          result.width,
          result.height,
          result.public_id,
          now,
          fileId,
        ]
      );
      console.log(`  ✓ Updated files record id=${fileId} for member id=${memberId}`);
    } else {
      // 创建新 files 记录
      const insertRes = await client.query(
        `INSERT INTO files (name, url, provider, provider_metadata, ext, mime, size, width, height, hash, folder_path, created_at, updated_at)
         VALUES ($1, $2, 'cloudinary', $3, '.avif', 'image/avif', $4, $5, $6, $7, '/', $8, $8)
         RETURNING id`,
        [
          filename,
          result.secure_url,
          JSON.stringify({ public_id: result.public_id, resource_type: 'image' }),
          Math.round(result.bytes / 1024 * 100) / 100,
          result.width,
          result.height,
          result.public_id,
          now,
        ]
      );
      const newFileId = insertRes.rows[0].id;

      await client.query(
        `INSERT INTO files_related_morphs (file_id, related_id, related_type, field, "order")
         VALUES ($1, $2, 'api::member.member', 'photo', 1)`,
        [newFileId, memberId]
      );
      console.log(`  ✓ Created files record id=${newFileId} for member id=${memberId}`);
    }
  }

  await client.end();
  console.log('\nDone!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
