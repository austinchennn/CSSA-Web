import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDepartments, getDepartmentById } from "@/lib/graphql";
import MemberCard from "@/components/sections/team/MemberCard";

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
  return { title: dept ? dept.name : "部门详情" };
}

export default async function DepartmentPage({
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
        href="/team"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        ← 返回团队
      </Link>

      <h1 className="text-4xl font-bold text-foreground mb-2">{dept.name}</h1>
      <div className="h-1 w-16 bg-primary rounded-full mb-12" />

      {dept.introduction && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-3">部门介绍</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {dept.introduction}
          </p>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3">部长介绍</h2>
        <p className="text-sm text-primary font-medium mb-2">{dept.leader_name}</p>
        {dept.leader_introduction ? (
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {dept.leader_introduction}
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">暂无介绍</p>
        )}
      </section>

      {dept.benefits && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-3">加入我们有什么收获</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {dept.benefits}
          </p>
        </section>
      )}

      {dept.members.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">团队成员</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {dept.members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
