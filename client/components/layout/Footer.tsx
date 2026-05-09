import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants/routes";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo & description */}
          <div>
            <Link href="/" className="text-xl font-bold text-primary">
              UTMCSSA
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              多伦多大学密西沙加校区中国学生学者联合会
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              快速导航
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              社交媒体
            </h3>
            <ul className="space-y-2">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} UTMCSSA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
