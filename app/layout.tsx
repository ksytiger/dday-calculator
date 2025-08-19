import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import AppShell from "@/components/app-shell"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dday-calculator.example.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/날짜계산기-파비콘.png", type: "image/png" }],
    apple: [{ url: "/날짜계산기-파비콘.png" }],
    shortcut: [{ url: "/날짜계산기-파비콘.png", type: "image/png" }],
  },
}

export const viewport: Viewport = {
  themeColor: "#EB5A0F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning className={GeistSans.className}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
