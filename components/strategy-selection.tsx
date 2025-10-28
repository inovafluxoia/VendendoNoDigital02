"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, CheckCircle, Instagram, MessageCircle, Users, Video, Share2 } from "lucide-react"
import type { Product } from "./simulator-interface"

export type Strategy = {
  id: string
  name: string
  description: string
  icon: typeof Instagram
  difficulty: "easy" | "medium" | "hard"
  estimatedReach: number
  estimatedConversion: number
  timeInvestment: string
}

const STRATEGIES: Strategy[] = [
  {
    id: "instagram-stories",
    name: "Stories no Instagram",
    description: "Poste stories diários mostrando valor e direcionando para o produto",
    icon: Instagram,
    difficulty: "easy",
    estimatedReach: 500,
    estimatedConversion: 0.02,
    timeInvestment: "30min/dia",
  },
  {
    id: "reels-virais",
    name: "Reels Virais",
    description: "Crie reels educativos que podem viralizar e atrair audiência qualificada",
    icon: Video,
    difficulty: "medium",
    estimatedReach: 2000,
    estimatedConversion: 0.015,
    timeInvestment: "2h/dia",
  },
  {
    id: "grupos-whatsapp",
    name: "Grupos de WhatsApp",
    description: "Entre em grupos do nicho e compartilhe conteúdo de valor com CTA",
    icon: MessageCircle,
    difficulty: "easy",
    estimatedReach: 300,
    estimatedConversion: 0.03,
    timeInvestment: "1h/dia",
  },
  {
    id: "comunidades-telegram",
    name: "Comunidades no Telegram",
    description: "Participe de comunidades relevantes e construa autoridade",
    icon: Users,
    difficulty: "medium",
    estimatedReach: 800,
    estimatedConversion: 0.025,
    timeInvestment: "1.5h/dia",
  },
  {
    id: "dm-direto",
    name: "DM Direto (Outreach)",
    description: "Envie mensagens personalizadas para potenciais clientes",
    icon: Share2,
    difficulty: "hard",
    estimatedReach: 100,
    estimatedConversion: 0.05,
    timeInvestment: "3h/dia",
  },
  {
    id: "conteudo-educativo",
    name: "Posts Educativos",
    description: "Publique carrosséis e posts de valor que atraem o público ideal",
    icon: Sparkles,
    difficulty: "medium",
    estimatedReach: 1000,
    estimatedConversion: 0.018,
    timeInvestment: "1h/dia",
  },
]

type StrategySelectionProps = {
  product: Product
  niche: string
  onComplete: (strategies: Strategy[]) => void
}

export function StrategySelection({ product, niche, onComplete }: StrategySelectionProps) {
  const [selectedStrategies, setSelectedStrategies] = useState<Strategy[]>([])

  const toggleStrategy = (strategy: Strategy) => {
    if (selectedStrategies.find((s) => s.id === strategy.id)) {
      setSelectedStrategies(selectedStrategies.filter((s) => s.id !== strategy.id))
    } else if (selectedStrategies.length < 5) {
      setSelectedStrategies([...selectedStrategies, strategy])
    }
  }

  const isSelected = (strategyId: string) => selectedStrategies.some((s) => s.id === strategyId)

  const canContinue = selectedStrategies.length === 5

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-background/98 backdrop-blur-xl">
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-success/10 blur-[120px]" />

      <div className="relative z-10 shrink-0 border-b border-border/50 bg-background/80 px-4 py-2 backdrop-blur-sm sm:py-2.5">
        <div className="mx-auto max-w-4xl">
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold sm:text-sm">Estratégias de Divulgação</h3>
              <Badge
                variant={selectedStrategies.length === 5 ? "default" : "secondary"}
                className={`text-[10px] font-bold sm:text-xs ${
                  selectedStrategies.length === 5
                    ? "bg-success text-success-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {selectedStrategies.length}/5
              </Badge>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground sm:text-xs">80% completo</span>
          </div>
          <Progress value={80} className="h-1" />
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto px-3 py-3 sm:px-4 sm:py-4">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-3 text-center sm:mb-4">
            <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-2.5 py-1 sm:mb-2 sm:px-3 sm:py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-success sm:h-4 sm:w-4" />
              <span className="text-[10px] font-bold text-success sm:text-xs">Estratégias Orgânicas</span>
            </div>
            <h2 className="mb-1.5 text-balance text-lg font-bold leading-tight sm:mb-2 sm:text-xl">
              Escolha 5 Estratégias de Divulgação
            </h2>
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Selecione as estratégias para divulgar <strong>{product.name}</strong> no nicho de{" "}
              <strong>{niche}</strong>
            </p>
          </div>

          <div className="space-y-2.5 sm:grid sm:grid-cols-2 sm:gap-2.5 sm:space-y-0">
            {STRATEGIES.map((strategy) => {
              const selected = isSelected(strategy.id)
              const Icon = strategy.icon

              return (
                <Card
                  key={strategy.id}
                  onClick={() => toggleStrategy(strategy)}
                  className={`cursor-pointer border-2 p-2.5 transition-all active:scale-[0.98] hover:scale-[1.02] sm:p-3 ${
                    selected
                      ? "border-success bg-success/10 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                      : "border-border/50 bg-card/50 hover:border-success/50"
                  }`}
                >
                  <div className="mb-1.5 flex items-start justify-between sm:mb-2">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`rounded-lg p-1.5 sm:rounded-xl sm:p-2 ${selected ? "bg-success/20" : "bg-muted"}`}
                      >
                        <Icon
                          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${selected ? "text-success" : "text-muted-foreground"}`}
                        />
                      </div>
                      {selected && <CheckCircle className="h-4 w-4 text-success sm:h-5 sm:w-5" />}
                    </div>
                    <Badge
                      variant={
                        strategy.difficulty === "easy"
                          ? "default"
                          : strategy.difficulty === "medium"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-[9px] sm:text-[10px]"
                    >
                      {strategy.difficulty === "easy"
                        ? "Fácil"
                        : strategy.difficulty === "medium"
                          ? "Médio"
                          : "Difícil"}
                    </Badge>
                  </div>

                  <h3 className="mb-1 text-xs font-bold leading-tight sm:text-sm">{strategy.name}</h3>
                  <p className="mb-1.5 text-[10px] leading-relaxed text-muted-foreground sm:mb-2 sm:text-xs">
                    {strategy.description}
                  </p>

                  <div className="space-y-1 rounded-lg bg-background/50 p-2 text-[10px] sm:space-y-1.5 sm:rounded-xl sm:p-2.5 sm:text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Alcance/dia</span>
                      <span className="font-semibold">{strategy.estimatedReach}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Conversão</span>
                      <span className="font-semibold">{(strategy.estimatedConversion * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tempo necessário</span>
                      <span className="font-semibold">{strategy.timeInvestment}</span>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="h-16" />
        </div>
      </div>

      {canContinue && (
        <div className="relative z-10 shrink-0 border-t border-border/50 bg-background/95 px-4 py-2.5 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl">
            <Button
              onClick={() => onComplete(selectedStrategies)}
              size="lg"
              className="h-10 w-full gap-2 rounded-xl bg-success text-xs font-bold hover:bg-success/90 sm:h-11 sm:text-sm"
            >
              Começar a Divulgar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
