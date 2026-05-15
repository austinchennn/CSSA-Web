import type { Metadata } from "next";
import Link from "next/link";
import { getDepartments } from "@/lib/graphql";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = { title: "部门介绍" };
export const revalidate = 300;

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader title="部门介绍" subtitle="了解 UTMCSSA 各部门的职能与文化" />

      {departments.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">暂无部门信息。</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {departments.map((dept) => (
            <Link
              key={dept.id}
              href={`/departments/${dept.id}`}
              className="group block rounded-2xl border border-border bg-card p-6 hover:border-primary hover:shadow-md transition-all duration-200"
            >
              <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                {dept.name}
              </h2>
              {dept.introduction && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {dept.introduction}
                </p>
              )}
              <span className="mt-4 inline-block text-xs text-primary font-medium">
                了解更多 →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
