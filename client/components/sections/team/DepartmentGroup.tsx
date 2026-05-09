import Link from "next/link";
import type { Member } from "@/lib/types/cms.types";
import MemberCard from "./MemberCard";
import AnimatedSection from "@/components/shared/AnimatedSection";

interface DepartmentGroupProps {
  departmentName: string;
  departmentId?: string;
  members: Member[];
  horizontal?: boolean;
}

export default function DepartmentGroup({
  departmentName,
  departmentId,
  members,
  horizontal = false,
}: DepartmentGroupProps) {
  return (
    <AnimatedSection>
      {departmentId ? (
        <Link href={`/departments/${departmentId}`}>
          <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors inline-block">
            {departmentName}
          </h3>
        </Link>
      ) : (
        <h3 className="text-xl font-bold text-foreground mb-2">
          {departmentName}
        </h3>
      )}
      <div className="h-0.5 w-12 bg-primary rounded-full mb-6" />

      <div
        className={
          horizontal
            ? "flex gap-4"
            : "grid grid-cols-1 gap-4"
        }
      >
        {members.map((member) => (
          <div key={member.id} className={horizontal ? "flex-1 flex" : undefined}>
            <MemberCard member={member} />
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
