import type { Metadata } from "next";
import { DEFAULT_SEO, SITE_NAME } from "@/lib/constants/seo";

interface PageMetadataOptions {
  title: string;
  description?: string;
  ogImage?: string;
}

/**
 * Generate page-specific metadata that merges with default SEO config.
 */
export function generatePageMetadata({
  title,
  description,
  ogImage,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description: description || DEFAULT_SEO.description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: description || DEFAULT_SEO.description,
      images: ogImage ? [ogImage] : DEFAULT_SEO.ogImage ? [DEFAULT_SEO.ogImage] : [],
      siteName: SITE_NAME,
      locale: DEFAULT_SEO.locale,
    },
  };
}
