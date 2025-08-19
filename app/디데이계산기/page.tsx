import DdayCalculatorContent from "@/components/dday-calculator-content"
import type { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "디데이 계산기 - 남은/지나간 일수, 개월, 시간 실시간 계산",
  description: "기념일·시험일·마감일까지 남은(지나간) 일수, 개월 수, 시간까지 실시간으로 디데이를 계산합니다.",
}

export default function DdayKoreanPage() {
  return <DdayCalculatorContent pageTitle="디데이 계산기 - 남은/지나간 일수·개월·시간 실시간 계산" />
}


