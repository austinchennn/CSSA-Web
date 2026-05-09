import type { NavLink } from "@/lib/types/cms.types";

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  TEAM: "/team",
  EVENTS: "/events",
  REGISTRATION: "/registration",
  SPONSORS: "/sponsors",
  CONTACT: "/contact",
  JOIN: "/join",
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "首页", href: ROUTES.HOME },
  { label: "关于我们", href: ROUTES.ABOUT },
  { label: "管理层", href: ROUTES.TEAM },
  { label: "往期活动", href: ROUTES.EVENTS },
  { label: "活动报名", href: ROUTES.REGISTRATION },
  { label: "赞助合作", href: ROUTES.SPONSORS },
  { label: "联系我们", href: ROUTES.CONTACT },
  { label: "加入我们", href: ROUTES.JOIN },
];

// Fallback social links — should be overridden by CMS data from SiteConfig
export const SOCIAL_LINKS = [
  { platform: "Instagram", url: "#", iconName: "instagram" },
  { platform: "WeChat", url: "#", iconName: "message-circle" },
  { platform: "LinkedIn", url: "#", iconName: "linkedin" },
];
