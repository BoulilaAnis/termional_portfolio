'use client'

import { useState, useEffect, useRef } from 'react'
import executeCommand from '@/app/action'
import { Input } from './ui/input'
import TypingLine from './TypingLine'

export default function Terminal() {
  const [history, setHistory] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [mounted, setMounted] = useState(false)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleEnter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const output = await executeCommand(input)
    if (output === 'INTERMINAL_CLEAR_SIGNAL') {
      setHistory([])
    } else {
      setHistory((prev) => [...prev, `➜ ${input}`, output])
    }
    setInput('')
  }

  if (!mounted) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div 
      className="min-h-screen w-full max-w-none bg-background p-8 font-mono flex flex-col cursor-text overflow-x-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="space-y-1">
        <h1 className='text-main'>type help for more info</h1>
        {history.map((h, i) => (
          <TypingLine key={i} text={h} />
        ))}
      </div>
      <div className="flex-1" />
      <form onSubmit={handleEnter} className="flex items-center gap-2 mt-4">
        <span className="text-main font-bold text-xl shrink-0">➜</span>
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="!border-none !shadow-none !ring-0 !ring-offset-0 !outline-none bg-transparent p-0 text-xl font-bold h-auto w-full text-chart-5"
          placeholder=""
          autoFocus
          spellCheck={false}
        />
      </form>
      <div ref={bottomRef} className="h-4" />
    </div>
  )
}
