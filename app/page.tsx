"use client"

import { useState } from "react"
import { SimulatorHero } from "@/components/simulator-hero"
import { SimulatorInterface } from "@/components/simulator-interface"

export default function Home() {
  const [journeyStarted, setJourneyStarted] = useState(false)

  return (
    <main className="min-h-screen">
      {!journeyStarted ? (
        <SimulatorHero onStartJourney={() => setJourneyStarted(true)} />
      ) : (
        <SimulatorInterface showTutorialInitially={true} />
      )}
    </main>
  )
}
