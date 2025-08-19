import DdayCalculatorContent from "@/components/dday-calculator-content"
import type { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: { absolute: "D-Day 계산기 - 디데이 남은/지나간 일수, 개월, 시간 계산" },
  description:
    "기념일·시험일·마감일까지 남은(지나간) 일수, 개월 수, 시간까지 디데이를 실시간으로 계산하고 확인하세요.",
  keywords: ["디데이", "D-Day", "디데이 계산기", "dday calculator", "카운트다운", "남은 일수"],
  alternates: { canonical: "/dday" },
  openGraph: {
    type: "website",
    url: "/dday",
    title: "D-Day 계산기 - 디데이 남은/지나간 일수, 개월, 시간 계산",
    description:
      "중요한 날짜까지 남은(지나간) 일수·개월·시간을 정확하게 계산합니다.",
    siteName: "D-Day 계산기",
    images: [{ url: "/placeholder.jpg", width: 1200, height: 630, alt: "디데이 계산기 미리보기" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "D-Day 계산기 - 디데이 남은/지나간 일수, 개월, 시간 계산",
    description:
      "중요한 날짜까지 남은(지나간) 일수·개월·시간을 정확하게 계산합니다.",
    images: ["/placeholder.jpg"],
  },
}

export default function DdayPage() {
  return <DdayCalculatorContent pageTitle="D-Day 계산기 - 남은/지나간 일수·개월·시간 계산" />
}


