import DaysCalculatorContent from "@/components/days-calculator-content"
import type { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "날짜 계산기 - 두 날짜 사이 일수, 며칠 전/후 날짜 계산",
  description: "두 날짜 사이의 경과/남은 일수 계산, 특정 기준일로부터 며칠 전·후 날짜를 바로 계산하세요.",
}

export default function Home() {
  return <DaysCalculatorContent pageTitle="날짜 계산기 - 두 날짜 사이 일수, 며칠 전/후 계산" />
}
