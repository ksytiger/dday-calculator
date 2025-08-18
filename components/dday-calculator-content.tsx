"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"

interface DateInputs {
  year: string
  month: string
  day: string
}

interface CalculationResult {
  targetDate: Date
  daysDiff: number
  monthsDiff: number
  yearsDiff: number
  isToday: boolean
  isPast: boolean
  dayOfWeek: string
  remainingDays: number
  totalSeconds: number
}

const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"]

export default function DdayCalculatorContent() {
  const [inputs, setInputs] = useState<DateInputs>({
    year: "",
    month: "",
    day: "",
  })

  const [result, setResult] = useState<CalculationResult | null>(null)
  const [error, setError] = useState<string>("")
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Load from URL parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const params = new URLSearchParams(window.location.search)
    const urlInputs = {
      year: params.get("y") || "",
      month: params.get("m") || "",
      day: params.get("d") || "",
    }

    if (urlInputs.year || urlInputs.month || urlInputs.day) {
      setInputs(urlInputs)
      // Auto-calculate if URL has parameters
      setTimeout(() => calculateDday(urlInputs), 100)
    }
  }, [])

  const validateInputs = (inputData: DateInputs): boolean => {
    const year = Number.parseInt(inputData.year)
    const month = Number.parseInt(inputData.month)
    const day = Number.parseInt(inputData.day)

    if (isNaN(year) || year < 1900 || year > 2100) return false
    if (isNaN(month) || month < 1 || month > 12) return false
    if (isNaN(day) || day < 1 || day > 31) return false

    // Check if date exists
    const testDate = new Date(year, month - 1, day)
    if (testDate.getFullYear() !== year || testDate.getMonth() !== month - 1 || testDate.getDate() !== day) {
      return false
    }

    return true
  }

  const calculateMonthsDifference = (from: Date, to: Date) => {
    let months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth())

    if (to.getDate() < from.getDate()) {
      months -= 1
    }

    const tempDate = new Date(from.getFullYear(), from.getMonth() + months, from.getDate())
    const days = Math.floor((to.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24))

    return { months: Math.abs(months), days: Math.abs(days) }
  }

  const calculateDday = useCallback(
    (inputData: DateInputs = inputs) => {
      setError("")

      if (!validateInputs(inputData)) {
        setError("올바른 날짜를 입력해주세요. 존재하지 않는 값입니다.")
        setResult(null)
        return
      }

      const year = Number.parseInt(inputData.year)
      const month = Number.parseInt(inputData.month)
      const day = Number.parseInt(inputData.day)

      // Create target date in KST
      const targetDate = new Date(year, month - 1, day)
      const now = currentTime

      // Calculate days difference (date only, ignoring time)
      const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const targetDateOnly = new Date(year, month - 1, day)
      const daysDiff = Math.floor((targetDateOnly.getTime() - nowDateOnly.getTime()) / (1000 * 60 * 60 * 24))

      // Calculate months and days difference
      const monthsResult = calculateMonthsDifference(nowDateOnly, targetDateOnly)

      // Calculate total seconds difference
      const totalSeconds = Math.floor(Math.abs(targetDate.getTime() - now.getTime()) / 1000)

      const isToday = daysDiff === 0
      const isPast = daysDiff < 0

      setResult({
        targetDate,
        daysDiff: Math.abs(daysDiff),
        monthsDiff: monthsResult.months,
        yearsDiff: Math.floor(monthsResult.months / 12),
        isToday,
        isPast,
        dayOfWeek: DAYS_OF_WEEK[targetDate.getDay()],
        remainingDays: monthsResult.days,
        totalSeconds,
      })
    },
    [inputs, currentTime],
  )

  const handleInputChange = (field: keyof DateInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      calculateDday()
    }
  }

  const formatTime = (seconds: number): { hours: number; minutes: number; seconds: number } => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return { hours, minutes, seconds: remainingSeconds }
  }

  const getCurrentKSTString = (): string => {
    const year = currentTime.getFullYear()
    const month = currentTime.getMonth() + 1
    const day = currentTime.getDate()
    const dayOfWeek = DAYS_OF_WEEK[currentTime.getDay()]
    return `${year}년 ${month}월 ${day}일(${dayOfWeek})`
  }

  // Real-time update for result when it exists
  useEffect(() => {
    if (result && !result.isToday) {
      const timer = setInterval(() => {
        calculateDday()
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [result, calculateDday])

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-4 px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="bg-[#EB5A0F] text-white p-4 border-2 border-[#D14A00] text-center">
          <h1 className="text-lg font-bold">날짜 입력하여 디데이 계산하기</h1>
        </div>

        <div className="bg-[#E8E8E8] border-2 border-[#CCCCCC] p-4">
          {/* Date Inputs */}
          <div className="flex items-end justify-center gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              <input
                id="year"
                type="text"
                inputMode="numeric"
                pattern="\d*"
                placeholder="2025"
                value={inputs.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-20 text-center h-10 border-2 border-[#999999] bg-white focus:border-[#EB5A0F] outline-none"
              />
              <span className="text-base font-bold">년</span>
            </div>

            <div className="flex items-center gap-1">
              <input
                id="month"
                type="text"
                inputMode="numeric"
                pattern="\d*"
                placeholder="8"
                value={inputs.month}
                onChange={(e) => handleInputChange("month", e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-16 text-center h-10 border-2 border-[#999999] bg-white focus:border-[#EB5A0F] outline-none"
              />
              <span className="text-base font-bold">월</span>
            </div>

            <div className="flex items-center gap-1">
              <input
                id="day"
                type="text"
                inputMode="numeric"
                pattern="\d*"
                placeholder="15"
                value={inputs.day}
                onChange={(e) => handleInputChange("day", e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-16 text-center h-10 border-2 border-[#999999] bg-white focus:border-[#EB5A0F] outline-none"
              />
              <span className="text-base font-bold">일</span>
            </div>

            <button
              onClick={() => calculateDday()}
              className="h-10 px-6 bg-[#EB5A0F] text-white border-2 border-[#D14A00] hover:bg-[#D14A00] active:bg-[#C13F00] transition-colors duration-200 font-bold"
            >
              계산하기
            </button>
          </div>

          <div className="space-y-1 text-sm text-[#0066CC] mt-4">
            <p>날짜를 입력하면 그 날짜를 기준으로 얼마나 지났는지, 남았는지 계산합니다.</p>
            <p>개월, 시간까지 계산되어 나옵니다.</p>
            <p className="text-[#EB5A0F] font-bold">오늘은 {getCurrentKSTString()}입니다.</p>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-[#FFE6E6] border-2 border-[#FFCCCC] p-3">
            <p className="text-[#CC0000] text-sm">{error}</p>
          </div>
        )}

        {result && !error && (
          <div className="bg-white border-2 border-[#CCCCCC] p-4">
            <div className="space-y-3" aria-live="polite">
              <h2 className="text-base font-bold text-center">
                {result.targetDate.getFullYear()}년 {result.targetDate.getMonth() + 1}월 {result.targetDate.getDate()}일
                ({result.dayOfWeek})의 오늘 기준 D-Day 계산 결과
              </h2>

              <div className="space-y-2 text-center">
                {/* Days Result */}
                <div className="text-xl font-bold text-[#EB5A0F]">
                  {result.isToday
                    ? "오늘입니다."
                    : result.isPast
                      ? `${result.daysDiff}일 지났습니다.`
                      : `${result.daysDiff}일 남았습니다.`}
                </div>

                {/* Months + Days Result */}
                <div className="text-base">
                  {result.isToday
                    ? "0개월 0일 지났습니다."
                    : result.isPast
                      ? `${result.monthsDiff}개월 ${result.remainingDays}일 지났습니다.`
                      : `${result.monthsDiff}개월 ${result.remainingDays}일 남았습니다.`}
                </div>

                {/* Time Result */}
                <div className="text-sm text-[#666666]">
                  {(() => {
                    const timeFormat = formatTime(result.totalSeconds)
                    return result.isPast
                      ? `총 ${timeFormat.hours}시간 ${timeFormat.minutes}분 지났습니다.`
                      : `총 ${timeFormat.hours}시간 ${timeFormat.minutes}분 남았습니다.`
                  })()}
                </div>
              </div>

              {/* Reset Button */}
              <div className="text-center mt-4">
                <button
                  onClick={() => {
                    setInputs({ year: "", month: "", day: "" })
                    setResult(null)
                    setError("")
                  }}
                  className="px-4 py-2 bg-[#F5F5F5] text-[#666666] border border-[#CCCCCC] hover:bg-[#E8E8E8] transition-colors duration-200 text-sm font-medium rounded"
                >
                  다시 계산하기
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="bg-[#F0F8FF] border-2 border-[#CCE6FF] p-4">
            <h3 className="text-base font-bold mb-2">D-Day(디데이)란?</h3>
            <p className="text-[#333333] text-sm leading-relaxed">
              D-Day는 특정한 날짜까지 남은 일수를 계산하는 방법입니다. 중요한 기념일, 시험일, 프로젝트 마감일 등을
              관리할 때 유용하게 사용됩니다.
            </p>
          </div>

          <div className="bg-[#F0F8FF] border-2 border-[#CCE6FF] p-4">
            <h3 className="text-base font-bold mb-2">사용법</h3>
            <ul className="text-[#333333] text-sm space-y-1 list-disc list-inside">
              <li>년, 월, 일을 순서대로 입력하세요</li>
              <li>계산하기 버튼을 클릭하거나 Enter를 누르세요</li>
              <li>결과는 실시간으로 업데이트됩니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 