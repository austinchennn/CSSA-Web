import AnimatedSection from "@/components/shared/AnimatedSection";
import { fetchSponsors } from "@/lib/graphql/queries/sponsors.queries";

export default async function SponsorsStrip() {
  const sponsors = await fetchSponsors().catch(() => []);

  if (sponsors.length === 0) return null;

  return (
    <AnimatedSection className="py-16 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          合作伙伴
        </h2>
        <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-primary" />
        <p className="mt-6 text-muted-foreground">
          感谢我们的赞助商和合作伙伴对 UTMCSSA 的支持。
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-8 items-center">
          {sponsors.map((sponsor) => {
            const card = (
              <div className="flex flex-col items-center gap-2">
                {sponsor.logoUrl ? (
                  <img
                    src={sponsor.logoUrl}
                    alt={sponsor.name}
                    className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  />
                ) : (
                  <span className="text-lg font-semibold text-muted-foreground">
                    {sponsor.name}
                  </span>
                )}
              </div>
            );

            return sponsor.websiteUrl ? (
              <a
                key={sponsor.id}
                href={sponsor.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {card}
              </a>
            ) : (
              card
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
