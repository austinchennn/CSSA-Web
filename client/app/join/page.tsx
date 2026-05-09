import type { Metadata } from "next";
import Link from "next/link";
import { getSiteConfig } from "@/lib/graphql";
import SectionHeader from "@/components/shared/SectionHeader";
import { ROUTES } from "@/lib/constants/routes";

export const metadata: Metadata = {
  title: "加入我们",
};

export const revalidate = 300;

export default async function JoinPage() {
  const siteConfig = await getSiteConfig().catch(() => null);

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 text-center">
      <SectionHeader
        title="加入我们"
        subtitle={siteConfig?.join_us_description || "欢迎加入 UTMCSSA 大家庭！"}
      />
      <div className="mt-8">
        <Link
          href={ROUTES.REGISTRATION}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          查看活动报名 →
        </Link>
      </div>
    </div>
  );
}
