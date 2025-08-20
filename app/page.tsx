import DaysCalculatorContent from "@/components/days-calculator-content"
import type { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "날짜 계산기 - 두 날짜 사이 일수, 며칠 전/후 날짜 계산",
  description: "날짜계산기는 두 날짜 사이의 경과/남은 일수를 계산하고, 특정 기준일로부터 며칠 전·후 날짜를 바로 확인할 수 있는 도구입니다.",
  alternates: { canonical: "/" },
}

export default function Home() {
  return <DaysCalculatorContent pageTitle="날짜 계산기 - 두 날짜 사이 일수, 며칠 전/후 계산" />
}
