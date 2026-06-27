import type { MetadataRoute } from "next";
import { getAllArticles, SITE_URL } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${SITE_URL}/articulos/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/articulos`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...articles,
  ];
}
