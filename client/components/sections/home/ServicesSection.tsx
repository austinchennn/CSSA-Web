import { BookOpen, Users, Calendar, Globe } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

const services = [
  {
    icon: BookOpen,
    title: "学术支持",
    description: "提供课程咨询、学习资源分享和学术交流平台。",
  },
  {
    icon: Users,
    title: "新生支持",
    description: "帮助新生适应校园生活，提供接机、选课、住房等指导。",
  },
  {
    icon: Calendar,
    title: "活动组织",
    description: "举办丰富多彩的文化、社交和学术活动。",
  },
  {
    icon: Globe,
    title: "资源整合",
    description: "整合校内外资源，为学生提供实习、就业和生活信息。",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              我们的服务
            </h2>
            <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-primary" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.1}>
              <div className="text-center p-6 rounded-lg hover:bg-accent/30 transition-colors">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
