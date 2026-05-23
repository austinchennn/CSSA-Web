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

  const EXECUTIVE_KEY = "主席团";

  // 主席团：全员展示；其他部门：只展示含"部长"职位的成员
  const filtered = members.filter((m) => {
    if (m.department === EXECUTIVE_KEY) return true;
    return m.role?.includes("部长");
  });

  const grouped = groupBy(filtered, (m) => m.department || "其他");

  const executiveMembers = grouped.get(EXECUTIVE_KEY) || [];
  // 用 Strapi 的 display_order 排序，未设置的部门排末尾
  const deptOrderMap = new Map(departments.map((d) => [d.name, d.displayOrder ?? 99]));

  const otherKeys = Array.from(grouped.keys())
    .filter((k) => k !== EXECUTIVE_KEY)
    .sort((a, b) => (deptOrderMap.get(a) ?? 99) - (deptOrderMap.get(b) ?? 99));

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="管理层"
        subtitle="认识我们的团队成员"
      />

      {/* 主席团：单独一行，成员横向排列 */}
      {executiveMembers.length > 0 && (
        <div className="mb-12">
          <DepartmentGroup
            departmentName={EXECUTIVE_KEY}
            departmentId={departmentIdMap.get(EXECUTIVE_KEY)}
            members={executiveMembers}
            horizontal
          />
        </div>
      )}

      {/* 各部门：三列网格 */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {otherKeys.map((dept) => (
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
