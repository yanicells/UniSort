import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://unisort.ycells.com"),
  title: {
    default:
      "UniSort – Which Big 4 University Fits You? | ADMU, DLSU, UP, UST Comparison",
    template: "%s | UniSort",
  },
  description:
    "Free personality quiz and comparison guide for Big 4 universities in the Philippines. Find your perfect match between Ateneo de Manila University (ADMU), De La Salle University (DLSU), University of the Philippines (UP), and University of Santo Tomas (UST). Explore student culture, honest reviews, and freedom wall confessions.",
  keywords: [
    "big 4 universities philippines",
    "university quiz philippines",
    "which university is for me philippines",
    "ADMU DLSU UP UST comparison",
    "Ateneo de Manila University",
    "De La Salle University",
    "University of the Philippines",
    "University of Santo Tomas",
    "college finder philippines",
    "university comparison philippines",
    "best university for me quiz",
    "big 4 university fit quiz",
    "Ateneo vs La Salle",
    "UP vs Ateneo",
    "DLSU vs UST",
    "university culture fit philippines",
    "student culture big 4",
    "freedom wall philippines",
  ],
  authors: [{ name: "UniSort Team" }],
  applicationName: "UniSort",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title:
      "UniSort – Which Big 4 University Fits You? | ADMU, DLSU, UP, UST Quiz",
    description:
      "Take a free quiz to discover which Big 4 university in the Philippines matches your personality. Compare Ateneo, La Salle, UP, and UST student culture and experiences.",
    images: ["/og-image.png"],
    type: "website",
    url: "https://unisort.ycells.com",
    siteName: "UniSort",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "UniSort – Find Your Big 4 University Match in the Philippines",
    description:
      "Free quiz comparing Ateneo de Manila, De La Salle, UP, and UST. Discover which university culture fits you best.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://unisort.ycells.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded-md bg-foreground px-3 py-2 text-sm text-white"
        >
          Skip to main content
        </a>
        <NewspaperMasthead />
        <ToastProvider />
        <div className="bg-background pt-16">{children}</div>
        {/* <Footer /> */}
        <Analytics />
      </body>
    </html>
  );
}
