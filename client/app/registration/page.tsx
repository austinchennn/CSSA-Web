import type { Metadata } from "next";
import { getActiveEvents } from "@/lib/graphql";
import SectionHeader from "@/components/shared/SectionHeader";
import RegistrationPanel from "@/components/sections/join/RegistrationPanel";

export const metadata: Metadata = {
  title: "活动报名",
};

export const revalidate = 30;

export default async function RegistrationPage() {
  const activeEvents = await getActiveEvents().catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="活动报名"
        subtitle="报名参加我们正在进行的活动"
      />
      {activeEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            当前暂无开放报名的活动。
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            请关注我们的社交媒体获取最新活动信息。
          </p>
        </div>
      ) : (
        <RegistrationPanel events={activeEvents} />
      )}
    </div>
  );
}
