'use client'

import { useState, useEffect, useRef } from 'react'
import executeCommand from '@/app/action'
import { Input } from './ui/input'
import TypingLine from './TypingLine'
import { Progress } from './ui/progress'
import Prompt from './Prompt'

export default function Terminal() {
  const [history, setHistory] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [mounted, setMounted] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    const fetchInitialData = async () => {
      setIsLoading(true)
      setProgress(10)

      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev))
      }, 100)

      try {
        const output = await executeCommand('help')
        setProgress(100)
        clearInterval(interval)

        setTimeout(() => {
          setHistory([{ type: 'command', value: 'help' }, output])
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error('Failed to fetch initial data:', error)
        clearInterval(interval)
        setIsLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleEnter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const output = await executeCommand(input)
    if (output === 'INTERMINAL_CLEAR_SIGNAL') {
      setHistory([])
    } else {
      setHistory((prev) => [...prev, { type: 'command', value: input }, output])
    }
    setInput('')
  }

  if (!mounted) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div
      className="min-h-screen w-full max-w-none bg-background p-8 flex flex-col cursor-text overflow-x-hidden font-mono"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="space-y-1">
        {isLoading && (
          <div className="mb-4 animate-in fade-in duration-300">
            <div className="text-main mb-2 font-bold uppercase tracking-tighter">
              Scanning System...
            </div>
            <Progress value={progress} />
          </div>
        )}
        {history.map((h, i) => (
          <div key={i}>
            {typeof h === 'object' && h.type === 'command' ? (
              <Prompt command={h.value} />
              
            ) : (
              
              <div>
                <h1 className='text-chart-4 font-bold italic text-l'>Available commands:</h1>
                <TypingLine text={h} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex-1" />
      <form onSubmit={handleEnter} className="flex items-center gap-2 mt-4">
        <Prompt />
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="!border-none !shadow-none !ring-0 !ring-offset-0 !outline-none bg-transparent p-0 text-xs md:text-xl font-bold h-auto w-full text-chart-5"
          placeholder=""
          autoFocus
          spellCheck={false}
        />
      </form>
      <div ref={bottomRef} className="h-4" />
    </div>
  )
}
