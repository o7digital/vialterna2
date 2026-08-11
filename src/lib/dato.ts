export type Insight = {
  title: string;
  slug?: string;
  excerpt: string;
  body?: string;
  publishedAt?: string;
};

export type BlogPostContent = {
  id: number | string;
  slug: string;
  title: string;
  date: string;
  author: string;
  categories: string[];
  excerpt: string;
  content: string;
  image: string;
  sourceUrl?: string;
  imageAlt?: string;
};

type DatoBlogPost = {
  id?: string;
  slug?: string;
  title?: string;
  date?: string;
  author?: string;
  categories?: unknown;
  excerpt?: string;
  content?: string;
  image?: {
    url?: string;
    alt?: string;
  } | null;
  sourceUrl?: string;
};

export type SitePageContent = {
  seoTitle?: string;
  seoDescription?: string;
  eyebrow: string;
  heading: string;
  intro: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  sections: EditableSection[];
};

export type EditableCard = {
  key?: string;
  title?: string;
  text?: string;
  eyebrow?: string;
  href?: string;
  label?: string;
  type?: string;
};

type DatoDetailPage = {
  slug?: string;
  eyebrow?: string;
  title?: string;
  text?: string;
  problemTitle?: string;
  problem?: string;
  sectionTitle?: string;
  items?: unknown;
  benefits?: unknown;
};

export type EditableSection = {
  key?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  text?: string;
  items?: EditableCard[];
};

export type HomeContent = {
  seoTitle: string;
  seoDescription: string;
  hero: SitePageContent;
  risk: EditableSection;
  pillars: EditableSection;
  phases: EditableSection;
  solutions: EditableSection;
  architecture: EditableSection;
  industries: EditableSection;
  contact: SitePageContent;
};

type DatoSitePage = {
  seoTitle?: string;
  seoDescription?: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  sections?: unknown;
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

function getText(record: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value;
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

function normalizeCards(value: unknown, fallback: EditableCard[] = []): EditableCard[] {
  if (!Array.isArray(value)) return fallback;

  const cards: EditableCard[] = [];

  for (const item of value) {
    const card = Array.isArray(item)
      ? {
          title: String(item[0] ?? ""),
          text: String(item[1] ?? ""),
          href: typeof item[2] === "string" ? item[2] : undefined
        }
      : (() => {
          const record = asRecord(item);
          if (!record) return null;

          return {
            key: getText(record, ["key", "id", "slug", "sectionId"]),
            eyebrow: getText(record, ["eyebrow", "kicker"]),
            title: getText(record, ["title", "heading", "question"]) ?? "",
            text: getText(record, ["text", "intro", "answer", "description", "body"]),
            href: getText(record, ["href", "url", "link"]),
            label: getText(record, ["label", "visualLabel"]),
            type: getText(record, ["type", "visualType"])
          };
        })();

    if (card?.title || card?.text) cards.push(card);
  }

  return cards.length ? cards : fallback;
}

function normalizeStringList(value: unknown, fallback: string[] = []): string[] {
  if (typeof value === "string") {
    const items = value.split(",").map((item) => item.trim()).filter(Boolean);
    return items.length ? items : fallback;
  }

  if (!Array.isArray(value)) return fallback;

  const items = value
    .map((item) => {
      if (typeof item === "string") return item;
      const record = asRecord(item);
      return record ? getText(record, ["title", "text", "label"]) : undefined;
    })
    .filter((item): item is string => Boolean(item?.trim()));

  return items.length ? items : fallback;
}

function normalizeBlogPost(post: DatoBlogPost, fallback?: BlogPostContent): BlogPostContent | null {
  const title = post.title?.trim();
  const slug = post.slug?.trim();
  const excerpt = post.excerpt?.trim();
  const content = post.content?.trim();

  if (!title || !slug || !excerpt || !content) return null;

  return {
    id: post.id ?? fallback?.id ?? slug,
    slug,
    title,
    date: post.date || fallback?.date || new Date().toISOString(),
    author: post.author || fallback?.author || "Vialterna",
    categories: normalizeStringList(post.categories, fallback?.categories ?? ["Insights"]),
    excerpt,
    content,
    image: post.image?.url || fallback?.image || "",
    imageAlt: post.image?.alt || fallback?.imageAlt || title,
    sourceUrl: post.sourceUrl || fallback?.sourceUrl
  };
}

export async function getBlogPosts(
  locale: "es" | "en",
  fallback: BlogPostContent[]
): Promise<BlogPostContent[]> {
  const fallbackBySlug = new Map(fallback.map((post) => [post.slug, post]));
  const data = await datoRequest<{ allBlogs: DatoBlogPost[] }>(
    `query BlogPosts($locale: SiteLocale) {
      allBlogs(locale: $locale, orderBy: date_DESC) {
        id
        slug
        title
        date
        author
        categories
        excerpt
        content
        image {
          url
          alt
        }
        sourceUrl
      }
    }`,
    { locale }
  );

  const posts = data?.allBlogs
    ?.map((post) => normalizeBlogPost(post, post.slug ? fallbackBySlug.get(post.slug) : undefined))
    .filter((post): post is BlogPostContent => Boolean(post));

  if (!posts?.length) return fallback;

  // Keep the existing imported archive in the site and layer DatoCMS content
  // on top of it. Editors can therefore publish only new posts in DatoCMS;
  // using an existing slug intentionally replaces that archived post.
  const mergedBySlug = new Map(fallbackBySlug);
  for (const post of posts) mergedBySlug.set(post.slug, post);

  return [...mergedBySlug.values()]
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

function normalizeSections(sections: DatoSitePage["sections"], fallback: EditableSection[]): EditableSection[] {
  if (!Array.isArray(sections) || !sections.length) return fallback;

  const normalized: EditableSection[] = [];

  for (const section of sections) {
    const normalizedSection: EditableSection | null = Array.isArray(section)
      ? {
          title: String(section[0] ?? ""),
          text: String(section[1] ?? "")
        }
      : (() => {
          const record = asRecord(section);
          if (!record) return null;

          return {
            key: getText(record, ["key", "id", "slug", "sectionId"]),
            eyebrow: getText(record, ["eyebrow", "kicker"]),
            title: getText(record, ["title", "heading", "question"]) ?? "",
            intro: getText(record, ["intro", "description"]),
            text: getText(record, ["text", "body", "answer"]),
            items: normalizeCards(record.items ?? record.cards ?? record.links, [])
          };
        })();

    if (normalizedSection?.title || normalizedSection?.text || normalizedSection?.items?.length) {
      normalized.push(normalizedSection);
    }
  }

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
        seoTitle
        seoDescription
        eyebrow
        heading
        intro
        ctaLabel
        ctaHref
        secondaryCtaLabel
        secondaryCtaHref
        sections
      }
    }`,
    { pageId, locale }
  );

  const page = data?.allSitePages?.[0];
  if (!page) return fallback;

  return {
    seoTitle: page.seoTitle || fallback.seoTitle,
    seoDescription: page.seoDescription || fallback.seoDescription,
    eyebrow: page.eyebrow || fallback.eyebrow,
    heading: page.heading || fallback.heading,
    intro: page.intro || fallback.intro,
    ctaLabel: page.ctaLabel || fallback.ctaLabel,
    ctaHref: page.ctaHref || fallback.ctaHref,
    secondaryCtaLabel: page.secondaryCtaLabel || fallback.secondaryCtaLabel,
    secondaryCtaHref: page.secondaryCtaHref || fallback.secondaryCtaHref,
    sections: normalizeSections(page.sections, fallback.sections)
  };
}

export async function getHomeSolutions(locale: "es" | "en", fallback: EditableCard[]): Promise<EditableCard[]> {
  const data = await datoRequest<{ allHomeSolutions: EditableCard[] }>(
    `query HomeSolutions($locale: SiteLocale) {
      allHomeSolutions(locale: $locale, orderBy: _createdAt_ASC) {
        eyebrow
        title
        text
        href
        label
      }
    }`,
    { locale }
  );

  const cards = normalizeCards(data?.allHomeSolutions, fallback).map((card) => ({
    ...card,
    type: card.type ?? (
      card.href?.includes("core") ? "signal" :
      card.href?.includes("telco-as-a-service") ? "backup" :
      card.href?.includes("iot-sim") ? "cells" :
      "rings"
    )
  }));

  return cards.length ? cards : fallback;
}

export async function getHomeIndustries(locale: "es" | "en", fallback: EditableCard[]): Promise<EditableCard[]> {
  const data = await datoRequest<{ allHomeIndustries: EditableCard[] }>(
    `query HomeIndustries($locale: SiteLocale) {
      allHomeIndustries(locale: $locale, orderBy: _createdAt_ASC) {
        title
        text
        href
      }
    }`,
    { locale }
  );

  return normalizeCards(data?.allHomeIndustries, fallback);
}

export async function getDatoDetailPage(
  type: "solution" | "industry",
  locale: "es" | "en",
  slug: string,
  fallback: {
    eyebrow: string;
    title: string;
    description: string;
    problemTitle?: string;
    problem?: string;
    sectionTitle: string;
    items: EditableCard[];
    benefits: string[];
  }
) {
  const model = type === "solution" ? "allSolutionPages" : "allIndustryPages";
  const data = await datoRequest<{ records: DatoDetailPage[] }>(
    `query DetailPage($slug: String, $locale: SiteLocale) {
      records: ${model}(locale: $locale, filter: { slug: { eq: $slug } }, first: 1) {
        slug
        eyebrow
        title
        text
        problemTitle
        problem
        sectionTitle
        items
        benefits
      }
    }`,
    { slug, locale }
  );

  const page = data?.records?.[0];
  if (!page) return fallback;

  return {
    eyebrow: page.eyebrow || fallback.eyebrow,
    title: page.title || fallback.title,
    description: page.text || fallback.description,
    problemTitle: page.problemTitle || fallback.problemTitle,
    problem: page.problem || fallback.problem,
    sectionTitle: page.sectionTitle || fallback.sectionTitle,
    items: normalizeCards(page.items, fallback.items),
    benefits: normalizeStringList(page.benefits, fallback.benefits)
  };
}

export async function getHomePage(locale: "es" | "en", fallback: HomeContent): Promise<HomeContent> {
  const page = await getSitePage("home", locale, fallback.hero);
  const normalizeLookup = (value?: string) => value?.toLowerCase().trim();
  const sectionByKey = new Map(
    page.sections
      .map((section) => [normalizeLookup(section.key), section] as const)
      .filter((entry): entry is [string, EditableSection] => Boolean(entry[0]))
  );
  const sectionByTitle = new Map(page.sections.map((section) => [section.title.toLowerCase().trim(), section]));
  const findSection = (...keys: string[]) => {
    for (const key of keys) {
      const section = sectionByKey.get(key) ?? sectionByTitle.get(key);
      if (section) return section;
    }
  };
  const contactSection = findSection("contact", "contacto");

  return {
    ...fallback,
    seoTitle: page.seoTitle || fallback.seoTitle,
    seoDescription: page.seoDescription || fallback.seoDescription,
    hero: page,
    risk: findSection("risk", "riesgo", "riesgo operativo") ?? fallback.risk,
    pillars: findSection("pillars", "modelo", "modelo vialterna") ?? fallback.pillars,
    phases: findSection("phases", "implementacion", "implementación") ?? fallback.phases,
    solutions: {
      ...(findSection("solutions", "soluciones") ?? fallback.solutions),
      items: await getHomeSolutions(locale, fallback.solutions.items ?? [])
    },
    architecture: findSection("architecture", "arquitectura") ?? fallback.architecture,
    industries: {
      ...(findSection("industries", "industrias") ?? fallback.industries),
      items: await getHomeIndustries(locale, fallback.industries.items ?? [])
    },
    contact: contactSection
      ? {
          ...fallback.contact,
          eyebrow: contactSection.eyebrow || fallback.contact.eyebrow,
          heading: contactSection.title || fallback.contact.heading,
          intro: contactSection.intro || contactSection.text || fallback.contact.intro
        }
      : fallback.contact
  };
}
