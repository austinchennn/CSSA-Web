import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/graphql";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { BookOpen, Users, Calendar, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
};

export const revalidate = 300;

const serviceItems = [
  {
    icon: BookOpen,
    title: "学术支持",
    description: "提供课程咨询、学习资源分享和学术交流平台，助力学业发展。",
  },
  {
    icon: Users,
    title: "新生支持",
    description: "帮助新生适应校园生活，提供接机、选课、住房等全方位指导。",
  },
  {
    icon: Calendar,
    title: "活动组织",
    description: "举办丰富多彩的文化、社交和学术活动，丰富校园生活。",
  },
  {
    icon: Globe,
    title: "资源整合",
    description: "整合校内外资源，为学生提供实习、就业和生活信息。",
  },
];

export default async function AboutPage() {
  const siteConfig = await getSiteConfig().catch(() => null);

  const aboutDescription =
    siteConfig?.about_description ||
    "多伦多大学密西沙加校区中国学生学者联合会（UTMCSSA）致力于为中国留学生提供全方位的支持和服务，帮助大家更好地适应海外学习生活。";

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Hero area */}
      <SectionHeader
        title="关于我们"
        subtitle="About UTMCSSA"
      />

      {/* Mission statement */}
      <AnimatedSection className="max-w-3xl mx-auto text-center mb-20">
        <p className="text-lg leading-relaxed text-muted-foreground">
          {aboutDescription}
        </p>
      </AnimatedSection>

      {/* Services */}
      <AnimatedSection className="mb-20">
        <h3 className="text-2xl font-bold text-foreground text-center mb-8">
          我们的服务
        </h3>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {serviceItems.map((item) => (
            <div
              key={item.title}
              className="text-center p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="h-7 w-7" />
              </div>
              <h4 className="mt-4 text-lg font-semibold text-foreground">
                {item.title}
              </h4>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="text-center">
        <div className="rounded-2xl bg-primary/5 p-12">
          <h3 className="text-2xl font-bold text-foreground">
            想了解更多？
          </h3>
          <p className="mt-3 text-muted-foreground">
            欢迎加入我们，或通过以下方式联系我们。
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href="/join"
              className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              加入我们
            </a>
            <a
              href="/contact"
              className="rounded-lg border border-border px-8 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
            >
              联系我们
            </a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
