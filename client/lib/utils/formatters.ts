import type {
  StrapiCollectionResponse,
  StrapiSingleResponse,
  StrapiMediaRaw,
  StrapiMedia,
} from "@/lib/types/cms.types";
import { getStrapiImageUrl } from "@/lib/image";

/**
 * Flatten Strapi collection response:
 * { data: [{ id, attributes: T }] } → [{ id, ...attributes }]
 */
export function flattenStrapiData<T>(
  raw: StrapiCollectionResponse<T>
): (T & { id: string })[] {
  if (!raw?.data) return [];
  return raw.data.map((item) => ({
    id: item.id,
    ...item.attributes,
  }));
}

/**
 * Flatten Strapi single-type response:
 * { data: { id, attributes: T } } → { id, ...attributes }
 */
export function flattenStrapiSingle<T>(
  raw: StrapiSingleResponse<T>
): (T & { id: string }) | null {
  if (!raw?.data) return null;
  return {
    id: raw.data.id,
    ...raw.data.attributes,
  };
}

/**
 * Flatten Strapi media field and resolve image URL.
 */
export function flattenStrapiMedia(
  media: StrapiMediaRaw | null | undefined
): StrapiMedia | null {
  if (!media?.data?.attributes) return null;
  const attrs = media.data.attributes;
  return {
    url: getStrapiImageUrl(attrs.url),
    alternativeText: attrs.alternativeText,
    width: attrs.width,
    height: attrs.height,
  };
}

/**
 * Group an array by a key function.
 */
export function groupBy<T>(
  array: T[],
  keyFn: (item: T) => string
): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of array) {
    const key = keyFn(item);
    const group = map.get(key) || [];
    group.push(item);
    map.set(key, group);
  }
  return map;
}

/**
 * Truncate text to maxLength and add "..." suffix.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}
