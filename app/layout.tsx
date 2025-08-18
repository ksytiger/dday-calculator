import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "D-Day 계산기 - 디데이 계산하기",
  description: "연월일을 입력하여 정확한 디데이를 계산하는 도구입니다.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning className={GeistSans.className}>{children}</body>
    </html>
  )
}
