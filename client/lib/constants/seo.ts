export const SITE_NAME = "UTMCSSA";

export const SITE_FULL_NAME = "多伦多大学密西沙加中国学生学者联合会";

export const DEFAULT_SEO = {
  title: `${SITE_NAME} — ${SITE_FULL_NAME}`,
  titleTemplate: `%s | ${SITE_NAME}`,
  description:
    "多伦多大学密西沙加校区中国学生学者联谊会官方网站。了解我们的活动、团队和服务。",
  ogImage: "/images/og-default.jpg",
  twitterCard: "summary_large_image" as const,
  locale: "zh-CN",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
};

export const PAGE_TITLES: Record<string, string> = {
  HOME: "Home",
  ABOUT: "About Us",
  TEAM: "Our Team",
  EVENTS: "Events",
  SPONSORS: "Sponsors & Partnership",
  CONTACT: "Contact Us",
  JOIN: "Join Us",
};
