"use client"

import { Rocket, Award, Target, Sparkles, ArrowRight, TrendingUp, Gift, BookOpen, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CountdownTimer } from "@/components/countdown-timer"

type SimulatorHeroProps = {
  onStartJourney: () => void
}

export function SimulatorHero({ onStartJourney }: SimulatorHeroProps) {
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-background px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,197,94,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.04)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-success/15 blur-[80px] animate-pulse sm:h-[300px] sm:w-[300px] sm:blur-[100px] md:h-[400px] md:w-[400px]" />
      <div className="absolute right-0 top-0 h-[150px] w-[150px] rounded-full bg-success/8 blur-[60px] float-animation sm:h-[200px] sm:w-[200px] sm:blur-[80px]" />
      <div
        className="absolute bottom-0 left-0 h-[150px] w-[150px] rounded-full bg-success/8 blur-[60px] float-animation sm:h-[200px] sm:w-[200px] sm:blur-[80px]"
        style={{ animationDelay: "1.5s" }}
      />
      {/* </CHANGE> */}

      <div className="relative mx-auto w-full max-w-lg px-2 sm:max-w-xl sm:px-3 md:px-6">
        <div className="text-center">
          <div className="mb-2 inline-flex items-center gap-1 rounded-full border-2 border-success/30 bg-gradient-to-r from-success/15 to-success/5 px-2.5 py-1 text-[10px] font-medium text-success backdrop-blur-xl transition-all hover:scale-105 hover:border-success/40 hover:shadow-lg hover:shadow-success/20 sm:mb-3 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs md:gap-2 md:px-4 md:py-2 md:text-sm">
            <Award className="h-3 w-3 animate-pulse sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
            <span className="font-bold">100%</span> Orgânico • <span className="font-bold">Sem Investir</span>
          </div>
          {/* </CHANGE> */}

          <h1 className="mb-2 font-heading text-balance text-xl font-bold leading-[1.15] tracking-tight text-foreground sm:mb-2 sm:text-2xl md:mb-3 md:text-3xl">
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-success via-emerald-500 to-success bg-clip-text font-black text-transparent gradient-shift">
                Vender com IA nunca ficou tão fácil
              </span>
              <span className="absolute inset-x-0 bottom-0 h-1.5 bg-success/30 blur-lg sm:h-2 md:h-2.5" />
            </span>{" "}
            venda apps <span className="font-extrabold text-success">sem investir NADA</span>
          </h1>
          {/* </CHANGE> */}

          <p className="mb-3 text-xs font-medium text-muted-foreground sm:mb-4 sm:text-sm md:mb-5 md:text-base">
            (e não, você <span className="font-bold text-foreground">não precisa saber código</span>)
          </p>
          {/* </CHANGE> */}

          <div className="mx-auto mb-3 max-w-md sm:mb-4 md:mb-5">
            <div className="glow-green-strong relative overflow-hidden rounded-xl border-2 border-success/40 bg-gradient-to-br from-success/10 via-card/50 to-success/5 p-3 backdrop-blur-2xl transition-all hover:border-success/50 sm:p-4 md:rounded-2xl md:p-5">
              <div className="shimmer absolute inset-0" />

              <div className="relative">
                <div className="mb-2 flex flex-col items-center justify-center gap-1.5 sm:mb-3 sm:gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Gift className="h-4 w-4 animate-bounce text-success sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-success sm:text-sm md:text-base">
                      Complete Antes que Expire
                    </span>
                  </div>
                  <CountdownTimer />
                  <p className="text-[10px] font-medium text-muted-foreground sm:text-xs md:text-sm">
                    Bônus disponíveis apenas até <span className="font-bold text-success">amanhã</span>
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                  <div className="flex items-start gap-2 rounded-lg border border-success/20 bg-background/60 p-2 backdrop-blur-sm transition-all hover:border-success/30 hover:bg-background/80 sm:gap-2.5 sm:p-2.5 md:gap-3 md:p-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success/20 sm:h-8 sm:w-8 md:h-9 md:w-9">
                      <Zap className="h-3.5 w-3.5 text-success sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xs font-bold text-foreground sm:text-sm">Mini Treinamento Exclusivo</p>
                      <p className="text-[10px] text-muted-foreground sm:text-xs">
                        Como começar hoje com posts gratuitos e hooks que engajam
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 rounded-lg border border-success/20 bg-background/60 p-2 backdrop-blur-sm transition-all hover:border-success/30 hover:bg-background/80 sm:gap-2.5 sm:p-2.5 md:gap-3 md:p-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success/20 sm:h-8 sm:w-8 md:h-9 md:w-9">
                      <BookOpen className="h-3.5 w-3.5 text-success sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xs font-bold text-foreground sm:text-sm">E-book Completo Grátis</p>
                      <p className="text-[10px] text-muted-foreground sm:text-xs">
                        Guia definitivo para vender no digital organicamente
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 rounded-lg border border-success/20 bg-background/60 p-2 backdrop-blur-sm transition-all hover:border-success/30 hover:bg-background/80 sm:gap-2.5 sm:p-2.5 md:gap-3 md:p-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success/20 sm:h-8 sm:w-8 md:h-9 md:w-9">
                      <Sparkles className="h-3.5 w-3.5 text-success sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xs font-bold text-foreground sm:text-sm">50+ Reels Prontos pra Postar</p>
                      <p className="text-[10px] text-muted-foreground sm:text-xs">
                        Conteúdo viral pronto para começar a vender hoje!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-2 rounded-lg border-2 border-success/30 bg-success/10 px-2.5 py-1.5 backdrop-blur-sm sm:mt-3 sm:px-3 sm:py-2 md:mt-4">
                  <p className="text-[10px] font-bold text-success sm:text-xs md:text-sm">
                    🎁 Tudo isso de graça ao completar a simulação!
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* </CHANGE> */}

          {/* ... existing code ... */}

          <div className="mx-auto mb-3 max-w-md sm:mb-4">
            <div className="glow-green-strong relative overflow-hidden rounded-xl border-2 border-success/40 bg-card/50 p-3 backdrop-blur-2xl transition-all hover:border-success/50 sm:rounded-2xl sm:p-3.5">
              <div className="shimmer absolute inset-0" />
              <div className="absolute right-2 top-2 opacity-5 sm:right-3 sm:top-3">
                <Sparkles className="h-8 w-8 text-success sm:h-10 sm:w-10" />
              </div>

              <div className="relative">
                <div className="mb-1.5 flex items-center justify-center gap-1.5 sm:mb-2 sm:gap-2">
                  <Rocket className="h-3.5 w-3.5 animate-pulse text-success sm:h-4 sm:w-4" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-success sm:text-sm">
                    Experiência <span className="underline decoration-2">100% Real</span>
                  </span>
                </div>

                <div className="mb-1.5 font-heading bg-gradient-to-r from-success via-emerald-500 to-success bg-clip-text text-2xl font-black leading-tight text-transparent gradient-shift sm:mb-2 sm:text-3xl">
                  Vendedor Digital
                </div>

                <div className="mb-2 text-xs font-medium leading-relaxed text-muted-foreground sm:mb-2.5 sm:text-sm">
                  Descubra como fazer suas <span className="font-bold text-foreground">primeiras vendas</span> sem
                  gastar <span className="font-extrabold text-success">1 real</span> e como fazer isso de forma{" "}
                  <span className="font-bold text-foreground">AUTOMÁTICA</span> e{" "}
                  <span className="font-bold text-foreground">PREGUIÇOSA</span>!
                </div>

                <div className="mb-2 rounded-lg border-2 border-success/30 bg-success/10 px-2.5 py-2 backdrop-blur-sm sm:mb-2.5 sm:rounded-xl sm:px-3">
                  <p className="text-xs font-bold leading-relaxed text-success sm:text-sm">
                    Vou te apresentar o modelo de funil que mais tem convertido atualmente: o{" "}
                    <span className="font-extrabold uppercase">GAMIFICADO</span>
                  </p>
                </div>

                <div className="rounded-lg border-2 border-success/20 bg-background/60 px-2.5 py-2 backdrop-blur-sm sm:rounded-xl sm:px-3 sm:py-2">
                  <p className="text-pretty text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    Digo e repito:{" "}
                    <span className="font-extrabold text-success">"Nunca foi tão fácil vender com IA"</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mx-auto mb-3 max-w-lg px-2 text-pretty text-xs leading-relaxed text-muted-foreground sm:mb-4 sm:text-sm">
            Simule <span className="font-bold text-foreground">30 dias</span> de trabalho como vendedor digital e veja{" "}
            <strong className="font-extrabold text-success">quanto você pode faturar organicamente</strong>
          </p>

          <Button
            onClick={onStartJourney}
            size="lg"
            className="group h-12 gap-2 rounded-full bg-gradient-to-r from-success to-emerald-500 px-6 font-heading text-sm font-bold text-success-foreground shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] active:scale-100 sm:h-13 sm:px-8 sm:text-base"
          >
            <span>
              Começar Simulação <span className="font-extrabold">Grátis</span>
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
          </Button>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs sm:mt-4 sm:gap-2.5 sm:text-sm">
            <div className="flex items-center gap-1.5 rounded-full border border-success/20 bg-success/5 px-2.5 py-1.5 backdrop-blur-sm transition-all hover:scale-105 hover:border-success/30 hover:bg-success/10 sm:gap-2 sm:px-3">
              <Rocket className="h-3.5 w-3.5 text-success sm:h-4 sm:w-4" />
              <span>
                <span className="font-bold text-foreground">Sem</span> Investir
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-success/20 bg-success/5 px-2.5 py-1.5 backdrop-blur-sm transition-all hover:scale-105 hover:border-success/30 hover:bg-success/10 sm:gap-2 sm:px-3">
              <Target className="h-3.5 w-3.5 text-success sm:h-4 sm:w-4" />
              <span>
                <span className="font-bold text-success">100%</span> Orgânico
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-success/20 bg-success/5 px-2.5 py-1.5 backdrop-blur-sm transition-all hover:scale-105 hover:border-success/30 hover:bg-success/10 sm:gap-2 sm:px-3">
              <TrendingUp className="h-3.5 w-3.5 text-success sm:h-4 sm:w-4" />
              <span>
                Resultados <span className="font-bold text-foreground">Reais</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* </CHANGE> */}
    </section>
  )
}
