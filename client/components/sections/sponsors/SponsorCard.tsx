import AnimatedSection from "@/components/shared/AnimatedSection";

interface SponsorCardProps {
  name: string;
  logoUrl: string | null;
  websiteUrl?: string;
  description?: string;
}

export default function SponsorCard({
  name,
  logoUrl,
  websiteUrl,
  description,
}: SponsorCardProps) {
  const content = (
    <div className="flex flex-col items-center p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={name}
          className="h-16 w-auto object-contain"
        />
      ) : (
        <div className="h-16 flex items-center justify-center text-lg font-semibold text-muted-foreground">
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
