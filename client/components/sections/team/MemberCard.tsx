import Image from "next/image";
import type { Member } from "@/lib/types/cms.types";
import { Card } from "@/components/ui/Card";

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
      <div className="flex flex-col items-center p-6">
        {/* Photo */}
        <div className="relative h-24 w-24 overflow-hidden rounded-full bg-muted">
          {member.photoUrl ? (
            <Image
              src={member.photoUrl}
              alt={member.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-muted-foreground">
              {member.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Info */}
        <h3 className="mt-4 text-base font-semibold text-foreground text-center">
          {member.name}
        </h3>
        <p className="text-sm text-muted-foreground text-center">
          {member.role}
        </p>
        {member.major && (
          <p className="mt-1 text-xs text-muted-foreground text-center">
            {member.major}
          </p>
        )}
        {member.introduction && (
          <p className="mt-2 text-xs text-muted-foreground text-center line-clamp-3">
            {member.introduction}
          </p>
        )}
      </div>
    </Card>
  );
}
