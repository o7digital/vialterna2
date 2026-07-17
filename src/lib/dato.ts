export type Insight = {
  title: string;
  slug?: string;
  excerpt: string;
  body?: string;
  publishedAt?: string;
};

export type SitePageContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  sections: string[][];
};

type DatoSection = {
  title?: string;
  text?: string;
};

type DatoSitePage = {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  sections?: DatoSection[] | string[][];
};

const endpoint = "https://graphql.datocms.com/";
const token = import.meta.env.DATOCMS_API_TOKEN;
const environment = import.meta.env.DATOCMS_ENVIRONMENT;

async function datoRequest<T>(query: string, variables: Record<string, unknown> = {}): Promise<T | null> {
  if (!token) return null;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(environment ? { "X-Environment": environment } : {})
      },
      body: JSON.stringify({ query, variables })
    });

    if (!response.ok) return null;

    const payload = await response.json();
    if (payload.errors?.length) return null;

    return payload.data as T;
  } catch {
    return null;
  }
}

export async function getInsights(locale: "es" | "en", fallback: string[][]): Promise<string[][]> {
  const data = await datoRequest<{ allInsights: Insight[] }>(
    `query Insights($locale: SiteLocale) {
      allInsights(locale: $locale) {
        title
        excerpt
      }
    }`,
    { locale }
  );

  return data?.allInsights?.length
    ? data.allInsights.map((insight) => [insight.title, insight.excerpt])
    : fallback;
}

function normalizeSections(sections: DatoSitePage["sections"], fallback: string[][]): string[][] {
  if (!Array.isArray(sections) || !sections.length) return fallback;

  const normalized = sections
    .map((section) => {
      if (Array.isArray(section)) return [String(section[0] ?? ""), String(section[1] ?? "")];
      return [String(section.title ?? ""), String(section.text ?? "")];
    })
    .filter(([title, text]) => title && text);

  return normalized.length ? normalized : fallback;
}

export async function getSitePage(
  pageId: string,
  locale: "es" | "en",
  fallback: SitePageContent
): Promise<SitePageContent> {
  const data = await datoRequest<{ allSitePages: DatoSitePage[] }>(
    `query SitePage($pageId: String, $locale: SiteLocale) {
      allSitePages(filter: { pageId: { eq: $pageId } }, locale: $locale, first: 1) {
        eyebrow
        heading
        intro
        sections
      }
    }`,
    { pageId, locale }
  );

  const page = data?.allSitePages?.[0];
  if (!page) return fallback;

  return {
    eyebrow: page.eyebrow || fallback.eyebrow,
    heading: page.heading || fallback.heading,
    intro: page.intro || fallback.intro,
    sections: normalizeSections(page.sections, fallback.sections)
  };
}
