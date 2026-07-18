import { industryPages, solutionPages } from "../data/detailPages";
import { industryPagesEn, solutionPagesEn } from "../data/detailPagesEn";
import { insightPosts } from "../data/insights";
import { insightPostsEn } from "../data/insightsEn";

export const SITE_ORIGIN = "https://www.vialterna.com";

export type SeoAlternates = {
  es: string;
  en: string;
};

export type SitemapEntry = {
  path: string;
  alternates?: SeoAlternates;
  lastmod?: string;
};

const normalizePath = (pathname: string) => {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return path === "/" || path.endsWith("/") ? path : `${path}/`;
};

const staticPairs: SeoAlternates[] = [
  { es: "/", en: "/en/" },
  { es: "/empresa/", en: "/en/company/" },
  { es: "/faq/", en: "/en/faq/" },
  { es: "/contacto/", en: "/en/contact/" },
  { es: "/aviso-de-privacidad/", en: "/en/aviso-de-privacidad/" },
  { es: "/auditoria-telco/", en: "/en/telco-audit/" },
  { es: "/insights/", en: "/en/insights/" }
];

const solutionPairs: SeoAlternates[] = solutionPages.map((page, index) => ({
  es: `/soluciones/${page.slug}/`,
  en: `/en/solutions/${solutionPagesEn[index].slug}/`
}));

const industryPairs: SeoAlternates[] = industryPages.map((page, index) => ({
  es: `/industrias/${page.slug}/`,
  en: `/en/industries/${industryPagesEn[index].slug}/`
}));

const insightPairs: SeoAlternates[] = insightPosts.map((post) => {
  const englishPost = insightPostsEn.find((candidate) => candidate.originalSlug === post.slug);
  if (!englishPost) throw new Error(`Missing English SEO route for insight: ${post.slug}`);
  return {
    es: `/insights/${post.slug}/`,
    en: `/en/insights/${englishPost.slug}/`
  };
});

export const seoPairs = [...staticPairs, ...solutionPairs, ...industryPairs, ...insightPairs];

const pairByPath = new Map(seoPairs.flatMap((pair) => [[pair.es, pair], [pair.en, pair]]));

const canonicalAliases = new Map<string, string>([
  ["/en/empresa/", "/en/company/"],
  ["/en/contacto/", "/en/contact/"],
  ...solutionPagesEn.map((page) => [
    `/en/soluciones/${page.slug}/`,
    `/en/solutions/${page.slug}/`
  ] as [string, string]),
  ...industryPagesEn.map((page) => [
    `/en/industrias/${page.slug}/`,
    `/en/industries/${page.slug}/`
  ] as [string, string]),
  ...insightPostsEn.map((post) => [
    `/en/insights/${post.originalSlug}/`,
    `/en/insights/${post.slug}/`
  ] as [string, string])
]);

export const absoluteUrl = (path: string) => new URL(path, `${SITE_ORIGIN}/`).href;

export const getSeoRoute = (pathname: string) => {
  const requestedPath = normalizePath(pathname);
  const canonicalPath = canonicalAliases.get(requestedPath) ?? requestedPath;
  return {
    canonicalPath,
    canonical: absoluteUrl(canonicalPath),
    alternates: pairByPath.get(canonicalPath),
    isAlias: canonicalPath !== requestedPath
  };
};

const pairedEntries: SitemapEntry[] = seoPairs.flatMap((alternates) => [
  { path: alternates.es, alternates },
  { path: alternates.en, alternates }
]);

const insightDates = new Map<string, string>([
  ...insightPosts.map((post) => [`/insights/${post.slug}/`, post.date.slice(0, 10)] as [string, string]),
  ...insightPostsEn.map((post) => [`/en/insights/${post.slug}/`, post.date.slice(0, 10)] as [string, string])
]);

export const sitemapEntries: SitemapEntry[] = [
  ...pairedEntries.map((entry) => ({
    ...entry,
    lastmod: insightDates.get(entry.path)
  })),
  { path: "/en/platform/air-connect/" }
];
