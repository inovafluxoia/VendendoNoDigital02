"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, CheckCircle2, ArrowRight, Gift, Sparkles, Brain, Target, Zap } from "lucide-react"

type BonusEbookProps = {
  onComplete: () => void
}

export function BonusEbook({ onComplete }: BonusEbookProps) {
  const [claimed, setClaimed] = useState(false)
  const router = useRouter()

  const handleClaim = () => {
    setClaimed(true)
    setTimeout(() => {
      router.push("/oferta")
    }, 2000)
  }

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-background/98 backdrop-blur-xl px-3 py-6 sm:px-4 sm:py-8">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[80px] animate-pulse sm:h-[300px] sm:w-[300px] sm:blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-lg">
        {/* Celebration badge */}
        <div className="mb-4 text-center sm:mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-blue-500/40 bg-blue-500/10 px-4 py-2 backdrop-blur-xl animate-bounce sm:px-6 sm:py-3">
            <Gift className="h-5 w-5 text-blue-400 sm:h-6 sm:w-6" />
            <span className="text-base font-extrabold text-blue-400 sm:text-lg">SEGUNDO BÔNUS! 🎁</span>
          </div>
        </div>

        <Card className="relative overflow-hidden border-2 border-blue-500/30 bg-card/80 p-4 shadow-[0_0_40px_rgba(59,130,246,0.25)] backdrop-blur-2xl sm:p-6">
          <div className="shimmer absolute inset-0" />

          <div className="relative space-y-4 sm:space-y-5">
            {/* Title */}
            <div className="text-center">
              <h2 className="mb-2 text-balance text-xl font-bold leading-tight sm:mb-3 sm:text-2xl">
                Você Desbloqueou o{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  E-book Completo!
                </span>
              </h2>
              <p className="text-sm text-muted-foreground sm:text-base">
                Continue para desbloquear o último bônus exclusivo
              </p>
            </div>

            <div className="rounded-xl border-2 border-blue-500/40 bg-blue-500/5 p-3 backdrop-blur-sm sm:p-4">
              <div className="mb-3 flex items-start gap-3 sm:mb-4 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 sm:h-14 sm:w-14">
                  <BookOpen className="h-6 w-6 text-blue-400 sm:h-7 sm:w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold sm:mb-2 sm:text-xl">E-book Completo Grátis</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    Aprenda mais a fundo as estratégias do treinamento
                  </p>
                </div>
              </div>

              <div className="space-y-2 rounded-lg border border-blue-500/20 bg-background/60 p-3 sm:space-y-3 sm:p-4">
                <h4 className="flex items-center gap-2 text-xs font-bold text-blue-400 sm:text-sm">
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />O que você vai aprender:
                </h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  <li className="flex items-start gap-2 text-xs sm:text-sm">
                    <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400 sm:h-4 sm:w-4" />
                    <span>
                      <span className="font-semibold">Como achar seu público-alvo com IA</span> e segmentar com precisão
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400 sm:h-4 sm:w-4" />
                    <span>
                      <span className="font-semibold">Criar copys que vendem</span> usando gatilhos mentais poderosos
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm">
                    <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400 sm:h-4 sm:w-4" />
                    <span>
                      <span className="font-semibold">Lógica de criativo que converte</span> e gera vendas no automático
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm">
                    <Brain className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400 sm:h-4 sm:w-4" />
                    <span>
                      <span className="font-semibold">Como entrar na mente do lead</span> para engajar e levar pro funil
                    </span>
                  </li>
                </ul>
              </div>

              {/* Value badge */}
              <div className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-blue-500/10 py-2.5 sm:mt-4 sm:py-3">
                <span className="text-xs font-medium text-muted-foreground line-through sm:text-sm">R$ 147,00</span>
                <span className="text-lg font-extrabold text-blue-400 sm:text-xl">GRÁTIS</span>
              </div>
            </div>

            {!claimed ? (
              <Button
                onClick={handleClaim}
                size="lg"
                className="h-12 w-full gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-sm font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] sm:h-14 sm:text-base"
              >
                <Gift className="h-4 w-4 sm:h-5 sm:w-5" />
                Resgatar E-book Agora
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-blue-500 bg-blue-500/10 py-3 sm:gap-3 sm:py-4">
                  <CheckCircle2 className="h-5 w-5 text-blue-400 sm:h-6 sm:w-6" />
                  <span className="text-base font-bold text-blue-400 sm:text-lg">E-book Resgatado!</span>
                </div>
                <p className="text-center text-xs text-muted-foreground sm:text-sm">
                  Enviamos o e-book para seu email. Preparando sua oferta especial...
                </p>
              </div>
            )}

            <div className="rounded-lg border border-border/50 bg-background/60 p-3 sm:p-4">
              <div className="mb-2 flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold">Progresso dos Bônus</span>
                <span className="text-blue-400">2 de 3</span>
              </div>
              <div className="flex gap-1.5 sm:gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-emerald-500 sm:h-2" />
                <div className="h-1.5 flex-1 rounded-full bg-blue-500 sm:h-2" />
                <div className="h-1.5 flex-1 rounded-full bg-muted sm:h-2" />
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground sm:text-xs">
                Último bônus: 50+ Reels Prontos pra Postar na próxima tela
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
