import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  // Prefer env when available; otherwise infer from deployment host at runtime via headers
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL
  const fallbackHost = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL
  const normalizedFallback = fallbackHost ? `https://${fallbackHost}` : undefined
  const siteUrl = envUrl || normalizedFallback || "https://날짜계산기.kr"
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
} 