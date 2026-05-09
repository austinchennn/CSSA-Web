import type { Member } from "@/lib/types/cms.types";
import MemberCard from "./MemberCard";
import AnimatedSection from "@/components/shared/AnimatedSection";

interface DepartmentGroupProps {
  departmentName: string;
  members: Member[];
}

export default function DepartmentGroup({
  departmentName,
  members,
}: DepartmentGroupProps) {
  return (
    <AnimatedSection className="mb-16">
      <h3 className="text-2xl font-bold text-foreground mb-2">
        {departmentName}
      </h3>
      <div className="h-0.5 w-12 bg-primary rounded-full mb-8" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </AnimatedSection>
  );
}
