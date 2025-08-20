import DdayCalculatorContent from "@/components/dday-calculator-content"
import type { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "디데이 계산기 - 디데이 남은/지나간 일수, 개월, 시간 계산",
  description: "디데이계산기는 기념일·시험일·마감일까지 남은(지나간) 일수와 개월, 시간을 실시간으로 계산해 주는 디데이 계산 도구입니다.",
  alternates: { canonical: "/디데이계산기" },
  robots: { index: false, follow: true },
}

export default function DdayPage() {
  return <DdayCalculatorContent pageTitle="디데이 계산기 - 남은/지나간 일수·개월·시간 계산" />
}


