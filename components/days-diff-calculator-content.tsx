"use client"

import type React from "react"
import { useState } from "react"

type YMD = { year: string; month: string; day: string }

const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"]

function toDate(input: YMD): Date | null {
  const year = Number.parseInt(input.year)
  const month = Number.parseInt(input.month)
  const day = Number.parseInt(input.day)

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) return null
  if (year < 1900 || year > 2100) return null
  if (month < 1 || month > 12) return null
  if (day < 1 || day > 31) return null

  const d = new Date(year, month - 1, day)
  if (
    d.getFullYear() !== year ||
    d.getMonth() !== month - 1 ||
    d.getDate() !== day
  ) {
    return null
  }
  return d
}

function diffDays(start: Date, end: Date, includeStart: boolean): number {
  const startMid = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  const endMid = new Date(end.getFullYear(), end.getMonth(), end.getDate())
  const msPerDay = 1000 * 60 * 60 * 24
  const raw = Math.floor((endMid.getTime() - startMid.getTime()) / msPerDay)
  return raw + (includeStart ? 1 : 0)
}

const radioBaseClass = "h-4 w-4 text-[#EB5A0F]"

const SectionCard: React.FC<{ heading?: string; title: string; children: React.ReactNode }> = ({ heading, title, children }) => (
  <div className="bg-[#F5F5F5] border-2 border-[#DDDDDD] p-4 space-y-4">
    <div className="bg-white p-3 border-2 border-[#EB5A0F] text-center">
      {heading ? (
        <>
          <div className="text-lg font-extrabold text-[#D14A00]">{heading}</div>
          <h2 className="text-sm font-medium text-[#333333] mt-1">{title}</h2>
        </>
      ) : (
        <h2 className="text-base font-bold text-[#D14A00]">{title}</h2>
      )}
    </div>
    {children}
  </div>
)

const YMDInputs: React.FC<{
  value: YMD
  onChange: (next: YMD) => void
}> = ({ value, onChange }) => (
  <div className="flex items-center gap-3 flex-wrap">
    <div className="flex items-center gap-1">
      <input
        className="h-10 w-24 border-2 border-[#999999] bg-white focus:border-[#EB5A0F] outline-none px-2 text-base text-center"
        inputMode="numeric"
        pattern="\\d*"
        value={value.year}
        onChange={(e) => onChange({ ...value, year: e.target.value })}
      />
      <span className="text-base font-bold">년</span>
    </div>
    <div className="flex items-center gap-1">
      <input
        className="h-10 w-16 border-2 border-[#999999] bg-white focus:border-[#EB5A0F] outline-none px-2 text-base text-center"
        inputMode="numeric"
        pattern="\\d*"
        value={value.month}
        onChange={(e) => onChange({ ...value, month: e.target.value })}
      />
      <span className="text-base font-bold">월</span>
    </div>
    <div className="flex items-center gap-1">
      <input
        className="h-10 w-16 border-2 border-[#999999] bg-white focus:border-[#EB5A0F] outline-none px-2 text-base text-center"
        inputMode="numeric"
        pattern="\\d*"
        value={value.day}
        onChange={(e) => onChange({ ...value, day: e.target.value })}
      />
      <span className="text-base font-bold">일</span>
    </div>
  </div>
)

export default function DaysDiffCalculatorContent({ pageTitle }: { pageTitle?: string } = {}) {
  const [start, setStart] = useState<YMD>({ year: "", month: "", day: "" })
  const [end, setEnd] = useState<YMD>({ year: "", month: "", day: "" })
  const [includeStart, setIncludeStart] = useState<boolean>(true)
  const [result, setResult] = useState<
    | { ok: true; days: number }
    | { ok: false; message: string }
    | null
  >(null)

  const handleCalculate = () => {
    const s = toDate(start)
    const e = toDate(end)
    if (!s || !e) return setResult({ ok: false, message: "올바른 날짜를 입력해주세요." })
    if (e < s) return setResult({ ok: false, message: "종료일은 시작일 이후여야 합니다." })
    setResult({ ok: true, days: diffDays(s, e, includeStart) })
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-4 px-4">
      <div className="max-w-xl mx-auto space-y-5">
        <div className="w-full bg-[#EB5A0F] text-white border-2 border-[#D14A00] text-center py-3">
          <h1 className="text-lg font-extrabold">{pageTitle ?? "일수 계산기"}</h1>
        </div>

        <SectionCard heading="일수 계산기" title="특정한 날짜로부터 특정한 날짜까지의 일수를 계산합니다.">
          <p className="text-[#333333] text-sm leading-relaxed">
            시작일과 종료일을 입력하고 ‘일수를 계산한다’를 누르면 두 날짜 사이가 몇 일인지 바로 알려드립니다.
            필요하면 아래에서 시작일 포함/불포함을 선택해 더 정확하게 계산하세요.
          </p>
          <div className="space-y-3">
            <div>
              <div className="text-sm font-bold mb-1">시작일</div>
              <YMDInputs value={start} onChange={setStart} />
            </div>
            <div>
              <div className="text-sm font-bold mb-1">종료일</div>
              <YMDInputs value={end} onChange={setEnd} />
            </div>
            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  className={radioBaseClass}
                  checked={includeStart}
                  onChange={() => setIncludeStart(true)}
                />
                시작일 포함
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  className={radioBaseClass}
                  checked={!includeStart}
                  onChange={() => setIncludeStart(false)}
                />
                시작일 <span className="font-bold">불포함</span>
              </label>
            </div>
            <button
              onClick={handleCalculate}
              className="w-full h-11 bg-[#3B82F6] text-white border-2 border-[#1D4ED8] hover:bg-[#2563EB] active:bg-[#1E40AF] transition-colors duration-200 font-bold"
            >
              일수를 계산한다
            </button>
          </div>
          {result && (
            <div className="mt-3">
              {result.ok ? (
                <div className="bg-white border-2 border-[#CCCCCC] p-3 text-center text-base font-bold text-[#EB5A0F]">
                  총 {result.days}일
                </div>
              ) : (
                <div className="bg-[#FFE6E6] border-2 border-[#FFCCCC] p-3 text-sm text-[#CC0000]">
                  {result.message}
                </div>
              )}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  )
}



