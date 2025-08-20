import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  // Prefer env when available; otherwise infer from deployment host at runtime via headers
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL
  const fallbackHost = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL
  const normalizedFallback = fallbackHost ? `https://${fallbackHost}` : undefined
  const siteUrl = envUrl || normalizedFallback || "https://날짜계산기.kr"

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/디데이계산기`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/일수계산기`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]
} 