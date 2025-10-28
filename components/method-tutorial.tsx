"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Rocket,
  Target,
  TrendingUp,
  Zap,
  Award,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Users,
  Cpu,
  Activity,
} from "lucide-react"

type TutorialStep = {
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  tips: string[]
  highlight: string
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: "O Mercado Digital Está Explodindo",
    subtitle: "E você pode começar HOJE, sem investir nada",
    description:
      "Enquanto você lê isso, milhares de pessoas comuns estão faturando 5 dígitos por mês vendendo produtos digitais. O segredo? Elas não gastam 1 real com anúncios. Usam apenas redes sociais, estratégias orgânicas e um método comprovado.",
    icon: <Award className="h-12 w-12 text-primary" />,
    tips: [
      "Você só precisa de um celular e internet",
      "Suas redes sociais são sua vitrine gratuita",
      "Primeiras vendas podem acontecer em 7-14 dias",
      "Não precisa aparecer ou mostrar o rosto",
    ],
    highlight: "R$ 0 de investimento inicial necessário",
  },
  {
    title: "Etapa 1: Escolha Seu Nicho Estratégico",
    subtitle: "Nichos quentes = mais demanda = mais vendas",
    description:
      "Existem nichos com MILHÕES de pessoas procurando soluções todos os dias: emagrecimento, ganhar dinheiro online, relacionamentos, produtividade. Quanto maior a dor, maior a disposição para comprar. Você não precisa ser expert, só precisa saber mais que seu público.",
    icon: <Target className="h-12 w-12 text-primary" />,
    tips: [
      "Nichos de dor vendem mais que nichos de prazer",
      "Alta demanda = mais tráfego orgânico gratuito",
      "Você aprende enquanto vende, não precisa dominar tudo",
      "Escolha algo que você tenha interesse em falar",
    ],
    highlight: "Nichos populares têm 10x mais compradores ativos",
  },
  {
    title: "Etapa 2: Produto Afiliado ou Próprio?",
    subtitle: "Comece rápido ou construa seu império",
    description:
      "Produtos de AFILIADO são perfeitos para começar HOJE: você vende, ganha 30-50% de comissão e não precisa criar nada. Produtos PRÓPRIOS dão 100% do lucro, mas exigem criação. A maioria começa com afiliação, valida o mercado e depois cria o próprio produto.",
    icon: <Rocket className="h-12 w-12 text-primary" />,
    tips: [
      "Afiliado: comece em minutos, sem criar nada",
      "Próprio: 100% do lucro fica com você",
      "Teste com afiliação, depois crie seu produto",
      "Plataformas como Hotmart têm milhares de produtos",
    ],
    highlight: "Afiliados podem faturar R$ 10k+ no primeiro mês",
  },
  {
    title: "Etapa 3: Preço Estratégico Para Vender Mais",
    subtitle: "Preço baixo = menos objeções = mais vendas",
    description:
      "Produtos de R$ 27 a R$ 97 são os MAIS FÁCEIS de vender organicamente. Por quê? Decisão rápida, baixo risco percebido, compra por impulso. Você prefere vender 1 produto de R$ 1.000 ou 100 produtos de R$ 47? Volume é a chave para lucrar rápido no orgânico.",
    icon: <DollarSign className="h-12 w-12 text-primary" />,
    tips: [
      "R$ 27-47: ideal para iniciantes, alta conversão",
      "Preço baixo elimina objeções e acelera decisão",
      "100 vendas de R$ 47 = R$ 4.700 no bolso",
      "Depois você pode criar produtos mais caros",
    ],
    highlight: "Produtos até R$ 97 convertem 3x mais no orgânico",
  },
  {
    title: "Etapa 4: Estratégias Orgânicas Que Funcionam",
    subtitle: "Conteúdo + Relacionamento = Vendas Diárias",
    description:
      "Stories educativos, reels virais, grupos engajados, DM estratégico, lives de valor... Existem DEZENAS de formas gratuitas de atrair clientes. O segredo não é fazer tudo, é escolher 5 estratégias e executar com consistência. Conteúdo atrai, relacionamento converte.",
    icon: <TrendingUp className="h-12 w-12 text-primary" />,
    tips: [
      "Conteúdo de valor atrai seguidores qualificados",
      "Relacionamento genuíno gera confiança e vendas",
      "Consistência vence perfeição: poste todo dia",
      "Teste 5 estratégias e foque nas que funcionam",
    ],
    highlight: "1 hora/dia de trabalho orgânico pode gerar R$ 300-500/dia",
  },
]

type MethodTutorialProps = {
  onComplete: () => void
}

export function MethodTutorial({ onComplete }: MethodTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const step = TUTORIAL_STEPS[currentStep]
  const progress = ((currentStep + 1) / TUTORIAL_STEPS.length) * 100

  return (
    <div className="fixed inset-0 z-50 flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-background px-4 py-4 sm:px-6 sm:py-6 md:px-4 md:py-4">
      {/* Tech grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Animated glowing orbs */}
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px] animate-pulse md:h-[300px] md:w-[300px]" />

      <div
        className="relative flex w-full max-w-2xl flex-col gap-3 md:max-w-xl md:gap-2"
        style={{ height: "calc(100dvh - 2rem)", maxHeight: "calc(100dvh - 2rem)" }}
      >
        {/* Top badge - outside card */}
        <div className="shrink-0 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-xl transition-all hover:scale-105 hover:border-white/30 hover:shadow-lg hover:shadow-white/10 sm:px-5 sm:py-2 md:px-4 md:py-1.5">
            <Cpu className="h-4 w-4 shrink-0 animate-pulse text-white sm:h-5 sm:w-5 md:h-4 md:w-4" />
            <span className="whitespace-nowrap text-sm font-bold text-white sm:text-base md:text-sm">
              Método <span className="font-extrabold">100% DIGITAL</span> •{" "}
              <span className="font-extrabold text-white/80">TECH POWERED</span>
            </span>
            <Activity className="h-4 w-4 shrink-0 animate-pulse text-white/80 sm:h-5 sm:w-5 md:h-4 md:w-4" />
          </div>
        </div>

        {/* Progress section - outside card */}
        <div className="shrink-0 space-y-1.5 sm:space-y-2 md:space-y-1.5">
          <div className="flex items-center justify-between text-sm font-semibold sm:text-base md:text-sm">
            <span className="text-white/60">
              Etapa {currentStep + 1} de {TUTORIAL_STEPS.length}
            </span>
            <span className="text-white">{Math.round(progress)}% completo</span>
          </div>
          <Progress value={progress} className="h-2 transition-all duration-500 sm:h-2.5 md:h-2" />
        </div>

        {/* Icon - outside card */}
        <div className="shrink-0 flex justify-center">
          <div className="float-animation rounded-xl bg-white/5 p-3 shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all hover:scale-110 sm:p-4 md:p-3 border border-white/10 backdrop-blur-sm">
            <div className="[&>svg]:h-10 [&>svg]:w-10 sm:[&>svg]:h-12 sm:[&>svg]:w-12 md:[&>svg]:h-10 md:[&>svg]:w-10 [&>svg]:text-white">
              {step.icon}
            </div>
          </div>
        </div>

        {/* Content card - only contains text content */}
        <Card className="flex min-h-0 flex-1 flex-col overflow-hidden border border-white/10 bg-white/5 shadow-[0_0_80px_rgba(255,255,255,0.05)] backdrop-blur-2xl transition-all duration-300">
          <div className="flex min-h-0 flex-1 flex-col p-3 sm:p-4 md:p-3">
            {/* Scrollable content area */}
            <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
              <div className="space-y-2 sm:space-y-3 md:space-y-2">
                <div className="text-center">
                  <h2 className="mb-1.5 font-heading text-balance text-lg font-bold leading-tight text-white sm:mb-2 sm:text-xl md:mb-1.5 md:text-lg">
                    {step.title}
                  </h2>
                  <p className="mb-2 text-balance text-sm font-semibold text-white/80 sm:mb-3 sm:text-base md:mb-2 md:text-sm">
                    {step.subtitle}
                  </p>
                  <p className="mx-auto max-w-xl text-pretty text-xs leading-relaxed text-white/60 sm:text-sm md:text-xs">
                    {step.description}
                  </p>
                </div>

                {/* Highlight box */}
                <div className="relative overflow-hidden rounded-lg border border-white/20 bg-white/10 p-2.5 shadow-lg sm:p-3 md:p-2.5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 sm:gap-2.5 md:gap-2">
                    <Zap className="h-4 w-4 shrink-0 animate-pulse text-white sm:h-5 sm:w-5 md:h-4 md:w-4" />
                    <p className="text-balance text-xs font-bold leading-tight text-white sm:text-sm md:text-xs">
                      {step.highlight}
                    </p>
                  </div>
                </div>

                {/* Tips section */}
                <Card className="border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 sm:p-3 md:p-2.5">
                  <h3 className="mb-2 flex items-center gap-1.5 text-center font-heading text-xs font-bold text-white sm:mb-2.5 sm:gap-2 sm:text-sm md:mb-2 md:text-xs">
                    <Users className="h-4 w-4 text-white sm:h-5 sm:w-5 md:h-4 md:w-4" />O Que Você Precisa Saber:
                  </h3>
                  <ul className="space-y-1.5 sm:space-y-2 md:space-y-1.5">
                    {step.tips.map((tip, index) => (
                      <li
                        key={index}
                        className="group flex items-start gap-1.5 transition-all hover:translate-x-1 sm:gap-2 md:gap-1.5"
                      >
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/10 text-xs font-bold text-white ring-1 ring-white/20 transition-all group-hover:scale-110 group-hover:ring-white/40 sm:h-6 sm:w-6 sm:text-sm md:h-5 md:w-5 md:text-xs">
                          {index + 1}
                        </div>
                        <span className="text-xs leading-relaxed text-white/60 group-hover:text-white/80 sm:text-sm md:text-xs">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="mt-2 flex shrink-0 items-center justify-between gap-2 sm:mt-3 sm:gap-3 md:mt-2 md:gap-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                size="sm"
                className="gap-1.5 border-white/20 bg-white/5 text-xs text-white backdrop-blur-sm transition-all hover:scale-105 hover:border-white/30 hover:bg-white/10 disabled:opacity-50 sm:gap-2 sm:text-sm md:h-9 md:text-xs"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-4 md:w-4" />
                <span className="hidden font-semibold sm:inline">Anterior</span>
              </Button>

              <Button
                onClick={handleNext}
                size="sm"
                className="flex-1 gap-1.5 bg-white px-6 py-2 text-xs text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] sm:flex-none sm:gap-2 sm:px-10 sm:text-sm md:h-9 md:px-8 md:text-xs"
              >
                <span className="font-bold">
                  {currentStep === TUTORIAL_STEPS.length - 1 ? "Começar Simulação" : "Próxima Etapa"}
                </span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-4 md:w-4" />
              </Button>
            </div>

            {/* Final step message */}
            {currentStep === TUTORIAL_STEPS.length - 1 && (
              <div className="mt-2 shrink-0 text-center sm:mt-3 md:mt-2">
                <p className="text-xs leading-relaxed text-white/60 sm:text-sm md:text-xs">
                  Agora você vai simular <strong className="font-bold text-white">30 DIAS de trabalho digital</strong> e
                  descobrir quanto pode faturar!
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
