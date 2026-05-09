import AnimatedSection from "@/components/shared/AnimatedSection";

interface AboutPreviewProps {
  description?: string;
}

export default function AboutPreview({ description }: AboutPreviewProps) {
  const text =
    description ||
    "我们致力于为密西沙加校区的中国学生提供学术、社交和文化支持，打造温暖的校园社区。";

  return (
    <AnimatedSection className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          关于我们
        </h2>
        <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-primary" />
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
          {text}
        </p>
      </div>
    </AnimatedSection>
  );
}
