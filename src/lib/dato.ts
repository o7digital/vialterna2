export type Insight = {
  title: string;
  slug?: string;
  excerpt: string;
  body?: string;
  publishedAt?: string;
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

const englishHrefMap: Record<string, string> = {
  "/soluciones/edge/": "/en/solutions/edge/",
  "/soluciones/core/": "/en/solutions/core/",
  "/soluciones/telco-as-a-service/": "/en/solutions/telco-as-a-service/",
  "/soluciones/iot-sim/": "/en/solutions/iot-sim/",
  "/industrias/servicios-financieros/": "/en/industries/financial-services/",
  "/industrias/retail-franquicias/": "/en/industries/retail-franchise/",
  "/industrias/energia-industria/": "/en/industries/energy-industrial/",
  "/industrias/infraestructura-pagos/": "/en/industries/payments-infrastructure/",
  "/industrias/logistica-cadena-frio/": "/en/industries/logistics-cold-chain/"
};

function normalizeHrefForLocale(href: string | undefined, locale: "es" | "en"): string | undefined {
  if (!href) return href;
  const cleanHref = href.replace(/^href:\s*/i, "").trim();
  if (locale === "en") return englishHrefMap[cleanHref] ?? cleanHref;
  return cleanHref;
}

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

  const cards = value
    .map((item) => {
      if (Array.isArray(item)) {
        return {
          title: String(item[0] ?? ""),
          text: String(item[1] ?? ""),
          href: typeof item[2] === "string" ? item[2] : undefined
        };
      }

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
    })
    .filter((item): item is EditableCard => Boolean(item?.title || item?.text));

  return cards.length ? cards : fallback;
}

function normalizeStringList(value: unknown, fallback: string[] = []): string[] {
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

function normalizeSections(sections: DatoSitePage["sections"], fallback: EditableSection[]): EditableSection[] {
  if (!Array.isArray(sections) || !sections.length) return fallback;

  const normalized = sections
    .map((section) => {
      if (Array.isArray(section)) {
        return {
          title: String(section[0] ?? ""),
          text: String(section[1] ?? "")
        };
      }

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
    })
    .filter((section): section is EditableSection => Boolean(section?.title || section?.text || section?.items?.length));

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
    href: normalizeHrefForLocale(card.href, locale),
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

  return normalizeCards(data?.allHomeIndustries, fallback).map((card) => ({
    ...card,
    href: normalizeHrefForLocale(card.href, locale)
  }));
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
        problemTitle: problemtitle
        problem
        sectionTitle: sectiontitle
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
