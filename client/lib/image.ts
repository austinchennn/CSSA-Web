/**
 * Resolve Strapi image URLs.
 * - Relative URLs (starting with /) get prefixed with NEXT_PUBLIC_STRAPI_URL
 * - Absolute URLs (http:// or https://) are used directly
 */
export function getStrapiImageUrl(url: string | null | undefined): string {
  if (!url) return "";

  // Already an absolute URL (e.g. Cloudinary)
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Relative Strapi URL — prefix with Strapi base URL
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  // Ensure no double slashes
  const base = strapiUrl.endsWith("/") ? strapiUrl.slice(0, -1) : strapiUrl;
  const path = url.startsWith("/") ? url : `/${url}`;

  return `${base}${path}`;
}
