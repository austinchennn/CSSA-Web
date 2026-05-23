import { gqlFetch } from "@/lib/graphql/client";
import { getStrapiImageUrl } from "@/lib/image";
import type {
  Sponsor,
  StrapiCollectionResponse,
  StrapiMediaRaw,
} from "@/lib/types/cms.types";

interface SponsorAttributes {
  name: string;
  logo: StrapiMediaRaw;
  website_url?: string;
  tier: "gold" | "silver" | "bronze";
  description?: string;
  display_order?: number;
}

const SPONSORS_QUERY = `
  query {
    sponsors(sort: "display_order:asc") {
      data {
        id
        attributes {
          name
          logo {
            data {
              attributes {
                url
              }
            }
          }
          website_url
          tier
          description
          display_order
        }
      }
    }
  }
`;

export async function fetchSponsors(): Promise<Sponsor[]> {
  try {
    const data = await gqlFetch<{
      sponsors: StrapiCollectionResponse<SponsorAttributes>;
    }>(SPONSORS_QUERY, undefined, { revalidate: 300 });

    return (data.sponsors?.data || []).map((item) => ({
      id: item.id,
      name: item.attributes.name,
      logoUrl: item.attributes.logo?.data?.attributes?.url
        ? getStrapiImageUrl(item.attributes.logo.data.attributes.url)
        : null,
      websiteUrl: item.attributes.website_url,
      tier: item.attributes.tier,
      description: item.attributes.description,
    }));
  } catch (error) {
    console.error("Failed to fetch sponsors:", error);
    return [];
  }
}
