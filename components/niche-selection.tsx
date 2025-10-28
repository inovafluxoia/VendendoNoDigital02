"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, DollarSign, Users, Zap, BookOpen, CheckCircle2, ArrowRight } from "lucide-react"

export type Niche = {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  difficulty: "easy" | "medium" | "hard"
  avgTicket: string
  demand: string
}

const NICHES: Niche[] = [
  {
    id: "health",
    name: "Saúde e Emagrecimento",
    description: "Dietas, treinos, bem-estar e transformação corporal",
    icon: <Heart className="h-5 w-5 sm:h-6 sm:w-6" />,
    difficulty: "easy",
    avgTicket: "R$ 27-97",
    demand: "Muito Alta",
  },
  {
    id: "money",
    name: "Dinheiro e Finanças",
    description: "Como ganhar dinheiro online, investimentos e renda extra",
    icon: <DollarSign className="h-5 w-5 sm:h-6 sm:w-6" />,
    difficulty: "easy",
    avgTicket: "R$ 37-147",
    demand: "Muito Alta",
  },
  {
    id: "relationships",
    name: "Relacionamentos",
    description: "Conquista, sedução, relacionamentos e desenvolvimento pessoal",
    icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />,
    difficulty: "medium",
    avgTicket: "R$ 47-197",
    demand: "Alta",
  },
  {
    id: "productivity",
    name: "Produtividade",
    description: "Organização, foco, gestão de tempo e alta performance",
    icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />,
    difficulty: "medium",
    avgTicket: "R$ 37-127",
    demand: "Alta",
  },
  {
    id: "skills",
    name: "Habilidades Digitais",
    description: "Marketing digital, design, programação e freelancing",
    icon: <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />,
    difficulty: "hard",
    avgTicket: "R$ 97-497",
    demand: "Média",
  },
]

type NicheSelectionProps = {
  onComplete: (niche: Niche) => void
}

export function NicheSelection({ onComplete }: NicheSelectionProps) {
  const [selectedNiche, setSelectedNiche] = useState<Niche | null>(null)

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-background/98 backdrop-blur-xl">
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-success/10 blur-[100px] md:h-[250px] md:w-[250px]" />

      <div className="relative z-10 shrink-0 border-b border-border/50 bg-background/80 px-4 py-3 backdrop-blur-sm md:py-2">
        <div className="mx-auto max-w-2xl">
          <div className="mb-2 flex items-center justify-between md:mb-1">
            <h3 className="text-sm font-bold sm:text-base md:text-sm">Escolha Seu Nicho</h3>
            <span className="text-xs font-medium text-muted-foreground sm:text-sm md:text-xs">20% completo</span>
          </div>
          <Progress value={20} className="h-1.5 md:h-1" />
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 md:px-4 md:py-3">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-4 text-center sm:mb-6 md:mb-3">
            <h2 className="mb-2 text-balance text-xl font-bold leading-tight sm:text-2xl md:mb-1.5 md:text-lg">
              Escolha Seu Nicho de Atuação
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base md:text-sm">
              Selecione o mercado onde você quer começar a vender
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 md:space-y-2">
            {NICHES.map((niche) => {
              const isSelected = selectedNiche?.id === niche.id

              return (
                <button
                  key={niche.id}
                  onClick={() => setSelectedNiche(niche)}
                  className={`w-full rounded-xl border-2 p-3 text-left transition-all active:scale-[0.98] sm:p-4 md:p-2.5 ${
                    isSelected
                      ? "border-success bg-success/10 shadow-[0_0_25px_rgba(34,197,94,0.25)]"
                      : "border-border/50 bg-card/50 hover:border-success/30 hover:bg-card/70"
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4 md:gap-2">
                    <div
                      className={`shrink-0 rounded-xl p-2.5 transition-all sm:p-3 md:p-2 ${
                        isSelected ? "bg-success/20 text-success" : "bg-success/10 text-success"
                      }`}
                    >
                      {niche.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex items-start justify-between gap-2 md:mb-1">
                        <h3 className="text-sm font-bold leading-tight sm:text-base md:text-sm">{niche.name}</h3>
                        {isSelected && (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-success sm:h-5 sm:w-5 md:h-4 md:w-4" />
                        )}
                      </div>

                      <p className="mb-2 text-xs leading-relaxed text-muted-foreground sm:text-sm md:mb-1.5 md:text-xs">
                        {niche.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 md:gap-1">
                        <span className="inline-flex items-center whitespace-nowrap rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium sm:text-sm md:px-2 md:py-0.5 md:text-xs">
                          💰 {niche.avgTicket}
                        </span>
                        <span className="inline-flex items-center whitespace-nowrap rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium sm:text-sm md:px-2 md:py-0.5 md:text-xs">
                          📈 {niche.demand}
                        </span>
                        <span
                          className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium capitalize sm:text-sm md:px-2 md:py-0.5 md:text-xs ${
                            niche.difficulty === "easy"
                              ? "bg-success/20 text-success"
                              : niche.difficulty === "medium"
                                ? "bg-warning/20 text-warning"
                                : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {niche.difficulty === "easy"
                            ? "✓ Fácil"
                            : niche.difficulty === "medium"
                              ? "⚡ Médio"
                              : "⭐ Difícil"}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="h-20 md:h-14" />
        </div>
      </div>

      {selectedNiche && (
        <div className="relative z-10 shrink-0 border-t border-border/50 bg-background/95 px-4 py-3 backdrop-blur-sm md:py-2">
          <div className="mx-auto max-w-2xl">
            <Button
              onClick={() => onComplete(selectedNiche)}
              size="lg"
              className="h-11 w-full gap-2 rounded-xl bg-success text-sm font-bold text-success-foreground shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:bg-success/90 sm:h-12 sm:text-base md:h-10 md:text-sm"
            >
              Continuar com {selectedNiche.name}
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
