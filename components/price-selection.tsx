"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, CheckCircle2, ArrowRight, DollarSign } from "lucide-react"
import type { Niche } from "./niche-selection"
import type { ProductType } from "./product-type-selection"

export type PriceRange = {
  id: string
  price: number
  name: string
  description: string
  conversionRate: number
  difficulty: "easy" | "medium" | "hard"
  salesVolume: string
}

const PRICE_RANGES: PriceRange[] = [
  {
    id: "low",
    price: 27,
    name: "R$ 27 - Low Ticket",
    description: "Preço baixo, alto volume de vendas, fácil conversão",
    conversionRate: 0.08,
    difficulty: "easy",
    salesVolume: "Alto",
  },
  {
    id: "medium-low",
    price: 47,
    name: "R$ 47 - Ticket Médio Baixo",
    description: "Equilíbrio entre preço e valor percebido",
    conversionRate: 0.06,
    difficulty: "easy",
    salesVolume: "Médio-Alto",
  },
  {
    id: "medium",
    price: 97,
    name: "R$ 97 - Ticket Médio",
    description: "Produto mais robusto, conversão moderada",
    conversionRate: 0.04,
    difficulty: "medium",
    salesVolume: "Médio",
  },
  {
    id: "medium-high",
    price: 147,
    name: "R$ 147 - Ticket Médio Alto",
    description: "Produto premium, requer mais autoridade",
    conversionRate: 0.03,
    difficulty: "medium",
    salesVolume: "Médio-Baixo",
  },
  {
    id: "high",
    price: 297,
    name: "R$ 297 - High Ticket",
    description: "Produto completo, conversão mais difícil mas lucro maior",
    conversionRate: 0.02,
    difficulty: "hard",
    salesVolume: "Baixo",
  },
]

type PriceSelectionProps = {
  niche: Niche
  productType: ProductType
  onComplete: (priceRange: PriceRange) => void
}

export function PriceSelection({ niche, productType, onComplete }: PriceSelectionProps) {
  const [selectedPrice, setSelectedPrice] = useState<PriceRange | null>(null)

  const commission = productType === "affiliate" ? 0.4 : 1.0

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-background/98 backdrop-blur-xl">
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-success/10 blur-[120px]" />

      <div className="relative z-10 shrink-0 border-b border-border/50 bg-background/80 px-4 py-3 backdrop-blur-sm md:py-2">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 flex items-center justify-between md:mb-1">
            <h3 className="text-sm font-bold sm:text-base md:text-sm">Valor do Produto</h3>
            <span className="text-xs font-medium text-muted-foreground sm:text-sm md:text-xs">60% completo</span>
          </div>
          <Progress value={60} className="h-1.5 md:h-1" />
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 md:px-4 md:py-3">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-4 text-center sm:mb-6 md:mb-3">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1.5 sm:mb-3 sm:px-4 sm:py-2 md:mb-1.5 md:px-2.5 md:py-1">
              <span className="text-xs font-medium text-success sm:text-sm md:text-xs">
                {niche.name} • {productType === "affiliate" ? "Afiliado" : "Próprio"}
              </span>
            </div>

            <div className="mb-2 flex items-center justify-center gap-2 sm:mb-3 md:mb-1.5">
              <DollarSign className="h-6 w-6 text-success sm:h-7 sm:w-7 md:h-5 md:w-5" />
              <h2 className="text-balance text-xl font-bold leading-tight sm:text-2xl md:text-lg">
                Escolha o Valor do Produto
              </h2>
            </div>

            <p className="text-sm text-muted-foreground sm:text-base md:text-sm">
              O preço impacta na facilidade de venda e no lucro
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 md:space-y-2">
            {PRICE_RANGES.map((range) => {
              const isSelected = selectedPrice?.id === range.id
              const yourProfit = range.price * commission

              return (
                <button
                  key={range.id}
                  onClick={() => setSelectedPrice(range)}
                  className={`w-full rounded-xl border-2 p-3 text-left transition-all active:scale-[0.98] sm:p-4 md:p-2.5 ${
                    isSelected
                      ? "border-success bg-success/10 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                      : "border-border/50 bg-card/50 hover:border-success/30 hover:bg-card/70"
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4 md:gap-2">
                    <div className="mt-0.5 shrink-0">
                      {isSelected ? (
                        <CheckCircle2 className="h-5 w-5 text-success sm:h-6 sm:w-6 md:h-4 md:w-4" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted sm:h-6 sm:w-6 md:h-4 md:w-4" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:mb-3 md:mb-1.5">
                        <div className="min-w-0 flex-1">
                          <h3 className="mb-1.5 text-sm font-bold leading-tight sm:text-base md:mb-1 md:text-sm">
                            {range.name}
                          </h3>
                          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-xs">
                            {range.description}
                          </p>
                        </div>

                        <div className="shrink-0 rounded-lg bg-success/10 px-3 py-1.5 text-center sm:rounded-xl sm:px-4 sm:py-2 md:px-2.5 md:py-1">
                          <div className="text-[10px] text-muted-foreground sm:text-xs md:text-[10px]">Seu lucro</div>
                          <div className="text-lg font-bold text-success sm:text-xl md:text-base">
                            R$ {yourProfit.toFixed(0)}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 md:gap-1">
                        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium sm:px-3 sm:py-1.5 sm:text-sm md:px-2 md:py-0.5 md:text-xs">
                          <TrendingUp className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5 md:h-2.5 md:w-2.5" />
                          Conv: {(range.conversionRate * 100).toFixed(0)}%
                        </span>
                        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium sm:px-3 sm:py-1.5 sm:text-sm md:px-2 md:py-0.5 md:text-xs">
                          <Users className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5 md:h-2.5 md:w-2.5" />
                          Vol: {range.salesVolume}
                        </span>
                        <span
                          className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium capitalize sm:px-3 sm:py-1.5 sm:text-sm md:px-2 md:py-0.5 md:text-xs ${
                            range.difficulty === "easy"
                              ? "bg-success/20 text-success"
                              : range.difficulty === "medium"
                                ? "bg-warning/20 text-warning"
                                : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {range.difficulty === "easy"
                            ? "✓ Fácil"
                            : range.difficulty === "medium"
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

      {selectedPrice && (
        <div className="relative z-10 shrink-0 border-t border-border/50 bg-background/95 px-4 py-3 backdrop-blur-sm md:py-2">
          <div className="mx-auto max-w-3xl">
            <Button
              onClick={() => onComplete(selectedPrice)}
              size="lg"
              className="h-11 w-full gap-2 rounded-xl bg-success text-sm font-bold text-success-foreground shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:bg-success/90 sm:h-12 sm:text-base md:h-10 md:text-sm"
            >
              Continuar
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
