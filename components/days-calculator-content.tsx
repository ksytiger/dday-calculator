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

function formatKoreanDate(date: Date): string {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일(${DAYS_OF_WEEK[date.getDay()]})`
}

function diffDays(start: Date, end: Date, includeStart: boolean): number {
  const startMid = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  const endMid = new Date(end.getFullYear(), end.getMonth(), end.getDate())
  const msPerDay = 1000 * 60 * 60 * 24
  const raw = Math.floor((endMid.getTime() - startMid.getTime()) / msPerDay)
  return raw + (includeStart ? 1 : 0)
}

function addDays(base: Date, days: number): Date {
  const result = new Date(base)
  result.setDate(result.getDate() + days)
  return result
}

// Reusable UI fragments (module scope to preserve identity across renders)
const inputBaseClass =
  "w-full h-10 border-2 border-[#999999] bg-white focus:border-[#EB5A0F] outline-none px-3 text-base"

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
        placeholder="2025"
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
        placeholder="8"
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
        placeholder="19"
        value={value.day}
        onChange={(e) => onChange({ ...value, day: e.target.value })}
      />
      <span className="text-base font-bold">일</span>
    </div>
  </div>
)

export default function DaysCalculatorContent() {
  // Section 1: between two dates
  const [start1, setStart1] = useState<YMD>({ year: "2025", month: "8", day: "19" })
  const [end1, setEnd1] = useState<YMD>({ year: "2025", month: "8", day: "19" })
  const [includeStart1, setIncludeStart1] = useState<boolean>(true)
  const [betweenResult, setBetweenResult] = useState<
    | { ok: true; days: number }
    | { ok: false; message: string }
    | null
  >(null)

  const handleCalculateBetween = () => {
    const s = toDate(start1)
    const e = toDate(end1)
    if (!s || !e) return setBetweenResult({ ok: false, message: "올바른 날짜를 입력해주세요." })
    if (e < s) return setBetweenResult({ ok: false, message: "종료일은 시작일 이후여야 합니다." })
    setBetweenResult({ ok: true, days: diffDays(s, e, includeStart1) })
  }

  // Section 2: N days after
  const [start2, setStart2] = useState<YMD>({ year: "2025", month: "8", day: "19" })
  const [afterDays, setAfterDays] = useState<string>("0")
  const [includeStart2, setIncludeStart2] = useState<boolean>(true)
  const [afterResult, setAfterResult] = useState<
    | { ok: true; date: Date }
    | { ok: false; message: string }
    | null
  >(null)

  const handleCalculateAfter = () => {
    const s = toDate(start2)
    if (!s) return setAfterResult({ ok: false, message: "올바른 날짜를 입력해주세요." })
    const n = Number.parseInt(afterDays || "0")
    if (Number.isNaN(n) || n < 0) return setAfterResult({ ok: false, message: "일수는 0 이상의 숫자여야 합니다." })
    const offset = includeStart2 ? Math.max(n - 1, 0) : n
    const target = addDays(s, offset)
    setAfterResult({ ok: true, date: target })
  }

  // Section 3: N days before
  const [start3, setStart3] = useState<YMD>({ year: "2025", month: "8", day: "19" })
  const [beforeDays, setBeforeDays] = useState<string>("0")
  const [includeStart3, setIncludeStart3] = useState<boolean>(true)
  const [beforeResult, setBeforeResult] = useState<
    | { ok: true; date: Date }
    | { ok: false; message: string }
    | null
  >(null)

  const handleCalculateBefore = () => {
    const s = toDate(start3)
    if (!s) return setBeforeResult({ ok: false, message: "올바른 날짜를 입력해주세요." })
    const n = Number.parseInt(beforeDays || "0")
    if (Number.isNaN(n) || n < 0) return setBeforeResult({ ok: false, message: "일수는 0 이상의 숫자여야 합니다." })
    const offset = includeStart3 ? Math.max(n - 1, 0) : n
    const target = addDays(s, -offset)
    setBeforeResult({ ok: true, date: target })
  }

  const inputBase = inputBaseClass

  const radioBase = radioBaseClass

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-4 px-4">
      <div className="max-w-xl mx-auto space-y-5">
        <div className="w-full bg-[#EB5A0F] text-white border-2 border-[#D14A00] text-center py-3">
          <h1 className="text-lg font-extrabold">날짜 계산기</h1>
        </div>
        {/* Section 1: Between two dates */}
        <SectionCard heading="일수 계산기" title="특정한 날짜로부터 특정한 날짜까지의 일수를 계산합니다.">
          <p className="text-[#333333] text-sm leading-relaxed">
            시작일과 종료일을 입력하고 ‘일수를 계산한다’를 누르면 두 날짜 사이가 몇 일인지 바로 알려드립니다.
            필요하면 아래에서 시작일 포함/불포함을 선택해 더 정확하게 계산하세요.
          </p>
          <div className="space-y-3">
            <div>
              <div className="text-sm font-bold mb-1">시작일</div>
              <YMDInputs value={start1} onChange={setStart1} />
            </div>
            <div>
              <div className="text-sm font-bold mb-1">종료일</div>
              <YMDInputs value={end1} onChange={setEnd1} />
            </div>
            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  className={radioBase}
                  checked={includeStart1}
                  onChange={() => setIncludeStart1(true)}
                />
                시작일 포함
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  className={radioBase}
                  checked={!includeStart1}
                  onChange={() => setIncludeStart1(false)}
                />
                시작일 <span className="font-bold">불포함</span>
              </label>
            </div>
            <button
              onClick={handleCalculateBetween}
              className="w-full h-11 bg-[#3B82F6] text-white border-2 border-[#1D4ED8] hover:bg-[#2563EB] active:bg-[#1E40AF] transition-colors duration-200 font-bold"
            >
              일수를 계산한다
            </button>
          </div>
          {betweenResult && (
            <div className="mt-3">
              {betweenResult.ok ? (
              <div className="bg-white border-2 border-[#CCCCCC] p-3 text-center text-base font-bold text-[#EB5A0F]">
                총 {betweenResult.days}일
              </div>
              ) : (
              <div className="bg-[#FFE6E6] border-2 border-[#FFCCCC] p-3 text-sm text-[#CC0000]">
                {betweenResult.message}
              </div>
              )}
            </div>
          )}
        </SectionCard>

        {/* Section 2: After N days */}
        <SectionCard heading="며칠 후 계산기" title="특정한 날짜와 일수로부터 며칠후인가의 날짜를 계산한다.">
          <p className="text-[#333333] text-sm leading-relaxed">
            시작일과 ‘며칠 후’ 값을 입력한 뒤 ‘날짜를 계산한다’를 누르면 해당 일수 뒤의 날짜를 알려드립니다.
            시작일을 포함으로 선택하면 하루가 추가되어 결과가 달라질 수 있어요.
          </p>
          <div className="space-y-3">
            <div>
              <div className="text-sm font-bold mb-1">시작일</div>
              <YMDInputs value={start2} onChange={setStart2} />
            </div>
            <div className="flex items-center gap-1">
              <input
                className="h-10 w-20 border-2 border-[#999999] bg-white focus:border-[#EB5A0F] outline-none px-2 text-base text-center"
                inputMode="numeric"
                pattern="\\d*"
                placeholder="0"
                value={afterDays}
                onChange={(e) => setAfterDays(e.target.value)}
              />
              <span className="text-base font-bold">일후</span>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  className={radioBase}
                  checked={includeStart2}
                  onChange={() => setIncludeStart2(true)}
                />
                시작일 포함
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  className={radioBase}
                  checked={!includeStart2}
                  onChange={() => setIncludeStart2(false)}
                />
                시작일 <span className="font-bold">불포함</span>
              </label>
            </div>
            <button
              onClick={handleCalculateAfter}
              className="w-full h-11 bg-[#3B82F6] text-white border-2 border-[#1D4ED8] hover:bg-[#2563EB] active:bg-[#1E40AF] transition-colors duration-200 font-bold"
            >
              날짜를 계산한다
            </button>
          </div>
          {afterResult && (
            <div className="mt-3">
              {afterResult.ok ? (
              <div className="bg-white border-2 border-[#CCCCCC] p-3 text-center text-base font-bold text-[#333333]">
                결과: <span className="text-[#EB5A0F]">{formatKoreanDate(afterResult.date)}</span>
              </div>
              ) : (
              <div className="bg-[#FFE6E6] border-2 border-[#FFCCCC] p-3 text-sm text-[#CC0000]">
                {afterResult.message}
              </div>
              )}
            </div>
          )}
        </SectionCard>

        {/* Section 3: Before N days */}
        <SectionCard heading="며칠 전 계산기" title="특정한 날짜와 일수로부터 며칠전인가의 날짜를 계산합니다.">
          <p className="text-[#333333] text-sm leading-relaxed">
            시작일과 ‘며칠 전’ 값을 입력하고 ‘날짜를 계산한다’를 누르면 지정한 일수만큼 이전 날짜를 알려드립니다.
            마찬가지로 시작일 포함 여부를 선택해 계산 기준을 조정할 수 있습니다.
          </p>
          <div className="space-y-3">
            <div>
              <div className="text-sm font-bold mb-1">시작일</div>
              <YMDInputs value={start3} onChange={setStart3} />
            </div>
            <div className="flex items-center gap-1">
              <input
                className="h-10 w-20 border-2 border-[#999999] bg-white focus:border-[#EB5A0F] outline-none px-2 text-base text-center"
                inputMode="numeric"
                pattern="\\d*"
                placeholder="0"
                value={beforeDays}
                onChange={(e) => setBeforeDays(e.target.value)}
              />
              <span className="text-base font-bold">일전</span>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  className={radioBase}
                  checked={includeStart3}
                  onChange={() => setIncludeStart3(true)}
                />
                시작일 포함
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  className={radioBase}
                  checked={!includeStart3}
                  onChange={() => setIncludeStart3(false)}
                />
                시작일 <span className="font-bold">불포함</span>
              </label>
            </div>
            <button
              onClick={handleCalculateBefore}
              className="w-full h-11 bg-[#3B82F6] text-white border-2 border-[#1D4ED8] hover:bg-[#2563EB] active:bg-[#1E40AF] transition-colors duration-200 font-bold"
            >
              날짜를 계산한다
            </button>
          </div>
          {beforeResult && (
            <div className="mt-3">
              {beforeResult.ok ? (
              <div className="bg-white border-2 border-[#CCCCCC] p-3 text-center text-base font-bold text-[#333333]">
                결과: <span className="text-[#EB5A0F]">{formatKoreanDate(beforeResult.date)}</span>
              </div>
              ) : (
              <div className="bg-[#FFE6E6] border-2 border-[#FFCCCC] p-3 text-sm text-[#CC0000]">
                {beforeResult.message}
              </div>
              )}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  )
}


