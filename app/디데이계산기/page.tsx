import DdayCalculatorContent from "@/components/dday-calculator-content"
import type { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: { absolute: "디데이 계산기 - 남은/지나간 일수, 개월, 시간 실시간 계산" },
  description:
    "기념일·시험일·마감일까지 남은(지나간) 일수, 개월 수, 시간까지 실시간으로 디데이를 계산합니다.",
  keywords: ["디데이", "D-Day", "디데이 계산기", "dday", "카운트다운", "남은 일수"],
  alternates: { canonical: "/디데이계산기" },
  openGraph: {
    type: "website",
    url: "/디데이계산기",
    title: "디데이 계산기 - 남은/지나간 일수, 개월, 시간 실시간 계산",
    description:
      "중요한 날짜까지 남은(지나간) 일수·개월·시간을 정확하게 계산합니다.",
    siteName: "디데이 계산기",
    images: [{ url: "/placeholder.jpg", width: 1200, height: 630, alt: "디데이 계산기 미리보기" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "디데이 계산기 - 남은/지나간 일수, 개월, 시간 실시간 계산",
    description:
      "중요한 날짜까지 남은(지나간) 일수·개월·시간을 정확하게 계산합니다.",
    images: ["/placeholder.jpg"],
  },
}

export default function DdayKoreanPage() {
  return <DdayCalculatorContent pageTitle="디데이 계산기 - 남은/지나간 일수·개월·시간 실시간 계산" />
}


