import ClientOnly from "@/components/client-only"
import DdayCalculatorContent from "@/components/dday-calculator-content"

export default function DdayCalculator() {
  return (
    <>
      <section className="bg-[#F5F5F5] py-4 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-lg font-bold text-center">D-Day 계산기 - 디데이 계산하기</h1>
          <p className="text-sm text-center text-[#333333] mt-2">
            연월일을 입력하면 특정 날짜까지 남은 일수와 경과 일수를 정확하게 계산해드립니다.
          </p>
        </div>
      </section>

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
    </>
  )
}
