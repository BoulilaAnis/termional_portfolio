'use client'

import { useState, useEffect } from 'react'
import { renderLexical } from '@/lib/renderLexical'

export default function TypingLine({ text }: { text: any }) {
  const [display, setDisplay] = useState('')
  const isRichText = typeof text === 'object' && text !== null && 'root' in text

  useEffect(() => {
    if (!isRichText && typeof text === 'string') {
      let i: number = 0
      const interval = setInterval(() => {
        setDisplay(text.slice(0, i))
        i++
        if (i > text.length) clearInterval(interval)
      }, 30)
      return () => clearInterval(interval)
    }
  }, [text, isRichText])

  if (isRichText) {
    return (
      <div className="prose prose-invert prose-emerald max-w-none font-mono text-foreground [&_p]:my-1 [&_ul]:my-1 [&_li]:my-0">
        {renderLexical(text.root)}
      </div>
    )
  }

  return (
    <div className="whitespace-pre-wrap text-foreground font-mono leading-relaxed">
      {display || (typeof text === 'string' ? '' : JSON.stringify(text))}
    </div>
  )
}
