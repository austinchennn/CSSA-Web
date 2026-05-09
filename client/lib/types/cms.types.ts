// ============================================================
// CMS TypeScript Interfaces
// Corresponds to Strapi CMS data models
// ============================================================

// --- Strapi generic wrapper types ---

export interface StrapiMedia {
  url: string;
  alternativeText: string | null;
  width?: number;
  height?: number;
}

export interface StrapiMediaRaw {
  data: {
    attributes: StrapiMedia;
  } | null;
}

export interface StrapiRaw<T> {
  id: string;
  attributes: T;
}

export interface StrapiCollectionResponse<T> {
  data: StrapiRaw<T>[];
}

export interface StrapiSingleResponse<T> {
  data: StrapiRaw<T>;
}

// --- Business data models ---

export interface Department {
  id: string;
  name: string;
  leader_name?: string;
  leader_introduction?: string;
  introduction?: string;
  benefits?: string;
}

export interface DepartmentDetail {
  id: string;
  name: string;
  leader_name?: string;
  leader_introduction?: string;
  introduction?: string;
  benefits?: string;
  members: Member[];
}

export interface DepartmentAttributes {
  name: string;
  leader_name?: string;
  leader_introduction?: string;
  introduction?: string;
  benefits?: string;
}

export interface MemberAttributes {
  name: string;
  title: string;
  department: {
    data: {
      attributes: { name: string };
    } | null;
  };
  photo: StrapiMediaRaw;
  introduction?: string;
  major?: string;
  order?: number;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  department: string | null;
  photoUrl: string | null;
  introduction?: string;
  major?: string;
}

export interface EventAttributes {
  title: string;
  description?: string;
  location?: string;
  start_time: string;
  capacity?: number;
  status: "upcoming" | "active" | "closed";
  form_schema: FormFieldRaw[] | string;
  registrationCount?: number;
}

export interface ActiveEvent {
  id: string;
  title: string;
  description?: string;
  location?: string;
  start_time: string;
  capacity?: number;
  status: string;
  form_schema: FormFieldRaw[];
  registrationCount?: number;
}

export interface FormFieldRaw {
  field: string;
  label: string;
  type: "text" | "email" | "number" | "select" | "tel" | "textarea";
  required: boolean;
  placeholder?: string;
  options?: string[];
}

export interface PastEventAttributes {
  event_name: string;
  event_date: string;
  introduction?: string;
  event_location?: string;
  photo: StrapiMediaRaw;
}

export interface PastEvent {
  id: string;
  title: string;
  date: string;
  description?: string;
  location?: string;
  coverImageUrl: string | null;
}

export interface SiteConfigAttributes {
  social_links: SocialLink[] | string;
  about_description: string;
  join_us_description: string;
}

export interface SiteConfig {
  social_links: SocialLink[];
  about_description: string;
  join_us_description: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  iconName?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string | null;
  websiteUrl?: string;
  tier: "gold" | "silver" | "bronze";
  description?: string;
}

export interface Registration {
  id: string;
  eventId: string;
  userInfo: Record<string, unknown>;
  status: "pending" | "confirmed" | "cancelled";
}

// --- Navigation ---

export interface NavLink {
  label: string;
  href: string;
}
