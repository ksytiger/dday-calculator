import DaysCalculatorContent from "@/components/days-calculator-content"
import type { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: { absolute: "날짜 계산기 - 두 날짜 사이 일수, 며칠 전/후 날짜 계산" },
  description:
    "두 날짜 사이의 경과/남은 일수 계산, 특정 기준일로부터 며칠 전·후 날짜를 바로 계산하세요. 시작일 포함 옵션 지원.",
  keywords: ["날짜 계산기", "일수 계산", "며칠 전", "며칠 후", "기간 계산", "date calculator"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "날짜 계산기 - 두 날짜 사이 일수, 며칠 전/후 날짜 계산",
    description:
      "경과/남은 일수와 기준일로부터 며칠 전·후 날짜를 간편하게 계산하세요.",
    siteName: "날짜 계산기",
    images: [{ url: "/placeholder.jpg", width: 1200, height: 630, alt: "날짜 계산기 미리보기 이미지" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "날짜 계산기 - 두 날짜 사이 일수, 며칠 전/후 날짜 계산",
    description:
      "경과/남은 일수와 기준일로부터 며칠 전·후 날짜를 간편하게 계산하세요.",
    images: ["/placeholder.jpg"],
  },
}

export default function Home() {
  return <DaysCalculatorContent pageTitle="날짜 계산기 - 두 날짜 사이 일수, 며칠 전/후 계산" />
}
