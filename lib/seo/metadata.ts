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
  "big 4 ph",
  "best uni philippines",
  "best uni ph",
  "best school ph",
  "college in manila",
  "top university philippines",
  "which school fits me",
  "what school fits me",
  "anong school para sakin",
  "anong university para sakin",
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
  "big4 ph",
  "big4 philippines",
  "best ph university",
  "best ph uni",
  "best ph university for me",
  "big 4 university fit quiz",
  "Ateneo vs La Salle",
  "UP vs Ateneo",
  "DLSU vs UST",
  "university culture fit philippines",
  "student culture big 4",
  "freedom wall philippines",
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
    "admu or dlsu",
    "ateneo tuition",
    "ateneo campus life",
    "ateneo worth it",
    "admu student life",
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
    "dlsu or ateneo",
    "dlsu tuition",
    "la salle campus life",
    "dlsu student life",
    "is dlsu worth it",
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
    "up or ateneo",
    "up diliman tuition",
    "up student life",
    "is up worth it",
    "up campus culture",
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
    "ust or dlsu",
    "ust tuition",
    "ust student life",
    "is ust worth it",
    "thomasian culture",
  ],
} as const;

export const BIG4_COMPARISON_KEYWORDS = [
  "ADMU DLSU UP UST comparison",
  "Ateneo vs La Salle vs UP vs UST",
  "big 4 schools philippines",
  "compare big 4 universities",
  "ADMU vs DLSU",
  "UP vs Ateneo",
  "DLSU vs UST",
  "which is better ateneo or la salle",
  "which is better up or ateneo",
  "student culture ADMU DLSU UP UST",
  "katipunan vs taft vs diliman vs espana",
  "choose between ateneo la salle up ust",
  "admu or dlsu",
  "up or ust",
  "which big 4 is best",
  "best university in philippines for me",
  "which uni is right for me",
  "college comparison philippines",
];

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
  "college rant philippines",
  "student tea philippines",
  "anonymous college stories",
  "big 4 confessions",
  "freedom wall big 4",
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
  "what school should i go to philippines",
  "what college should i take quiz",
  "quick university quiz",
  "5 minute university quiz",
  "college personality test philippines",
  "anong university para sakin quiz",
  "school fit test philippines",
];

export const STATS_KEYWORDS = [
  "big 4 university stats",
  "university match statistics",
  "ADMU DLSU UP UST trends",
  "quiz results philippines",
  "university comparison data",
  "big 4 quiz results",
  "most matched university philippines",
  "admu dlsu up ust percentages",
  "which university do people match with",
  "live quiz stats philippines",
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
