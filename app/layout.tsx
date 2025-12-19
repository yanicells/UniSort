import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniSort - Find Your Perfect University Match",
  description:
    "Discover which Philippine university fits your personality through our quiz. Explore ADMU, DLSU, UP, and UST campus culture.",
  keywords: [
    "university quiz",
    "Philippines",
    "ADMU",
    "DLSU",
    "UP",
    "UST",
    "college finder",
  ],
  authors: [{ name: "UniSort Team" }],
  openGraph: {
    title: "UniSort - Find Your Perfect University Match",
    description:
      "Discover which Philippine university fits your personality through our quiz. Explore ADMU, DLSU, UP, and UST campus culture.",
    images: ["/og-image.png"],
    type: "website",
    url: "https://unisort.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "UniSort - Find Your Perfect University Match",
    description:
      "Discover which Philippine university fits your personality through our quiz. Explore ADMU, DLSU, UP, and UST campus culture.",
    images: ["/og-image.png"],
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
        <Footer />
      </body>
    </html>
  );
}
