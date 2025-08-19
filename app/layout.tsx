import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import AppShell from "@/components/app-shell"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dday-calculator.example.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "D-Day 계산기 - 디데이 계산하기",
    template: "%s | D-Day 계산기",
  },
  description: "연월일을 입력하여 정확한 디데이를 계산하는 도구입니다.",
  keywords: [
    "디데이",
    "D-Day",
    "디데이 계산기",
    "d-day calculator",
    "남은 날짜",
    "경과 일수",
    "날짜 계산",
  ],
  applicationName: "D-Day 계산기",
  authors: [{ name: "ksytiger" }],
  creator: "ksytiger",
  publisher: "ksytiger",
  category: "utilities",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "ko-KR": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "D-Day 계산기 - 디데이 계산하기",
    description: "연월일을 입력하여 정확한 디데이를 계산하는 도구입니다.",
    siteName: "D-Day 계산기",
    locale: "ko_KR",
    images: [
      {
        url: "/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "D-Day 계산기 미리보기 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "D-Day 계산기 - 디데이 계산하기",
    description: "연월일을 입력하여 정확한 디데이를 계산하는 도구입니다.",
    images: ["/placeholder.jpg"],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/날짜계산기-파비콘.png", type: "image/png" },
    ],
    apple: [
      { url: "/날짜계산기-파비콘.png" },
    ],
    shortcut: [
      { url: "/날짜계산기-파비콘.png", type: "image/png" },
    ],
  },
  generator: "v0.app",
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
