import DaysDiffCalculatorContent from "@/components/days-diff-calculator-content"
import type { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "일수 계산기 - 두 날짜 사이 경과/남은 일수 계산",
  description: "일수계산기는 시작일과 종료일을 입력하면 두 날짜 사이의 경과/남은 일수를 정확하게 계산해 주는 간편한 일수 계산 도구입니다.",
  alternates: { canonical: "/일수계산기" },
  robots: { index: false, follow: true },
}

export default function DaysDiffAliasPage() {
  return <DaysDiffCalculatorContent pageTitle="일수계산기 - 두 날짜 사이 경과/남은 일수 계산" />
}


