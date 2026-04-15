'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ScentFinderDict {
  q1: string; q1_a1: string; q1_a2: string; q1_a3: string; q1_a4: string
  q2: string; q2_a1: string; q2_a2: string; q2_a3: string
  q3: string; q3_a1: string; q3_a2: string; q3_a3: string
  result_label: string; result_text: string
  scent_floral: string; scent_woody: string; scent_fresh: string; scent_sweet: string
  restart: string; next: string; back: string; question_of: string
}

interface Props {
  lang: string
  cta: string
  dict: ScentFinderDict
}

function getQuestions(d: ScentFinderDict) {
  return [
    { question: d.q1, options: [d.q1_a1, d.q1_a2, d.q1_a3, d.q1_a4] },
    { question: d.q2, options: [d.q2_a1, d.q2_a2, d.q2_a3] },
    { question: d.q3, options: [d.q3_a1, d.q3_a2, d.q3_a3] },
  ]
}

function getRecommendation(answers: number[]): 'floral' | 'woody' | 'fresh' | 'sweet' {
  const q1 = answers[0]
  const q3 = answers[2]
  if (q1 === 0 || q3 === 0) return 'floral'
  if (q1 === 2 || q3 === 1) return 'woody'
  if (q1 === 1 || q3 === 2) return 'fresh'
  if (q1 === 3) return 'sweet'
  return 'floral'
}

export default function ScentFinder({ lang, cta, dict }: Props) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)

  const questions = getQuestions(dict)
  const isResult = step === questions.length
  const currentQ = questions[step]

  const scentNames: Record<string, string> = {
    floral: dict.scent_floral,
    woody:  dict.scent_woody,
    fresh:  dict.scent_fresh,
    sweet:  dict.scent_sweet,
  }

  function choose(idx: number) { setSelected(idx) }

  function next() {
    if (selected === null) return
    setAnswers([...answers, selected])
    setSelected(null)
    setStep(step + 1)
  }

  function back() {
    if (step === 0) return
    setAnswers(answers.slice(0, -1))
    setSelected(null)
    setStep(step - 1)
  }

  function restart() {
    setStep(0)
    setAnswers([])
    setSelected(null)
  }

  const scent = isResult ? getRecommendation(answers) : null
  const progress = (step / questions.length) * 100

  const questionLabel = dict.question_of
    .replace('{step}', String(step + 1))
    .replace('{total}', String(questions.length))

  return (
    <div>
      {/* Progress bar */}
      <div className="h-1 rounded-full mb-8 overflow-hidden" style={{ background: 'var(--border-soft)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${isResult ? 100 : progress}%`, background: 'var(--terra)' }}
        />
      </div>

      {isResult && scent ? (
        /* Result */
        <div className="text-center py-4">
          <p className="text-xs font-medium uppercase tracking-widest mb-3"
            style={{ color: 'var(--terra)', fontFamily: 'var(--font-body)' }}>
            {dict.result_label}
          </p>
          <p className="mb-6" style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--text)',
          }}>
            {dict.result_text} {scentNames[scent]}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href={`/${lang}/shop`}
              className="btn-press inline-flex items-center gap-2 px-6 py-3 rounded-[14px] text-sm font-medium text-white"
              style={{ background: 'var(--terra)', fontFamily: 'var(--font-body)' }}>
              {cta}
            </Link>
            <button onClick={restart}
              className="text-sm transition-opacity hover:opacity-60"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
              {dict.restart}
            </button>
          </div>
        </div>
      ) : (
        /* Question */
        <div>
          <p className="text-xs font-medium uppercase tracking-widest mb-2"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
            {questionLabel}
          </p>
          <p className="mb-6" style={{
            fontFamily: 'var(--font-display)', fontSize: '1.1rem',
            color: 'var(--text)', lineHeight: '1.5',
          }}>
            {currentQ.question}
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {currentQ.options.map((option, idx) => {
              const isSelected = selected === idx
              return (
                <button key={idx} onClick={() => choose(idx)}
                  className="text-left p-4 rounded-[14px] transition-all"
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                    color: isSelected ? 'var(--terra)' : 'var(--text)',
                    background: isSelected ? 'oklch(from var(--terra) l c h / 0.08)' : 'var(--bg-sand)',
                    border: isSelected ? '1.5px solid var(--terra)' : '1.5px solid transparent',
                  }}>
                  {option}
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-between">
            {step > 0 ? (
              <button onClick={back}
                className="text-sm transition-opacity hover:opacity-60"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                {dict.back}
              </button>
            ) : <div />}
            <button onClick={next} disabled={selected === null}
              className="btn-press px-6 py-2.5 rounded-[14px] text-sm font-medium text-white transition-opacity disabled:opacity-40"
              style={{ background: 'var(--terra)', fontFamily: 'var(--font-body)' }}>
              {dict.next}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
