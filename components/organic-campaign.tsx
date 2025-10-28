"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  MessageCircle,
  Sparkles,
  Trophy,
  Gift,
  Zap,
  ArrowRight,
  BarChart3,
  ArrowLeft,
} from "lucide-react"
import type { Strategy } from "./strategy-selection"
import type { Product } from "./simulator-interface"
import type { Niche } from "./niche-selection"
import type { PriceRange } from "./price-selection"

type StrategyPerformance = {
  strategy: Strategy
  reach: number
  engagement: number
  leads: number
  sales: number
  revenue: number
}

type OrganicCampaignProps = {
  product: Product
  strategies: Strategy[]
  niche: Niche
  priceRange: PriceRange
  onComplete: (totalSales: number, totalRevenue: number, performances: StrategyPerformance[]) => void
}

export function OrganicCampaign({ product, strategies, niche, priceRange, onComplete }: OrganicCampaignProps) {
  const [currentDay, setCurrentDay] = useState(0)
  const [performances, setPerformances] = useState<StrategyPerformance[]>(
    strategies.map((strategy) => ({
      strategy,
      reach: 0,
      engagement: 0,
      leads: 0,
      sales: 0,
      revenue: 0,
    })),
  )
  const [simulationComplete, setSimulationComplete] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showDetailedResults, setShowDetailedResults] = useState(false)

  const TOTAL_DAYS = 30
  const SIMULATION_SPEED = 600

  const getDemandMultiplier = () => {
    if (niche.demand === "Muito Alta") return 1.3
    if (niche.demand === "Alta") return 1.15
    return 1.0
  }

  const getDifficultyMultiplier = () => {
    if (niche.difficulty === "easy") return 1.25
    if (niche.difficulty === "medium") return 1.1
    return 0.95
  }

  const getProductTypeMultiplier = () => {
    return product.type === "own" ? 1.15 : 1.0
  }

  const demandMultiplier = getDemandMultiplier()
  const difficultyMultiplier = getDifficultyMultiplier()
  const productTypeMultiplier = getProductTypeMultiplier()

  const baseMultiplier = demandMultiplier * difficultyMultiplier * productTypeMultiplier

  const MIN_REVENUE = 5000
  const MAX_REVENUE = 15000
  const targetRevenue = MIN_REVENUE + (MAX_REVENUE - MIN_REVENUE) * ((baseMultiplier - 0.95) / (1.87 - 0.95))

  const targetSales = Math.ceil(targetRevenue / product.price)
  const targetSalesPerDay = targetSales / TOTAL_DAYS
  const targetSalesPerStrategy = targetSalesPerDay / strategies.length

  useEffect(() => {
    if (currentDay >= TOTAL_DAYS) {
      setSimulationComplete(true)
      setTimeout(() => setShowCelebration(true), 1000)
      return
    }

    const timer = setTimeout(() => {
      setPerformances((prev) =>
        prev.map((perf) => {
          const baseReach = perf.strategy.estimatedReach * baseMultiplier
          const dailyReach = Math.floor(baseReach * (Math.random() * 0.3 + 0.85))

          const engagementRate = 0.12 * baseMultiplier
          const dailyEngagement = Math.floor(dailyReach * engagementRate * (Math.random() * 0.3 + 0.85))

          const leadRate = 0.25 * baseMultiplier
          const dailyLeads = Math.floor(dailyEngagement * leadRate * (Math.random() * 0.3 + 0.85))

          const strategyConversionRate = perf.strategy.estimatedConversion * baseMultiplier
          const dailySales = Math.max(0, Math.floor(dailyLeads * strategyConversionRate * (Math.random() * 0.4 + 0.8)))

          const dailyRevenue = dailySales * product.price

          return {
            ...perf,
            reach: perf.reach + dailyReach,
            engagement: perf.engagement + dailyEngagement,
            leads: perf.leads + dailyLeads,
            sales: perf.sales + dailySales,
            revenue: perf.revenue + dailyRevenue,
          }
        }),
      )
      setCurrentDay((prev) => prev + 1)
    }, SIMULATION_SPEED)

    return () => clearTimeout(timer)
  }, [
    currentDay,
    product,
    strategies,
    niche,
    priceRange,
    baseMultiplier,
    targetSalesPerStrategy,
    performances,
    onComplete,
  ])

  useEffect(() => {
    if (showCelebration && !showResults) {
      const timer = setTimeout(() => {
        setShowResults(true)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [showCelebration, showResults])

  const totalReach = performances.reduce((sum, p) => sum + p.reach, 0)
  const totalEngagement = performances.reduce((sum, p) => sum + p.engagement, 0)
  const totalLeads = performances.reduce((sum, p) => sum + p.leads, 0)
  const totalSales = performances.reduce((sum, p) => sum + p.sales, 0)
  const totalRevenue = performances.reduce((sum, p) => sum + p.revenue, 0)
  const progress = (currentDay / TOTAL_DAYS) * 100

  const bestStrategy = performances.reduce(
    (best, current) => (current.sales > best.sales ? current : best),
    performances[0],
  )

  const handleViewOffer = () => {
    onComplete(totalSales, totalRevenue, performances)
  }

  const toggleDetailedResults = () => {
    setShowDetailedResults(!showDetailedResults)
  }

  if (showCelebration) {
    if (showDetailedResults) {
      return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background/98 backdrop-blur-xl px-2 py-3 sm:px-4 sm:py-6">
          <div className="mx-auto w-full max-w-4xl">
            <div className="mb-3 flex items-center justify-between sm:mb-4">
              <Button
                onClick={toggleDetailedResults}
                variant="outline"
                size="sm"
                className="gap-1 text-[10px] sm:gap-2 sm:text-sm bg-transparent"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                Voltar
              </Button>
              <div className="text-[10px] font-bold text-success sm:text-sm">Resultados da Simulação</div>
            </div>

            <div className="mb-3 rounded-xl border-2 border-success/30 bg-success/10 p-2 text-center sm:mb-4 sm:p-4">
              <div className="mb-1 text-[9px] font-medium text-muted-foreground sm:text-xs">
                Seu faturamento em 30 dias:
              </div>
              <div className="text-2xl font-black text-success sm:text-4xl">
                R$ {totalRevenue.toLocaleString("pt-BR")}
              </div>
            </div>

            <div className="mb-3 grid grid-cols-2 gap-1.5 sm:mb-4 sm:grid-cols-4 sm:gap-3">
              <Card className="border border-success/10 bg-card/40 p-2 backdrop-blur-xl sm:p-3">
                <div className="mb-1 flex items-center gap-1 text-[9px] text-muted-foreground sm:gap-2 sm:text-xs">
                  <Eye className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
                  <span>Alcance Total</span>
                </div>
                <div className="text-sm font-bold sm:text-xl">{totalReach.toLocaleString("pt-BR")}</div>
              </Card>

              <Card className="border border-success/10 bg-card/40 p-2 backdrop-blur-xl sm:p-3">
                <div className="mb-1 flex items-center gap-1 text-[9px] text-muted-foreground sm:gap-2 sm:text-xs">
                  <MessageCircle className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
                  <span>Engajamento</span>
                </div>
                <div className="text-sm font-bold sm:text-xl">{totalEngagement.toLocaleString("pt-BR")}</div>
              </Card>

              <Card className="border border-success/10 bg-card/40 p-2 backdrop-blur-xl sm:p-3">
                <div className="mb-1 flex items-center gap-1 text-[9px] text-muted-foreground sm:gap-2 sm:text-xs">
                  <Users className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
                  <span>Leads Gerados</span>
                </div>
                <div className="text-sm font-bold sm:text-xl">{totalLeads.toLocaleString("pt-BR")}</div>
              </Card>

              <Card className="border border-success/10 bg-card/40 p-2 backdrop-blur-xl sm:p-3">
                <div className="mb-1 flex items-center gap-1 text-[9px] text-muted-foreground sm:gap-2 sm:text-xs">
                  <ShoppingCart className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
                  <span>Total Vendas</span>
                </div>
                <div className="text-sm font-bold text-success sm:text-xl">{totalSales}</div>
              </Card>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-[10px] font-bold sm:text-sm">Performance por Estratégia</h3>
              {performances.map((perf) => {
                const convRate = perf.leads > 0 ? ((perf.sales / perf.leads) * 100).toFixed(2) : "0.00"
                const Icon = perf.strategy.icon

                return (
                  <Card
                    key={perf.strategy.id}
                    className="border border-success/10 bg-card/40 p-2 backdrop-blur-xl sm:p-3"
                  >
                    <div className="mb-1.5 flex items-center justify-between gap-2 sm:mb-2">
                      <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2">
                        <Icon className="h-3 w-3 shrink-0 text-success sm:h-4 sm:w-4" />
                        <span className="truncate text-[10px] font-semibold sm:text-sm">{perf.strategy.name}</span>
                      </div>
                      <span className="shrink-0 text-[8px] text-muted-foreground sm:text-xs">
                        {perf.strategy.timeInvestment}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-[9px] sm:grid-cols-6 sm:gap-2 sm:text-xs">
                      <div className="min-w-0">
                        <div className="truncate text-muted-foreground">Alcance</div>
                        <div className="truncate font-semibold">{perf.reach.toLocaleString("pt-BR")}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-muted-foreground">Engaj.</div>
                        <div className="truncate font-semibold">{perf.engagement.toLocaleString("pt-BR")}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-muted-foreground">Leads</div>
                        <div className="truncate font-semibold">{perf.leads}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-muted-foreground">Vendas</div>
                        <div className="truncate font-semibold text-success">{perf.sales}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-muted-foreground">Receita</div>
                        <div className="truncate font-semibold text-success">
                          R$ {perf.revenue.toLocaleString("pt-BR")}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-muted-foreground">Conv.</div>
                        <div className="truncate font-semibold">{convRate}%</div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            <div className="mt-3 sm:mt-4">
              <Button
                onClick={handleViewOffer}
                size="lg"
                className="h-10 w-full gap-1 bg-success font-heading text-[11px] font-bold text-success-foreground shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:scale-105 hover:bg-success/90 sm:h-12 sm:gap-2 sm:text-sm"
              >
                <Gift className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                <span>Continuar pra pegar BÔNUS</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/98 backdrop-blur-xl px-2 py-2 sm:px-4">
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-success/20 blur-[100px]" />

        <div className="relative w-full max-w-lg animate-in zoom-in-95 duration-700">
          <Card className="border-2 border-success/40 bg-gradient-to-br from-success/20 via-background to-success/10 p-2 text-center backdrop-blur-sm sm:p-5">
            <div className="mb-1.5 flex justify-center gap-1 sm:mb-3 sm:gap-2">
              <Trophy className="h-4 w-4 animate-bounce text-success sm:h-8 sm:w-8" style={{ animationDelay: "0ms" }} />
              <Sparkles
                className="h-4 w-4 animate-bounce text-success sm:h-8 sm:w-8"
                style={{ animationDelay: "150ms" }}
              />
              <Gift className="h-4 w-4 animate-bounce text-success sm:h-8 sm:w-8" style={{ animationDelay: "300ms" }} />
            </div>

            <h2 className="mb-1.5 text-balance text-sm font-black leading-tight text-success sm:mb-3 sm:text-xl">
              🎉 Parabéns! Você Conquistou Resultados Incríveis!
            </h2>

            <div className="mb-2 rounded-xl border-2 border-success/30 bg-success/10 p-1.5 sm:mb-4 sm:p-3">
              <div className="mb-0.5 text-[9px] font-medium text-muted-foreground sm:mb-1 sm:text-xs">
                Seu faturamento em 30 dias:
              </div>
              <div className="mb-1 text-xl font-black text-success sm:mb-2 sm:text-3xl">
                R$ {totalRevenue.toLocaleString("pt-BR")}
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs sm:gap-2 sm:text-sm">
                <div className="rounded-lg border border-success/20 bg-success/5 p-1 sm:p-2">
                  <div className="text-xs font-bold text-success sm:text-base">{totalSales}</div>
                  <div className="text-[8px] text-muted-foreground sm:text-xs">Vendas</div>
                </div>
                <div className="rounded-lg border border-success/20 bg-success/5 p-1 sm:p-2">
                  <div className="text-xs font-bold text-success sm:text-base">
                    {totalLeads.toLocaleString("pt-BR")}
                  </div>
                  <div className="text-[8px] text-muted-foreground sm:text-xs">Leads</div>
                </div>
                <div className="rounded-lg border border-success/20 bg-success/5 p-1 sm:p-2">
                  <div className="text-xs font-bold text-success sm:text-base">100%</div>
                  <div className="text-[8px] text-muted-foreground sm:text-xs">Orgânico</div>
                </div>
                <div className="rounded-lg border border-success/20 bg-success/5 p-1 sm:p-2">
                  <div className="flex items-center justify-center gap-0.5 sm:gap-1">
                    <Trophy className="h-2 w-2 shrink-0 text-success sm:h-3 sm:w-3" />
                    <div className="truncate text-[9px] font-bold text-success sm:text-xs">
                      {bestStrategy.strategy.name}
                    </div>
                  </div>
                  <div className="text-[8px] text-muted-foreground sm:text-xs">Melhor Estratégia</div>
                </div>
              </div>
            </div>

            <div className="mb-2 space-y-0.5 sm:mb-3 sm:space-y-1.5">
              <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-foreground sm:gap-2 sm:text-sm">
                <Zap className="h-3 w-3 shrink-0 text-success sm:h-4 sm:w-4" />
                <span>E você fez isso SEM INVESTIR NADA!</span>
              </div>
              <p className="text-balance text-[9px] leading-relaxed text-muted-foreground sm:text-xs">
                Imagine o que você pode fazer com o <span className="font-bold text-success">método completo</span> e as{" "}
                <span className="font-bold text-success">estratégias avançadas</span>
              </p>
            </div>

            <div className="mb-2 rounded-lg border border-success/30 bg-success/5 p-1.5 sm:mb-3 sm:p-2.5">
              <div className="mb-0.5 flex items-center justify-center gap-0.5 sm:mb-1 sm:gap-1.5">
                <Gift className="h-3 w-3 shrink-0 text-success sm:h-4 sm:w-4" />
                <span className="text-[10px] font-bold text-success sm:text-xs">BÔNUS EXCLUSIVO DESBLOQUEADO</span>
              </div>
              <p className="text-[9px] leading-relaxed text-muted-foreground sm:text-[11px]">
                Por ter completado a simulação, você ganhou acesso ao{" "}
                <span className="font-bold text-foreground">segundo bônus</span>
              </p>
            </div>

            <Button
              onClick={toggleDetailedResults}
              variant="outline"
              size="sm"
              className="mb-2 h-8 w-full gap-1 border-success/30 text-[10px] font-semibold text-success hover:bg-success/10 sm:h-9 sm:gap-1.5 sm:text-xs bg-transparent"
            >
              <BarChart3 className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
              Ver Resultados Detalhados da Simulação
            </Button>

            <Button
              onClick={handleViewOffer}
              size="lg"
              className="h-10 w-full gap-1 bg-success font-heading text-[11px] font-bold text-success-foreground shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:scale-105 hover:bg-success/90 sm:h-14 sm:gap-2 sm:text-base"
            >
              <Gift className="h-3.5 w-3.5 shrink-0 sm:h-5 sm:w-5" />
              <span className="text-balance">Continuar pra pegar BÔNUS</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 sm:h-5 sm:w-5" />
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto bg-background/95 backdrop-blur-xl">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-success/10 blur-[120px]" />

      <div className="relative min-h-screen overflow-x-hidden px-3 py-4 sm:p-6">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-3 text-center sm:mb-6">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1.5 sm:mb-3 sm:px-4 sm:py-2">
              <TrendingUp className="h-4 w-4 shrink-0 text-success sm:h-5 sm:w-5" />
              <span className="whitespace-nowrap text-xs font-bold text-success sm:text-base">
                {simulationComplete ? "Trabalho Concluído!" : "Trabalho em Andamento"}
              </span>
            </div>
            <h2 className="mb-1 truncate px-2 text-lg font-bold sm:mb-2 sm:text-2xl">{product.name}</h2>
            <p className="truncate text-xs text-muted-foreground sm:text-sm">
              Dia {currentDay} de {TOTAL_DAYS} • {niche.name}
            </p>
          </div>

          <div className="mb-3 sm:mb-6">
            <Progress value={progress} className="h-2 sm:h-3" />
          </div>

          <div className="mb-3 grid grid-cols-2 gap-1.5 sm:mb-6 sm:grid-cols-5 sm:gap-4">
            <Card className="min-w-0 border border-success/10 bg-card/40 p-2 backdrop-blur-xl sm:p-4">
              <div className="mb-1 flex items-center gap-1 text-[10px] text-muted-foreground sm:gap-2 sm:text-sm">
                <Eye className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
                <span className="truncate">Alcance</span>
              </div>
              <div className="truncate text-sm font-bold sm:text-2xl">{totalReach.toLocaleString("pt-BR")}</div>
            </Card>

            <Card className="min-w-0 border border-success/10 bg-card/40 p-2 backdrop-blur-xl sm:p-4">
              <div className="mb-1 flex items-center gap-1 text-[10px] text-muted-foreground sm:gap-2 sm:text-sm">
                <MessageCircle className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
                <span className="truncate">Engajamento</span>
              </div>
              <div className="truncate text-sm font-bold sm:text-2xl">{totalEngagement.toLocaleString("pt-BR")}</div>
            </Card>

            <Card className="min-w-0 border border-success/10 bg-card/40 p-2 backdrop-blur-xl sm:p-4">
              <div className="mb-1 flex items-center gap-1 text-[10px] text-muted-foreground sm:gap-2 sm:text-sm">
                <Users className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
                <span className="truncate">Leads</span>
              </div>
              <div className="truncate text-sm font-bold sm:text-2xl">{totalLeads.toLocaleString("pt-BR")}</div>
            </Card>

            <Card className="min-w-0 border border-success/10 bg-card/40 p-2 backdrop-blur-xl sm:p-4">
              <div className="mb-1 flex items-center gap-1 text-[10px] text-muted-foreground sm:gap-2 sm:text-sm">
                <ShoppingCart className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
                <span className="truncate">Vendas</span>
              </div>
              <div className="truncate text-sm font-bold text-success sm:text-2xl">{totalSales}</div>
            </Card>

            <Card className="min-w-0 border border-success/10 bg-card/40 p-2 backdrop-blur-xl sm:p-4">
              <div className="mb-1 flex items-center gap-1 text-[10px] text-muted-foreground sm:gap-2 sm:text-sm">
                <DollarSign className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
                <span className="truncate">Faturamento</span>
              </div>
              <div className="truncate text-sm font-bold text-success sm:text-2xl">
                R$ {totalRevenue.toLocaleString("pt-BR")}
              </div>
            </Card>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-xs font-bold sm:text-base">Performance por Estratégia</h3>
            {performances.map((perf) => {
              const convRate = perf.leads > 0 ? ((perf.sales / perf.leads) * 100).toFixed(2) : "0.00"
              const Icon = perf.strategy.icon

              return (
                <Card
                  key={perf.strategy.id}
                  className="min-w-0 border border-success/10 bg-card/40 p-2.5 backdrop-blur-xl sm:p-4"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-success sm:h-4 sm:w-4" />
                      <span className="truncate text-xs font-semibold sm:text-base">{perf.strategy.name}</span>
                    </div>
                    <span className="shrink-0 text-[10px] text-muted-foreground sm:text-xs">
                      {perf.strategy.timeInvestment}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-[10px] sm:grid-cols-5 sm:gap-2 sm:text-sm">
                    <div className="min-w-0">
                      <div className="truncate text-muted-foreground">Alcance</div>
                      <div className="truncate font-semibold">{perf.reach.toLocaleString("pt-BR")}</div>
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-muted-foreground">Engaj.</div>
                      <div className="truncate font-semibold">{perf.engagement.toLocaleString("pt-BR")}</div>
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-muted-foreground">Leads</div>
                      <div className="truncate font-semibold">{perf.leads}</div>
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-muted-foreground">Vendas</div>
                      <div className="truncate font-semibold text-success">{perf.sales}</div>
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-muted-foreground">Conv.</div>
                      <div className="truncate font-semibold">{convRate}%</div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {simulationComplete && (
            <div className="mt-3 space-y-3 sm:mt-6 sm:space-y-4">
              <Card className="border-2 border-success/30 bg-gradient-to-br from-success/20 to-success/5 p-4 text-center backdrop-blur-sm sm:p-6">
                <Sparkles className="mx-auto mb-2 h-8 w-8 text-success sm:mb-3 sm:h-10 sm:w-10" />
                <h3 className="mb-2 text-balance text-base font-bold text-success sm:mb-4 sm:text-xl">
                  Parabéns! Você Fez <span className="font-black">R$ {totalRevenue.toLocaleString("pt-BR")}</span>
                </h3>
                <p className="mb-4 text-balance text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  Em <span className="font-bold text-foreground">30 dias</span> de trabalho{" "}
                  <span className="font-bold text-success">100% orgânico</span>, você conquistou{" "}
                  <span className="font-bold text-success">{totalSales} vendas</span> sem investir nada!
                </p>
                <Button
                  onClick={handleViewOffer}
                  size="lg"
                  className="h-11 w-full gap-2 bg-success font-heading text-sm font-bold text-success-foreground shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:scale-105 hover:bg-success/90 sm:h-14 sm:text-lg"
                >
                  <Sparkles className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                  <span className="text-balance">
                    Ver Como <span className="font-black">Multiplicar</span> Esses Resultados
                  </span>
                </Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
