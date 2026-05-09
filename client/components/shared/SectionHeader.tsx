import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

/**
 * Reusable section header with title and optional subtitle.
 */
export default function SectionHeader({
  title,
  subtitle,
  className,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-primary" />
    </div>
  );
}
