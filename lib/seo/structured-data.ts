/**
 * JSON-LD Structured Data helpers for SEO
 */

import { SEO_CONFIG } from "./metadata";

type JsonLd = Record<string, unknown>;

/**
 * Organization schema for UniSort
 */
export function getOrganizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UniSort",
    url: SEO_CONFIG.baseUrl,
    logo: `${SEO_CONFIG.baseUrl}/logo.png`,
    description:
      "Free quiz and content hub helping Filipino students find their perfect Big 4 university match",
    sameAs: [],
  };
}

/**
 * WebSite schema with search action
 */
export function getWebSiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "UniSort",
    url: SEO_CONFIG.baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SEO_CONFIG.baseUrl}/freedom-wall?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Educational Organization schema for universities
 */
export function getEducationalOrgSchema(params: {
  name: string;
  alternateName: string;
  description: string;
  url: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: params.name,
    alternateName: params.alternateName,
    description: params.description,
    url: params.url,
  };
}

/**
 * FAQ Page schema
 */
export function getFAQSchema(
  questions: Array<{ question: string; answer: string }>
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

/**
 * Blog Posting schema for freedom wall posts
 */
export function getBlogPostingSchema(params: {
  headline: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
  url: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: params.headline,
    datePublished: params.datePublished,
    dateModified: params.dateModified || params.datePublished,
    author: {
      "@type": "Person",
      name: params.author || "Anonymous",
    },
    image: params.image,
    url: params.url,
    publisher: {
      "@type": "Organization",
      name: "UniSort",
      logo: {
        "@type": "ImageObject",
        url: `${SEO_CONFIG.baseUrl}/logo.png`,
      },
    },
  };
}

/**
 * BreadcrumbList schema
 */
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Quiz schema (as a CreativeWork)
 */
export function getQuizSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "Big 4 University Fit Quiz",
    description:
      "Find which Big 4 university in the Philippines fits your personality: Ateneo, La Salle, UP, or UST",
    url: `${SEO_CONFIG.baseUrl}/quiz`,
    hasPart: [
      {
        "@type": "Question",
        name: "Personality assessment questions to match with university culture",
      },
    ],
  };
}

/**
 * Helper to inject structured data into page
 * Usage: Add to page component:
 * ```tsx
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
 * />
 * ```
 */
export function injectStructuredData(schemas: JsonLd | JsonLd[]): string {
  const schemaArray = Array.isArray(schemas) ? schemas : [schemas];
  return JSON.stringify(schemaArray.length === 1 ? schemaArray[0] : schemaArray);
}
