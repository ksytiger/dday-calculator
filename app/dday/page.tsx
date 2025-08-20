import DdayCalculatorContent from "@/components/dday-calculator-content"
import type { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "디데이 계산기 - 디데이 남은/지나간 일수, 개월, 시간 계산",
  description: "기념일·시험일·마감일까지 남은(지나간) 일수, 개월 수, 시간까지 디데이를 실시간으로 계산하고 확인하세요.",
}

export default function DdayPage() {
  return <DdayCalculatorContent pageTitle="D-Day 계산기 - 남은/지나간 일수·개월·시간 계산" />
}


