import AnimatedSection from "@/components/shared/AnimatedSection";

export default function SponsorsStrip() {
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
      </div>
    </AnimatedSection>
  );
}
