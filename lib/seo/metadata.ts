/**
 * Centralized SEO metadata constants and helpers
 */

export const SEO_CONFIG = {
  baseUrl: "https://unisort.ycells.com",
  siteName: "UniSort",
  twitterHandle: "@unisort",
} as const;

export const DEFAULT_KEYWORDS = [
  "university quiz Philippines",
  "big 4 universities philippines",
  "ADMU",
  "DLSU",
  "UP",
  "UST",
  "Ateneo de Manila University",
  "De La Salle University",
  "University of the Philippines",
  "University of Santo Tomas",
  "which university is for me",
  "college finder philippines",
  "university comparison philippines",
];

export const UNIVERSITY_KEYWORDS = {
  admu: [
    "Ateneo de Manila University",
    "ADMU",
    "Blue Eagles",
    "Katipunan",
    "Ateneo student culture",
    "ADMU pros and cons",
    "is Ateneo worth it",
    "Ateneo review",
    "Jesuit education philippines",
    "conyo school",
    "Ateneo vs La Salle",
    "Ateneo vs UP",
    "what's it like studying in Ateneo",
    "one big fight",
  ],
  dlsu: [
    "De La Salle University",
    "DLSU",
    "Green Archers",
    "Taft",
    "La Salle student life",
    "DLSU trimester experience",
    "DLSU pros and cons",
    "La Salle review",
    "trimester system philippines",
    "Happy Thursday DLSU",
    "Ateneo vs La Salle",
    "DLSU vs UST",
    "what's it like studying in La Salle",
    "animo la salle",
  ],
  up: [
    "University of the Philippines",
    "UP",
    "UP Diliman",
    "Fighting Maroons",
    "iskolar ng bayan",
    "UP culture",
    "UP Diliman student experience",
    "UP campus life",
    "UP pros and cons",
    "is UP worth it",
    "UP vs Ateneo",
    "UP Diliman experience",
    "what's it like studying in UP Diliman",
    "up fight",
  ],
  ust: [
    "University of Santo Tomas",
    "UST",
    "Growling Tigers",
    "España",
    "UST student life",
    "UST block schedule",
    "UST block sections",
    "Thomasian life",
    "UST pros and cons",
    "Paskuhan",
    "DLSU vs UST",
    "what's it like studying in UST",
    "go uste",
  ],
} as const;

export const FREEDOM_WALL_KEYWORDS = [
  "university freedom wall Philippines",
  "college confessions Philippines",
  "anonymous university posts",
  "ADMU freedom wall",
  "ADMU confessions",
  "DLSU freedom wall",
  "La Salle confessions",
  "UP freedom wall",
  "UP Diliman confessions",
  "UST freedom wall",
  "UST confessions",
  "student stories philippines",
];

export const QUIZ_KEYWORDS = [
  "big 4 university quiz",
  "which university fits me best",
  "college match quiz philippines",
  "university personality quiz",
  "ADMU DLSU UP UST quiz",
  "best university for me quiz",
  "ph university quiz based on personality",
  "university culture fit philippines",
];

/**
 * Generate Open Graph metadata
 */
export function getOpenGraphMetadata(params: {
  title: string;
  description: string;
  url?: string;
  image?: string;
}) {
  return {
    title: params.title,
    description: params.description,
    url: params.url || SEO_CONFIG.baseUrl,
    siteName: SEO_CONFIG.siteName,
    images: [
      {
        url: params.image || `${SEO_CONFIG.baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: params.title,
      },
    ],
    locale: "en_PH",
    type: "website" as const,
  };
}

/**
 * Generate Twitter Card metadata
 */
export function getTwitterMetadata(params: {
  title: string;
  description: string;
  image?: string;
}) {
  return {
    card: "summary_large_image" as const,
    title: params.title,
    description: params.description,
    images: [params.image || `${SEO_CONFIG.baseUrl}/og-image.png`],
  };
}
