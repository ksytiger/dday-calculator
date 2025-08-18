import ClientOnly from "@/components/client-only"
import DdayCalculatorContent from "@/components/dday-calculator-content"

export default function DdayCalculator() {
  return (
    <ClientOnly 
      fallback={
        <div className="min-h-screen bg-[#F5F5F5] py-4 px-4 flex items-center justify-center">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-lg font-bold">D-Day 계산기 로딩 중...</h2>
            <p className="text-sm text-[#333333] mt-2">
              디데이 계산 도구를 불러오는 중입니다. 잠시만 기다려주세요.
            </p>
          </div>
        </div>
      }
    >
      <DdayCalculatorContent />
    </ClientOnly>
  )
}
