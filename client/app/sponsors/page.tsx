import type { Metadata } from "next";
import { fetchSponsors } from "@/lib/graphql/queries/sponsors.queries";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SponsorCard from "@/components/sections/sponsors/SponsorCard";

export const metadata: Metadata = {
  title: "Sponsors & Partnership",
};

export const revalidate = 300;

export default async function SponsorsPage() {
  const sponsors = await fetchSponsors();

  // Group sponsors by tier
  const tiers = ["gold", "silver", "bronze"] as const;
  const grouped = new Map<string, typeof sponsors>();
  for (const tier of tiers) {
    const tierSponsors = sponsors.filter((s) => s.tier === tier);
    if (tierSponsors.length > 0) {
      grouped.set(tier, tierSponsors);
    }
  }

  const tierLabels: Record<string, string> = {
    gold: "年度赞助",
    silver: "银牌赞助",
    bronze: "铜牌赞助",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="赞助合作"
        subtitle="感谢我们的赞助商和合作伙伴"
      />

      {sponsors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            暂无赞助商信息。
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            如果您有合作意向，欢迎联系我们。
          </p>
        </div>
      ) : (
        <>
          {tiers.map((tier) => {
            const tierSponsors = grouped.get(tier);
            if (!tierSponsors) return null;

            return (
              <AnimatedSection key={tier} className="mb-16">
                <h3 className="text-2xl font-bold text-foreground mb-8">
                  {tierLabels[tier]}
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {tierSponsors.map((sponsor) => (
                    <SponsorCard
                      key={sponsor.id}
                      name={sponsor.name}
                      logoUrl={sponsor.logoUrl}
                      websiteUrl={sponsor.websiteUrl}
                      description={sponsor.description}
                      featured={tier === "gold"}
                    />
                  ))}
                </div>
              </AnimatedSection>
            );
          })}
        </>
      )}

      {/* Partnership CTA */}
      <AnimatedSection className="text-center mt-8">
        <div className="rounded-2xl bg-primary/5 p-12">
          <h3 className="text-2xl font-bold text-foreground">
            成为我们的合作伙伴
          </h3>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            UTMCSSA 为您提供触达数千名大学生的机会。我们期待与您共创价值。
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            联系我们
          </a>
        </div>
      </AnimatedSection>
    </div>
  );
}
