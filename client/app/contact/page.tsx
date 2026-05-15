import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/graphql";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Mail, Instagram, MessageCircle, Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
};

export const revalidate = 600;

const iconMap: Record<string, React.ElementType> = {
  instagram: Instagram,
  "message-circle": MessageCircle,
  wechat: MessageCircle,
  linkedin: Linkedin,
  mail: Mail,
};

export default async function ContactPage() {
  const siteConfig = await getSiteConfig().catch(() => null);

  const socialLinks = siteConfig?.social_links || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="联系我们"
        subtitle="如有疑问或合作意向，请通过以下方式联系我们"
      />

      <div className="max-w-3xl mx-auto">
        {/* Social media cards */}
        {socialLinks.length > 0 && (
          <AnimatedSection className="mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
              社交媒体
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {socialLinks.map((link) => {
                const IconComp =
                  iconMap[link.iconName?.toLowerCase() || ""] ||
                  iconMap[link.platform.toLowerCase()] ||
                  Mail;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:shadow-md hover:border-primary/30 transition-all"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-foreground">
                      {link.platform}
                    </span>
                  </a>
                );
              })}
            </div>
          </AnimatedSection>
        )}

        {/* Email */}
        <AnimatedSection className="text-center">
          <div className="rounded-2xl bg-card border border-border p-8">
            <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground">
              通过邮件联系我们
            </h3>
            <p className="mt-2 text-muted-foreground text-sm">
              如有问题或合作意向，欢迎发送邮件。
            </p>
            <a
              href="mailto:utmcssa@gmail.com"
              className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              发送邮件
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
