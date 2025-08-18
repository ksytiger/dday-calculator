import ClientOnly from "@/components/client-only"
import DdayCalculatorContent from "@/components/dday-calculator-content"

export default function DdayCalculator() {
  return (
    <ClientOnly 
      fallback={
        <div className="min-h-screen bg-[#F5F5F5] py-4 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg">로딩 중...</div>
          </div>
        </div>
      }
    >
      <DdayCalculatorContent />
    </ClientOnly>
  )
}
