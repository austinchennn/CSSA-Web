import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDepartments, getDepartmentById } from "@/lib/graphql";

export const revalidate = 300;

export async function generateStaticParams() {
  const departments = await getDepartments();
  return departments.map((d) => ({ id: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const dept = await getDepartmentById(id);
  return { title: dept ? `${dept.name} — 部门介绍` : "部门介绍" };
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dept = await getDepartmentById(id);

  if (!dept) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <Link
        href="/departments"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        ← 返回部门列表
      </Link>

      <h1 className="text-4xl font-bold text-foreground mb-2">{dept.name}</h1>
      <div className="h-1 w-16 bg-primary rounded-full mb-12" />

      <div className="grid gap-6 md:grid-cols-1">
        {/* 部长介绍 */}
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-lg font-semibold text-primary mb-1">部长介绍</h2>
          {dept.leader_name && (
            <p className="text-sm font-medium text-foreground mb-3">{dept.leader_name}</p>
          )}
          {dept.leader_introduction ? (
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {dept.leader_introduction}
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">暂无介绍</p>
          )}
        </div>

        {/* 部门介绍 */}
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-lg font-semibold text-primary mb-4">部门介绍</h2>
          {dept.introduction ? (
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {dept.introduction}
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">暂无介绍</p>
          )}
        </div>

        {/* 加入部门有什么提升 */}
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-lg font-semibold text-primary mb-4">加入我们有什么提升</h2>
          {dept.benefits ? (
            <ul className="space-y-3">
              {dept.benefits.split("\n").filter(Boolean).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">暂无信息</p>
          )}
        </div>

        {/* 部门成员 */}
        {dept.members.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-lg font-semibold text-primary mb-6">部门成员</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {dept.members.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 text-center"
                >
                  {member.photoUrl ? (
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-lg">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground leading-snug">{member.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
