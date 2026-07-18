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

export type SeoMetadata = {
  title: string;
  description: string;
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

const metadataByPath = new Map<string, SeoMetadata>([
  ["/", {
    title: "Conectividad empresarial en México | Vialterna",
    description: "Conectividad empresarial administrada, SD-WAN y continuidad operativa para empresas distribuidas en México, con cobertura nacional desde CDMX."
  }],
  ["/soluciones/edge/", {
    title: "Respaldo de internet empresarial en México | Vialterna",
    description: "Respaldo de internet empresarial en México y CDMX con 4G, 5G o satélite, conectividad multioperador y failover automático para cada sitio."
  }],
  ["/soluciones/core/", {
    title: "SD-WAN administrado en México | Vialterna",
    description: "Redes SD-WAN multioperador en México y CDMX con orquestación, monitoreo NOC 24/7, failover inteligente y gobierno de SLA."
  }],
  ["/soluciones/telco-as-a-service/", {
    title: "Auditoría Telco en México y CDMX | Vialterna",
    description: "Auditoría de telecomunicaciones en México y CDMX para optimizar costos, contratos, SLA y TCO mediante un servicio Telco as a Service."
  }],
  ["/soluciones/iot-sim/", {
    title: "SIM IoT administradas en México | Vialterna",
    description: "SIM y eSIM IoT administradas en México para flotas, terminales y sensores, con conectividad multioperador, monitoreo y control centralizado."
  }],
  ["/industrias/servicios-financieros/", {
    title: "Conectividad financiera en México | Vialterna",
    description: "Conectividad resiliente para bancos, cajeros, sucursales e infraestructura financiera en México y CDMX, con respaldo y failover automático."
  }],
  ["/industrias/retail-franquicias/", {
    title: "Conectividad para retail en México | Vialterna",
    description: "Conectividad empresarial para tiendas, franquicias y puntos de venta en México y CDMX, con SD-WAN, respaldo y visibilidad centralizada."
  }],
  ["/industrias/energia-industria/", {
    title: "Conectividad industrial en México | Vialterna",
    description: "Conectividad industrial e IoT para energía, plantas y sitios remotos en México, con redes celulares, respaldo satelital y monitoreo 24/7."
  }],
  ["/industrias/infraestructura-pagos/", {
    title: "Conectividad para pagos en México | Vialterna",
    description: "Conectividad administrada para terminales e infraestructura de pagos en México, con SIM IoT, redundancia multioperador y failover automático."
  }],
  ["/industrias/logistica-cadena-frio/", {
    title: "Conectividad para logística en México | Vialterna",
    description: "Conectividad resiliente e IoT para logística, almacenes y cadena de frío en México, con monitoreo de sensores y respaldo de internet."
  }],
  ["/auditoria-telco/", {
    title: "Auditoría de conectividad en México y CDMX | Vialterna",
    description: "Auditoría Telco en México y CDMX para medir el costo del downtime, comparar el TCO y optimizar contratos, enlaces, redundancia y SLA."
  }],
  ["/empresa/", {
    title: "Vialterna | Conectividad empresarial en México",
    description: "Empresa mexicana de conectividad administrada, SD-WAN, IoT, internet celular y respaldo satelital para operaciones distribuidas en México."
  }],
  ["/contacto/", {
    title: "Contacto Vialterna CDMX | Conectividad empresarial",
    description: "Contacta a Vialterna en CDMX para una auditoría Telco o una solución de conectividad empresarial, SD-WAN, IoT y respaldo de internet en México."
  }],
  ["/faq/", {
    title: "FAQ de conectividad empresarial en México | Vialterna",
    description: "Respuestas sobre SD-WAN, conectividad empresarial, respaldo 4G, 5G y satelital, SIM IoT, SLA y servicios administrados en México."
  }],
  ["/insights/", {
    title: "Blog de conectividad empresarial en México | Vialterna",
    description: "Artículos sobre conectividad empresarial en México, SD-WAN, internet celular, redes 4G y 5G, IoT, telemetría y continuidad operativa."
  }],
  ["/en/", {
    title: "Enterprise connectivity in Mexico | Vialterna",
    description: "Managed enterprise connectivity, SD-WAN, and business continuity for distributed operations across Mexico, delivered from Mexico City."
  }],
  ["/en/solutions/edge/", {
    title: "Enterprise internet backup in Mexico | Vialterna",
    description: "Enterprise internet backup in Mexico and Mexico City using 4G, 5G, or satellite connectivity, multi-carrier resilience, and automatic failover."
  }],
  ["/en/solutions/core/", {
    title: "Managed SD-WAN in Mexico | Vialterna",
    description: "Managed multi-carrier SD-WAN in Mexico and Mexico City with 24/7 NOC monitoring, intelligent failover, orchestration, and SLA governance."
  }],
  ["/en/solutions/telco-as-a-service/", {
    title: "Telco audit in Mexico and Mexico City | Vialterna",
    description: "Telecommunications audit and Telco as a Service in Mexico to optimize carrier contracts, connectivity costs, SLA performance, and TCO."
  }],
  ["/en/solutions/iot-sim/", {
    title: "Managed IoT SIMs in Mexico | Vialterna",
    description: "Managed SIM and eSIM connectivity in Mexico for IoT devices, fleets, terminals, and sensors, with multi-carrier coverage and centralized control."
  }],
  ["/en/industries/financial-services/", {
    title: "Financial services connectivity in Mexico | Vialterna",
    description: "Resilient connectivity for banks, ATMs, branches, and financial infrastructure in Mexico and Mexico City, with backup and automatic failover."
  }],
  ["/en/industries/retail-franchise/", {
    title: "Retail and franchise connectivity in Mexico | Vialterna",
    description: "Enterprise connectivity for stores, franchises, and POS networks in Mexico, with managed SD-WAN, internet backup, and centralized visibility."
  }],
  ["/en/industries/energy-industrial/", {
    title: "Industrial connectivity in Mexico | Vialterna",
    description: "Industrial and IoT connectivity for energy, plants, and remote sites in Mexico, with cellular networks, satellite backup, and 24/7 monitoring."
  }],
  ["/en/industries/payments-infrastructure/", {
    title: "Payments infrastructure connectivity in Mexico | Vialterna",
    description: "Managed connectivity for payment terminals and processing infrastructure in Mexico, with IoT SIMs, multi-carrier redundancy, and failover."
  }],
  ["/en/industries/logistics-cold-chain/", {
    title: "Logistics connectivity in Mexico | Vialterna",
    description: "Resilient connectivity and IoT for logistics, warehouses, and cold-chain operations in Mexico, with sensor monitoring and internet backup."
  }],
  ["/en/telco-audit/", {
    title: "Connectivity audit in Mexico and Mexico City | Vialterna",
    description: "Telco audit in Mexico to quantify downtime, compare TCO, and optimize carrier contracts, links, redundancy, telecom spend, and SLA performance."
  }],
  ["/en/company/", {
    title: "Vialterna | Enterprise connectivity in Mexico",
    description: "Mexican provider of managed connectivity, SD-WAN, IoT, cellular internet, and satellite backup for distributed enterprise operations in Mexico."
  }],
  ["/en/contact/", {
    title: "Contact Vialterna in Mexico City | Enterprise connectivity",
    description: "Contact Vialterna in Mexico City for a Telco audit or an enterprise connectivity, SD-WAN, IoT, and internet backup solution across Mexico."
  }],
  ["/en/faq/", {
    title: "Enterprise connectivity FAQ in Mexico | Vialterna",
    description: "Answers about SD-WAN, enterprise connectivity, 4G, 5G and satellite backup, managed IoT SIMs, SLAs, and telecom services in Mexico."
  }],
  ["/en/insights/", {
    title: "Enterprise connectivity insights in Mexico | Vialterna",
    description: "Articles about enterprise connectivity in Mexico, SD-WAN, cellular internet, 4G and 5G networks, IoT, telemetry, and business continuity."
  }],
  ["/en/platform/air-connect/", {
    title: "Network monitoring platform in Mexico | Vialterna",
    description: "Enterprise network monitoring in Mexico with real-time visibility into sites, providers, incidents, IoT SIMs, sensors, uptime, and costs."
  }]
]);

export const absoluteUrl = (path: string) => new URL(path, `${SITE_ORIGIN}/`).href;

export const getSeoMetadata = (pathname: string, fallback: SeoMetadata): SeoMetadata =>
  metadataByPath.get(normalizePath(pathname)) ?? fallback;

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
