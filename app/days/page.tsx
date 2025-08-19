import DaysCalculatorContent from "@/components/days-calculator-content"
import type { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: { absolute: "날짜 계산기 - 두 날짜 사이 경과/남은 일수 계산" },
  description:
    "시작일과 종료일을 입력해 두 날짜 사이의 경과/남은 일수를 정확히 계산하세요. 시작일 포함 여부 선택 가능.",
  keywords: ["날짜 계산기", "일수 계산", "기간 계산", "date diff", "between dates"],
  alternates: { canonical: "/days" },
}

export default function DaysPage() {
  return <DaysCalculatorContent pageTitle="두 날짜 사이 경과/남은 일수 계산" />
}


