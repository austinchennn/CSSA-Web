import AnimatedSection from "@/components/shared/AnimatedSection";

interface SponsorCardProps {
  name: string;
  logoUrl: string | null;
  websiteUrl?: string;
  description?: string;
  featured?: boolean;
}

export default function SponsorCard({
  name,
  logoUrl,
  websiteUrl,
  description,
  featured = false,
}: SponsorCardProps) {
  const content = (
    <div className={`flex flex-col items-center rounded-lg border border-border bg-card hover:shadow-md transition-shadow ${featured ? "p-8" : "p-6"}`}>
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={name}
          className={`w-auto object-contain ${featured ? "h-28" : "h-16"}`}
        />
      ) : (
        <div className={`flex items-center justify-center font-semibold text-muted-foreground ${featured ? "h-28 text-xl" : "h-16 text-lg"}`}>
          {name}
        </div>
      )}
      <h4 className="mt-3 font-medium text-foreground">{name}</h4>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground text-center line-clamp-2">
          {description}
        </p>
      )}
    </div>
  );

  if (websiteUrl) {
    return (
      <AnimatedSection>
        <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      </AnimatedSection>
    );
  }

  return <AnimatedSection>{content}</AnimatedSection>;
}
