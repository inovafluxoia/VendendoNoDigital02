"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Gift,
  Sparkles,
  ArrowLeft,
  BookOpen,
  Users,
  MessageCircle,
  Zap,
  Target,
  Award,
  Clock,
  Shield,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CheckoutPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const offer = {
    title: "Método 10k/Mês Completo",
    subtitle: "Tudo que você precisa para começar a faturar online hoje",
    price: 99.9,
    originalPrice: 1198.8,
    installments: 10,
    installmentPrice: 9.9,
    kirvanoLink: "https://pay.kirvano.com/01c2ff02-f4d1-488f-8707-1f8992423b4e",
    features: [
      {
        icon: BookOpen,
        title: "+30 Módulos Completos",
        description: "Todo o conteúdo do zero aos 10k/mês",
      },
      {
        icon: Users,
        title: "Comunidade do Digital",
        description: "Networking e troca de experiências",
      },
      {
        icon: Sparkles,
        title: "Templates e Bônus",
        description: "Tudo que você precisa para começar",
      },
      {
        icon: Clock,
        title: "Acesso Vitalício",
        description: "Sem mensalidades, pague uma vez só",
      },
      {
        icon: MessageCircle,
        title: "Suporte via Comunidade",
        description: "Ajuda de outros membros e mentores",
      },
      {
        icon: Award,
        title: "Certificado de Conclusão",
        description: "Comprove seu conhecimento",
      },
    ],
    bonuses: [
      {
        icon: Zap,
        title: "Mini Treinamento Exclusivo",
        value: "R$ 97,00",
        items: [
          "Experiência completa do simulador interativo",
          "Estratégias validadas passo a passo",
          "Nichos e produtos testados no mercado",
          "Método prático aplicado na prática",
        ],
      },
      {
        icon: BookOpen,
        title: "E-book Completo",
        value: "R$ 147,00",
        items: [
          "Como achar seu público-alvo com IA",
          "Criar copys que vendem",
          "Lógica de criativo que converte",
          "Como entrar na mente do lead",
        ],
      },
      {
        icon: Target,
        title: "50+ Reels Prontos",
        value: "R$ 97,00",
        items: [
          "Reels editados e prontos para postar",
          "Scripts validados que convertem",
          "Legendas que engajam",
          "Hashtags estratégicas incluídas",
        ],
      },
    ],
  }

  const perDayPrice = (offer.installmentPrice / 30).toFixed(2)

  const handleCheckout = () => {
    window.location.href = offer.kirvanoLink
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes("@")) {
      setEmailSubmitted(true)
      // TODO: Send email to backend/API to deliver bonuses
      console.log("[v0] Email collected for bonuses:", email)
    }
  }

  const handleWhatsAppBonus = () => {
    window.open("https://wa.me/5521988284145", "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative min-h-screen px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-5xl">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>

          <div className="mb-8 text-center">
            <Badge className="mb-4 bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-1.5 text-sm font-bold text-white shadow-lg">
              OFERTA EXCLUSIVA
            </Badge>
            <h1 className="mb-3 font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {offer.title}
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">{offer.subtitle}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-full bg-emerald-500/20 p-2">
                    <Gift className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold">Bônus Desbloqueados</h2>
                    <p className="text-sm text-muted-foreground">Receba GRÁTIS no WhatsApp agora</p>
                  </div>
                </div>

                {!emailSubmitted ? (
                  <form
                    onSubmit={handleEmailSubmit}
                    className="mb-6 rounded-lg border-2 border-emerald-500/30 bg-background/80 p-4"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-emerald-500" />
                      <h3 className="font-semibold">Receba seus bônus GRÁTIS no WhatsApp</h3>
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Clique no botão abaixo para receber todos os bônus desbloqueados diretamente no seu WhatsApp
                    </p>
                    <Button
                      onClick={handleWhatsAppBonus}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Receber Bônus no WhatsApp
                    </Button>
                  </form>
                ) : (
                  <div className="mb-6 rounded-lg border-2 border-emerald-500/30 bg-emerald-500/10 p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <div>
                        <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                          Bônus enviados com sucesso!
                        </p>
                        <p className="text-sm text-muted-foreground">Verifique sua caixa de entrada no WhatsApp</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {offer.bonuses.map((bonus, index) => {
                    const BonusIcon = bonus.icon
                    return (
                      <div key={index} className="rounded-lg border border-emerald-500/20 bg-background/60 p-4">
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-emerald-500/20 p-2">
                              <BonusIcon className="h-5 w-5 text-emerald-500" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{bonus.title}</h3>
                              <p className="text-xs text-muted-foreground">Valor: {bonus.value}</p>
                            </div>
                          </div>
                          <Badge className="bg-emerald-500 text-white">GRÁTIS</Badge>
                        </div>
                        <ul className="space-y-2">
                          {bonus.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 rounded-lg border-2 border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    Valor Total dos Bônus: R${" "}
                    {offer.bonuses
                      .reduce((acc, b) => acc + Number.parseFloat(b.value.replace("R$ ", "").replace(",", ".")), 0)
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>
                </div>
              </Card>

              <Card className="border-2 p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-full bg-emerald-500/20 p-2">
                    <Sparkles className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold">O que está incluído no {offer.title}</h2>
                    <p className="text-sm text-muted-foreground">Tudo que você precisa para começar a faturar</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {offer.features.map((feature, index) => {
                    const FeatureIcon = feature.icon
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/30 p-4 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5"
                      >
                        <div className="rounded-lg bg-emerald-500/20 p-2">
                          <FeatureIcon className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-1 font-semibold">{feature.title}</h3>
                          <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>

              <Card className="border-2 border-emerald-500/30 bg-emerald-500/5 p-6">
                <div className="text-center">
                  <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                    <Shield className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-bold">Garantia Incondicional de 7 Dias</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Se você não gostar do conteúdo ou achar que não é para você, devolvemos{" "}
                    <span className="font-bold text-foreground">100% do seu dinheiro</span>. Sem perguntas, sem
                    burocracia, sem complicação.
                  </p>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-8 border-4 border-emerald-500/40 bg-gradient-to-br from-card to-emerald-500/5 p-6 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                <div className="mb-6 text-center">
                  <p className="mb-2 text-sm text-muted-foreground line-through">
                    De: R$ {offer.originalPrice.toFixed(2).replace(".", ",")}
                  </p>
                  <p className="mb-1 text-lg font-bold">POR APENAS {offer.installments}X DE</p>
                  <p className="mb-2 text-5xl font-black text-emerald-500">
                    R$ {offer.installmentPrice.toFixed(2).replace(".", ",")}
                  </p>
                  <p className="mb-3 text-sm text-muted-foreground">
                    ou R$ {offer.price.toFixed(2).replace(".", ",")} à vista
                  </p>
                  <div className="rounded-lg border-2 border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      São apenas R$ {perDayPrice.replace(".", ",")} por dia
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Menos que um café por dia para transformar sua vida
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  size="lg"
                  className="mb-4 h-14 w-full bg-gradient-to-r from-emerald-500 to-emerald-600 font-heading text-base font-bold text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]"
                >
                  GARANTIR MINHA VAGA AGORA
                </Button>

                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Acesso imediato após pagamento</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Pagamento 100% seguro e criptografado</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Garantia incondicional de 7 dias</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Suporte via WhatsApp e email</span>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-muted/50 p-3">
                  <p className="text-center text-xs text-muted-foreground">🔒 Seus dados estão protegidos e seguros</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
