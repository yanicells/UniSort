import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "@radix-ui/react-dialog",
      "@radix-ui/react-select",
      "@radix-ui/react-popover",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-radio-group",
      "@radix-ui/react-checkbox",
      "@tiptap/react",
      "@tiptap/starter-kit",
      "date-fns",
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.optimization.minimize = true;
    }
    return config;
  },
};

export default nextConfig;
