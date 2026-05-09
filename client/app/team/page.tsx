import type { Metadata } from "next";
import { getDepartments, getMembers } from "@/lib/graphql";
import { groupBy } from "@/lib/utils/formatters";
import DepartmentGroup from "@/components/sections/team/DepartmentGroup";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Our Team",
};

export const revalidate = 120;

export default async function TeamPage() {
  const [members, departments] = await Promise.all([getMembers(), getDepartments()]);

  if (!members || members.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          title="管理层"
          subtitle="我们的团队成员"
        />
        <p className="text-center text-muted-foreground py-12">
          暂无成员信息，请稍后再试。
        </p>
      </div>
    );
  }

  const departmentIdMap = new Map(departments.map((d) => [d.name, d.id]));

  // Group members by department
  const grouped = groupBy(members, (m) => m.department || "其他");

  // Sort: put common executive groups first
  const sortedKeys = Array.from(grouped.keys()).sort((a, b) => {
    const priority = ["主席团", "Executive", "President"];
    const aIsPriority = priority.some((p) =>
      a.toLowerCase().includes(p.toLowerCase())
    );
    const bIsPriority = priority.some((p) =>
      b.toLowerCase().includes(p.toLowerCase())
    );
    if (aIsPriority && !bIsPriority) return -1;
    if (!aIsPriority && bIsPriority) return 1;
    return a.localeCompare(b, "zh");
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="管理层"
        subtitle="认识我们的团队成员"
      />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {sortedKeys.map((dept) => (
          <DepartmentGroup
            key={dept}
            departmentName={dept}
            departmentId={departmentIdMap.get(dept)}
            members={grouped.get(dept) || []}
          />
        ))}
      </div>
    </div>
  );
}
