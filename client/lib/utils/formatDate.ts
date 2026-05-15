/**
 * Format an ISO date string to a localized date display.
 * Default locale: zh-CN → "2024年3月15日"
 */
export function formatEventDate(dateString: string, locale = "zh-CN"): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Format an ISO datetime string to date + time.
 * → "2024年3月15日 18:00"
 */
export function formatDateTime(dateTimeString: string, locale = "zh-CN"): string {
  try {
    const date = new Date(dateTimeString);
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return dateTimeString;
  }
}

/**
 * Format a date string as relative time (e.g. "3 天前").
 * Falls back to absolute date for > 1 year.
 */
export function formatRelativeDate(dateString: string, locale = "zh-CN"): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return "今天";
    if (diffDays < 30) {
      return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(
        -diffDays,
        "day"
      );
    }
    if (diffDays < 365) {
      const diffMonths = Math.floor(diffDays / 30);
      return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(
        -diffMonths,
        "month"
      );
    }
    return formatEventDate(dateString, locale);
  } catch {
    return dateString;
  }
}

/**
 * Extract year number from a date string.
 * Used for timeline year grouping.
 */
export function getYear(dateString: string): number {
  return new Date(dateString).getFullYear();
}
