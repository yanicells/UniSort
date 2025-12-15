export default function sitemap() {
  const baseUrl = "https://unisort.com";
  const routes = [
    "",
    "/quiz",
    "/freedom-wall",
    "/admu",
    "/dlsu",
    "/up",
    "/ust",
    "/stats",
  ];

  const now = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
  }));
}


