interface TierSectionProps {
  tierName: string;
  benefits: string[];
}

export default function TierSection({ tierName, benefits }: TierSectionProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h4 className="text-lg font-semibold text-foreground capitalize">
        {tierName}
      </h4>
      {benefits.length > 0 && (
        <ul className="mt-3 space-y-2">
          {benefits.map((benefit, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              {benefit}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
