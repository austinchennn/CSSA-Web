import { gqlFetch } from "@/lib/graphql/client";
import { getStrapiImageUrl } from "@/lib/image";
import type {
  Department,
  DepartmentAttributes,
  Member,
  MemberAttributes,
  ActiveEvent,
  EventAttributes,
  PastEvent,
  PastEventAttributes,
  SiteConfig,
  SiteConfigAttributes,
  StrapiCollectionResponse,
  StrapiSingleResponse,
  FormFieldRaw,
} from "@/lib/types/cms.types";

// ============================================================
// Query: Departments
// ============================================================

const DEPARTMENTS_QUERY = `
  query {
    departments {
      data {
        id
        attributes {
          name
          leader_name
          introduction
        }
      }
    }
  }
`;

export async function getDepartments(): Promise<Department[]> {
  try {
    const data = await gqlFetch<{
      departments: StrapiCollectionResponse<DepartmentAttributes>;
    }>(DEPARTMENTS_QUERY, undefined, { revalidate: 300 });

    return (data.departments?.data || []).map((item) => ({
      id: item.id,
      name: item.attributes.name,
      leader_name: item.attributes.leader_name,
      introduction: item.attributes.introduction,
    }));
  } catch (error) {
    console.error("Failed to fetch departments:", error);
    return [];
  }
}

// ============================================================
// Query: Members
// ============================================================

const MEMBERS_QUERY = `
  query {
    members {
      data {
        id
        attributes {
          name
          role
          department
          photo {
            data {
              attributes {
                url
              }
            }
          }
          introduction
          major
        }
      }
    }
  }
`;

export async function getMembers(): Promise<Member[]> {
  try {
    const data = await gqlFetch<{
      members: StrapiCollectionResponse<MemberAttributes>;
    }>(MEMBERS_QUERY, undefined, { revalidate: 120 });

    return (data.members?.data || []).map((item) => ({
      id: item.id,
      name: item.attributes.name,
      role: item.attributes.role,
      department: item.attributes.department,
      photoUrl: item.attributes.photo?.data?.attributes?.url
        ? getStrapiImageUrl(item.attributes.photo.data.attributes.url)
        : null,
      introduction: item.attributes.introduction,
      major: item.attributes.major,
    }));
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return [];
  }
}

// ============================================================
// Query: Active Events
// ============================================================

const ACTIVE_EVENTS_QUERY = `
  query {
    events(filters: { status: { eq: "active" } }) {
      data {
        id
        attributes {
          title
          description
          location
          start_time
          capacity
          status
          form_schema
          registrationCount
        }
      }
    }
  }
`;

export async function getActiveEvents(): Promise<ActiveEvent[]> {
  try {
    const data = await gqlFetch<{
      events: StrapiCollectionResponse<EventAttributes>;
    }>(ACTIVE_EVENTS_QUERY, undefined, { revalidate: 30 });

    return (data.events?.data || []).map((item) => {
      // form_schema may be a JSON string or already parsed
      let formSchema: FormFieldRaw[] = [];
      if (typeof item.attributes.form_schema === "string") {
        try {
          formSchema = JSON.parse(item.attributes.form_schema);
        } catch {
          formSchema = [];
        }
      } else if (Array.isArray(item.attributes.form_schema)) {
        formSchema = item.attributes.form_schema;
      }

      return {
        id: item.id,
        title: item.attributes.title,
        description: item.attributes.description,
        location: item.attributes.location,
        start_time: item.attributes.start_time,
        capacity: item.attributes.capacity,
        status: item.attributes.status,
        form_schema: formSchema,
        registrationCount: item.attributes.registrationCount,
      };
    });
  } catch (error) {
    console.error("Failed to fetch active events:", error);
    return [];
  }
}

// ============================================================
// Query: Site Config
// ============================================================

const SITE_CONFIG_QUERY = `
  query {
    siteConfig {
      data {
        attributes {
          social_links
          about_description
          join_us_description
        }
      }
    }
  }
`;

export async function getSiteConfig(): Promise<SiteConfig | null> {
  try {
    const data = await gqlFetch<{
      siteConfig: StrapiSingleResponse<SiteConfigAttributes>;
    }>(SITE_CONFIG_QUERY, undefined, { revalidate: 300 });

    if (!data.siteConfig?.data?.attributes) return null;

    const attrs = data.siteConfig.data.attributes;

    // social_links may be a JSON string or already parsed
    let socialLinks = attrs.social_links;
    if (typeof socialLinks === "string") {
      try {
        socialLinks = JSON.parse(socialLinks);
      } catch {
        socialLinks = [];
      }
    }

    return {
      social_links: Array.isArray(socialLinks) ? socialLinks : [],
      about_description: attrs.about_description || "",
      join_us_description: attrs.join_us_description || "",
    };
  } catch (error) {
    console.error("Failed to fetch site config:", error);
    return null;
  }
}

// ============================================================
// Query: Past Events
// ============================================================

const PAST_EVENTS_QUERY = `
  query {
    pastEvents {
      data {
        id
        attributes {
          title
          date
          description
          cover_image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export async function getPastEvents(): Promise<PastEvent[]> {
  try {
    const data = await gqlFetch<{
      pastEvents: StrapiCollectionResponse<PastEventAttributes>;
    }>(PAST_EVENTS_QUERY, undefined, { revalidate: 60 });

    return (data.pastEvents?.data || []).map((item) => ({
      id: item.id,
      title: item.attributes.title,
      date: item.attributes.date,
      description: item.attributes.description,
      coverImageUrl: item.attributes.cover_image?.data?.attributes?.url
        ? getStrapiImageUrl(item.attributes.cover_image.data.attributes.url)
        : null,
    }));
  } catch (error) {
    console.error("Failed to fetch past events:", error);
    return [];
  }
}
