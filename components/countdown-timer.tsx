"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Get tomorrow at midnight
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)

      const now = new Date()
      const difference = tomorrow.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num: number) => String(num).padStart(2, "0")

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      <Clock className="h-4 w-4 animate-pulse text-success sm:h-5 sm:w-5" />
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/20 font-mono text-sm font-bold text-success sm:h-10 sm:w-10 sm:text-base">
            {formatNumber(timeLeft.hours)}
          </div>
          <span className="mt-0.5 text-[10px] font-medium text-muted-foreground sm:text-xs">hrs</span>
        </div>
        <span className="text-lg font-bold text-success sm:text-xl">:</span>
        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/20 font-mono text-sm font-bold text-success sm:h-10 sm:w-10 sm:text-base">
            {formatNumber(timeLeft.minutes)}
          </div>
          <span className="mt-0.5 text-[10px] font-medium text-muted-foreground sm:text-xs">min</span>
        </div>
        <span className="text-lg font-bold text-success sm:text-xl">:</span>
        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/20 font-mono text-sm font-bold text-success sm:h-10 sm:w-10 sm:text-base">
            {formatNumber(timeLeft.seconds)}
          </div>
          <span className="mt-0.5 text-[10px] font-medium text-muted-foreground sm:text-xs">seg</span>
        </div>
      </div>
    </div>
  )
}
