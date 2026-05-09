// ============================================================
// GraphQL Client — Core fetch wrapper
// All GraphQL queries go through this function.
// ============================================================

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:1337/graphql";

interface GraphQLResponse<T> {
  data: T;
  errors?: GraphQLError[];
}

interface GraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
}

interface FetchOptions {
  revalidate?: number | false;
  tags?: string[];
  cache?: "no-store" | "force-cache";
}

/**
 * Generic GraphQL fetch function with Next.js ISR support.
 * All queries and mutations should use this function.
 */
export async function gqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: FetchOptions
): Promise<T> {
  const { revalidate = 60, tags, cache } = options || {};

  const fetchOptions: RequestInit & { next?: Record<string, unknown> } = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  };

  // Configure Next.js caching
  if (cache === "no-store") {
    fetchOptions.cache = "no-store";
  } else {
    fetchOptions.next = {};
    if (revalidate !== undefined && revalidate !== false) {
      fetchOptions.next.revalidate = revalidate;
    }
    if (tags) {
      fetchOptions.next.tags = tags;
    }
  }

  const res = await fetch(GRAPHQL_ENDPOINT, fetchOptions);

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json: GraphQLResponse<T> = await res.json();

  if (json.errors && json.errors.length > 0) {
    const messages = json.errors.map((e) => e.message).join("; ");
    throw new Error(`GraphQL errors: ${messages}`);
  }

  return json.data;
}
