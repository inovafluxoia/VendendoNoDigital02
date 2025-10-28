"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Zap, CheckCircle2, ArrowRight, Gift, Sparkles } from "lucide-react"

type BonusMiniTrainingProps = {
  onComplete: () => void
}

export function BonusMiniTraining({ onComplete }: BonusMiniTrainingProps) {
  const [claimed, setClaimed] = useState(false)

  const handleClaim = () => {
    setClaimed(true)
    setTimeout(() => {
      onComplete()
    }, 2000)
  }

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-background/98 backdrop-blur-xl px-3 py-6 sm:px-4 sm:py-8">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[80px] animate-pulse sm:h-[300px] sm:w-[300px] sm:blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-lg">
        {/* Celebration badge */}
        <div className="mb-4 text-center sm:mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-500/40 bg-emerald-500/10 px-4 py-2 backdrop-blur-xl animate-bounce sm:px-6 sm:py-3">
            <Gift className="h-5 w-5 text-emerald-400 sm:h-6 sm:w-6" />
            <span className="text-base font-extrabold text-emerald-400 sm:text-lg">PARABÉNS! 🎉</span>
          </div>
        </div>

        <Card className="relative overflow-hidden border-2 border-emerald-500/30 bg-card/80 p-4 shadow-[0_0_40px_rgba(16,185,129,0.25)] backdrop-blur-2xl sm:p-6">
          <div className="shimmer absolute inset-0" />

          <div className="relative space-y-4 sm:space-y-5">
            {/* Title */}
            <div className="text-center">
              <h2 className="mb-2 text-balance text-xl font-bold leading-tight sm:mb-3 sm:text-2xl">
                Você Desbloqueou Seu{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Primeiro Bônus!
                </span>
              </h2>
              <p className="text-sm text-muted-foreground sm:text-base">
                Continue a simulação para desbloquear mais 2 bônus exclusivos
              </p>
            </div>

            <div className="rounded-xl border-2 border-emerald-500/40 bg-emerald-500/5 p-3 backdrop-blur-sm sm:p-4">
              <div className="mb-3 flex items-start gap-3 sm:mb-4 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 sm:h-14 sm:w-14">
                  <Zap className="h-6 w-6 text-emerald-400 sm:h-7 sm:w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold sm:mb-2 sm:text-xl">Mini Treinamento Exclusivo</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    A experiência que você terá agora é 100% real e funcional
                  </p>
                </div>
              </div>

              <div className="space-y-2 rounded-lg border border-emerald-500/20 bg-background/60 p-3 sm:space-y-3 sm:p-4">
                <h4 className="flex items-center gap-2 text-xs font-bold text-emerald-400 sm:text-sm">
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Método VALIDADO que funciona HOJE:
                </h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  <li className="flex items-start gap-2 text-xs sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400 sm:h-4 sm:w-4" />
                    <span className="font-semibold">Experiência 100% verídica e funcional</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400 sm:h-4 sm:w-4" />
                    <span>Método testado e validado por centenas de pessoas</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400 sm:h-4 sm:w-4" />
                    <span>Basta ENTENDER como funciona e APLICAR</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400 sm:h-4 sm:w-4" />
                    <span>Você pode começar HOJE mesmo, do zero</span>
                  </li>
                </ul>
              </div>

              {/* Value badge */}
              <div className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-emerald-500/10 py-2.5 sm:mt-4 sm:py-3">
                <span className="text-xs font-medium text-muted-foreground line-through sm:text-sm">R$ 97,00</span>
                <span className="text-lg font-extrabold text-emerald-400 sm:text-xl">GRÁTIS</span>
              </div>
            </div>

            {!claimed ? (
              <Button
                onClick={handleClaim}
                size="lg"
                className="h-12 w-full gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-sm font-bold text-black shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] sm:h-14 sm:text-base"
              >
                <Gift className="h-4 w-4 sm:h-5 sm:w-5" />
                Resgatar Meu Bônus Agora
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-500 bg-emerald-500/10 py-3 sm:gap-3 sm:py-4">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 sm:h-6 sm:w-6" />
                  <span className="text-base font-bold text-emerald-400 sm:text-lg">Bônus Resgatado!</span>
                </div>
                <p className="text-center text-xs text-muted-foreground sm:text-sm">
                  Enviamos o acesso para seu email. Continue a simulação para desbloquear mais bônus!
                </p>
              </div>
            )}

            <div className="rounded-lg border border-border/50 bg-background/60 p-3 sm:p-4">
              <div className="mb-2 flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold">Progresso dos Bônus</span>
                <span className="text-emerald-400">1 de 3</span>
              </div>
              <div className="flex gap-1.5 sm:gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-emerald-500 sm:h-2" />
                <div className="h-1.5 flex-1 rounded-full bg-muted sm:h-2" />
                <div className="h-1.5 flex-1 rounded-full bg-muted sm:h-2" />
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground sm:text-xs">
                Continue simulando para desbloquear o E-book Completo e 50+ Reels Prontos
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
