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

  const renderColorized = (content: string) => {
    return content.split('\n').map((line, i) => {
      // Regex to find: "> command - description"
      const match = line.match(/^(\s*>\s*)([\w-]+)(\s*-.*)$/)

      if (match) {
        return (
          <div key={i} className="flex flex-wrap gap-x-1">
            <span className="text-foreground">{match[1]}</span>
            <span className="text-chart-1 font-bold">{match[2]}</span>
            <span className="text-foreground/80">{match[3]}</span>
          </div>
        )
      }
      return <div key={i}>{line}</div>
    })
  }

  return (
    <div className="whitespace-pre-wrap text-foreground font-mono leading-relaxed text-xs md:text-xl">
      {renderColorized(display) || (typeof text === 'string' ? '' : JSON.stringify(text))}
    </div>
  )
}
