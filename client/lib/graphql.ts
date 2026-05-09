import { gqlFetch } from "@/lib/graphql/client";
import { getStrapiImageUrl } from "@/lib/image";
import type {
  Department,
  DepartmentAttributes,
  DepartmentDetail,
  Member,
  MemberAttributes,
  StrapiMediaRaw,
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
    }));
  } catch (error) {
    console.error("Failed to fetch departments:", error);
    return [];
  }
}

// ============================================================
// Query: Department by ID
// ============================================================

const DEPARTMENT_BY_ID_QUERY = `
  query GetDepartment($id: ID!) {
    department(id: $id) {
      data {
        id
        attributes {
          name
          leader_name
          leader_introduction
          introduction
          benefits
          members {
            data {
              id
              attributes {
                name
                title
                introduction
                major
                order
              }
            }
          }
        }
      }
    }
  }
`;

interface DepartmentMemberAttributes {
  name: string;
  title: string;
  introduction?: string;
  major?: string;
  order?: number;
}

interface DepartmentDetailAttributes extends DepartmentAttributes {
  members: StrapiCollectionResponse<DepartmentMemberAttributes>;
}

export async function getDepartmentById(id: string): Promise<DepartmentDetail | null> {
  try {
    const data = await gqlFetch<{
      department: StrapiSingleResponse<DepartmentDetailAttributes>;
    }>(DEPARTMENT_BY_ID_QUERY, { id }, { revalidate: 300 });

    const dept = data.department?.data;
    if (!dept) return null;

    const members = (dept.attributes.members?.data || [])
      .sort((a, b) => (a.attributes.order ?? 0) - (b.attributes.order ?? 0))
      .map((item) => ({
        id: item.id,
        name: item.attributes.name,
        role: item.attributes.title,
        department: dept.attributes.name,
        photoUrl: null,
        introduction: item.attributes.introduction,
        major: item.attributes.major,
      }));

    return {
      id: dept.id,
      name: dept.attributes.name,
      leader_name: dept.attributes.leader_name,
      leader_introduction: dept.attributes.leader_introduction,
      introduction: dept.attributes.introduction,
      benefits: dept.attributes.benefits,
      members,
    };
  } catch (error) {
    console.error("Failed to fetch department:", error);
    return null;
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
          title
          department {
            data {
              attributes {
                name
              }
            }
          }
          photo {
            data {
              attributes {
                url
              }
            }
          }
          introduction
          major
          order
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
      role: item.attributes.title,
      department: item.attributes.department?.data?.attributes?.name ?? null,
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
        registrationCount: undefined,
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
          event_name
          event_date
          event_location
          introduction
          photo {
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
      title: item.attributes.event_name,
      date: item.attributes.event_date,
      description: item.attributes.introduction,
      location: item.attributes.event_location,
      coverImageUrl: item.attributes.photo?.data?.attributes?.url
        ? getStrapiImageUrl(item.attributes.photo.data.attributes.url)
        : null,
    }));
  } catch (error) {
    console.error("Failed to fetch past events:", error);
    return [];
  }
}

const PAST_EVENT_BY_ID_QUERY = `
  query($id: ID!) {
    pastEvent(id: $id) {
      data {
        id
        attributes {
          event_name
          event_date
          event_location
          introduction
          photo {
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

export async function getPastEventById(id: string): Promise<PastEvent | null> {
  try {
    const data = await gqlFetch<{
      pastEvent: StrapiSingleResponse<PastEventAttributes>;
    }>(PAST_EVENT_BY_ID_QUERY, { id }, { revalidate: 60 });

    const item = data.pastEvent?.data;
    if (!item) return null;

    return {
      id: item.id,
      title: item.attributes.event_name,
      date: item.attributes.event_date,
      description: item.attributes.introduction,
      location: item.attributes.event_location,
      coverImageUrl: item.attributes.photo?.data?.attributes?.url
        ? getStrapiImageUrl(item.attributes.photo.data.attributes.url)
        : null,
    };
  } catch (error) {
    console.error("Failed to fetch past event by id:", error);
    return null;
  }
}
