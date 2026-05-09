import type { Metadata } from "next";
import { getActiveEvents, getSiteConfig } from "@/lib/graphql";
import SectionHeader from "@/components/shared/SectionHeader";
import JoinPageClient from "./JoinPageClient";

export const metadata: Metadata = {
  title: "Join Us",
};

export const revalidate = 30;

export default async function JoinPage() {
  const [activeEvents, siteConfig] = await Promise.all([
    getActiveEvents().catch(() => []),
    getSiteConfig().catch(() => null),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="加入我们"
        subtitle={siteConfig?.join_us_description || "欢迎加入 UTMCSSA 大家庭！"}
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
        <JoinPageClient events={activeEvents} />
      )}
    </div>
  );
}
