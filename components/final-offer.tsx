"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Rocket,
  TrendingUp,
  CheckCircle,
  Zap,
  Target,
  DollarSign,
  Users,
  BookOpen,
  Video,
  MessageCircle,
  ShoppingCart,
  X,
  Crown,
  Gift,
  Sparkles,
  Star,
  TrendingDown,
} from "lucide-react"
import type { Strategy } from "./strategy-selection"
// import { Checkout } from "./checkout" // Removed import do Checkout component

type StrategyPerformance = {
  strategy: Strategy
  reach: number
  engagement: number
  leads: number
  sales: number
  revenue: number
}

type FinalOfferProps = {
  performances: StrategyPerformance[]
  productPrice: number
  totalSales: number
  totalRevenue: number
  onRestart: () => void
}

type OfferDetails = {
  title: string
  price: number
  originalPrice: number
  features: string[]
  icon: any
  color: string
}

export function FinalOffer({ performances, productPrice, totalSales, totalRevenue, onRestart }: FinalOfferProps) {
  const bestStrategy = performances.reduce((best, current) => (current.sales > best.sales ? current : best))
  const [showPopup, setShowPopup] = useState(false)
  const [offerStage, setOfferStage] = useState<"upsell" | "cross-sell" | "down-sell">("upsell")
  // const [showCheckout, setShowCheckout] = useState(false) // Removed estados showCheckout e selectedOffer
  // const [selectedOffer, setSelectedOffer] = useState<"upsell" | "cross-sell" | "down-sell">("upsell")

  const kirvanoLinks = {
    upsell: "https://pay.kirvano.com/01c2ff02-f4d1-488f-8707-1f8992423b4e", // Plano alto (VIP)
    "cross-sell": "https://pay.kirvano.com/594fde78-0940-4931-98b9-a30bd884bf12", // Plano médio (Completo)
    "down-sell": "https://pay.kirvano.com/56bb0c36-be5a-4d63-bca6-1f7351922633", // Plano básico (Essencial)
  }

  const offerDetailsMap: Record<string, OfferDetails> = {
    upsell: {
      title: "Método 10k/Mês VIP",
      price: 99.9,
      originalPrice: 297.0,
      features: ["+30 Módulos Completos", "Comunidade Exclusiva VIP", "Suporte Prioritário", "Lives Semanais"],
      icon: Crown,
      color: "warning",
    },
    "cross-sell": {
      title: "Método 10k/Mês Completo",
      price: 79.9, // Alterado de 69.9 para 79.9
      originalPrice: 1198.8,
      features: ["+30 Módulos Completos", "Comunidade do Digital", "Templates e Bônus", "Acesso Vitalício"],
      icon: Sparkles,
      color: "success",
    },
    "down-sell": {
      title: "Método 10k/Mês Essencial",
      price: 49.9,
      originalPrice: 497.0,
      features: ["Módulos Essenciais", "Comunidade do Digital", "Acesso Vitalício", "Suporte Básico"],
      icon: Gift,
      color: "blue-500",
    },
  }

  const handleMainCTA = () => {
    setShowPopup(true)
    setOfferStage("upsell")
  }

  const handleDecline = () => {
    if (offerStage === "upsell") {
      setOfferStage("cross-sell")
    } else if (offerStage === "cross-sell") {
      setOfferStage("down-sell")
    } else {
      setShowPopup(false)
    }
  }

  const handleAccept = () => {
    const link = kirvanoLinks[offerStage]
    window.location.href = link
    // setSelectedOffer(offerStage)
    // setShowCheckout(true)
    // setShowPopup(false)
  }

  // const handleBackFromCheckout = () => {
  //   setShowCheckout(false)
  //   setShowPopup(true)
  // }

  // if (showCheckout) {
  //   return <Checkout offerType={selectedOffer} onBack={handleBackFromCheckout} />
  // }

  return (
    <>
      {!showPopup && (
        <div className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto bg-background/95 backdrop-blur-xl">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-success/10 blur-[100px] sm:blur-[120px]" />

          <div className="relative min-h-screen overflow-x-hidden px-4 py-6 sm:px-6 sm:py-10">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 text-center sm:mb-8">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-4 py-2 shadow-lg shadow-success/10 sm:mb-4 sm:px-5 sm:py-2.5">
                  <Rocket className="h-4 w-4 animate-pulse text-success sm:h-5 sm:w-5" />
                  <span className="text-sm font-extrabold text-success sm:text-base">Parabéns!</span>
                </div>
                <h2 className="mb-3 font-heading text-2xl font-bold leading-tight text-balance sm:mb-4 sm:text-4xl">
                  Você Fez Suas <span className="font-black text-success">Primeiras Vendas!</span>
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Em <span className="font-bold text-foreground">30 dias</span> de trabalho{" "}
                  <span className="font-bold text-success">orgânico</span>, você conquistou resultados{" "}
                  <span className="font-bold text-foreground">reais</span>
                </p>
              </div>

              <div className="mb-6 grid gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4">
                <Card className="group border border-success/10 bg-card/40 p-5 text-center backdrop-blur-xl transition-all hover:scale-105 hover:border-success/30 hover:shadow-lg hover:shadow-success/10 sm:p-6">
                  <ShoppingCart className="mx-auto mb-3 h-7 w-7 text-success transition-transform group-hover:scale-110 sm:h-9 sm:w-9" />
                  <div className="mb-1 text-3xl font-bold text-success sm:text-4xl">{totalSales}</div>
                  <div className="text-xs text-muted-foreground sm:text-sm">Vendas Realizadas</div>
                </Card>

                <Card className="group border border-success/10 bg-card/40 p-5 text-center backdrop-blur-xl transition-all hover:scale-105 hover:border-success/30 hover:shadow-lg hover:shadow-success/10 sm:p-6">
                  <DollarSign className="mx-auto mb-3 h-7 w-7 text-success transition-transform group-hover:scale-110 sm:h-9 sm:w-9" />
                  <div className="mb-1 min-w-0 break-words text-3xl font-bold text-success sm:text-4xl">
                    R$ {totalRevenue.toLocaleString("pt-BR")}
                  </div>
                  <div className="text-xs text-muted-foreground sm:text-sm">Faturamento Total</div>
                </Card>

                <Card className="group border border-success/10 bg-card/40 p-5 text-center backdrop-blur-xl transition-all hover:scale-105 hover:border-success/30 hover:shadow-lg hover:shadow-success/10 sm:p-6">
                  <Target className="mx-auto mb-3 h-7 w-7 text-success transition-transform group-hover:scale-110 sm:h-9 sm:w-9" />
                  <div className="mb-1 truncate text-base font-bold text-success sm:text-lg">
                    {bestStrategy.strategy.name}
                  </div>
                  <div className="text-xs text-muted-foreground sm:text-sm">Melhor Estratégia</div>
                </Card>
              </div>

              <Card className="mb-6 border-2 border-warning/20 bg-gradient-to-br from-warning/10 to-warning/5 p-5 backdrop-blur-xl transition-all hover:border-warning/30 hover:shadow-xl hover:shadow-warning/10 sm:mb-8 sm:p-7">
                <div className="mb-4 flex items-center gap-2.5 sm:mb-5">
                  <Zap className="h-6 w-6 animate-pulse text-warning sm:h-7 sm:w-7" />
                  <h3 className="font-heading text-lg font-bold leading-tight sm:text-2xl">
                    Imagine <span className="text-warning">Escalando</span> Isso...
                  </h3>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:mb-5 sm:text-base">
                  Você fez{" "}
                  <span className="font-extrabold text-success">R$ {totalRevenue.toLocaleString("pt-BR")}</span> em{" "}
                  <span className="font-bold text-foreground">30 dias</span>{" "}
                  <span className="font-black text-success uppercase">SEM INVESTIR NADA</span>. Agora imagine se você
                  soubesse:
                </p>
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  <div className="flex items-start gap-2 sm:gap-2.5">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success sm:h-5 sm:w-5" />
                    <span className="min-w-0 text-sm leading-relaxed sm:text-base">
                      Como criar funis que convertem 10x mais
                    </span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-2.5">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success sm:h-5 sm:w-5" />
                    <span className="min-w-0 text-sm leading-relaxed sm:text-base">
                      Estratégias de tráfego pago com ROI de 300%+
                    </span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-2.5">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success sm:h-5 sm:w-5" />
                    <span className="min-w-0 text-sm leading-relaxed sm:text-base">
                      Como automatizar vendas e escalar para 10k/mês
                    </span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-2.5">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success sm:h-5 sm:w-5" />
                    <span className="min-w-0 text-sm leading-relaxed sm:text-base">
                      Técnicas avançadas de copywriting e persuasão
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="mb-6 border-2 border-success/30 bg-gradient-to-br from-success/10 to-emerald-500/5 p-5 backdrop-blur-xl transition-all hover:border-success/40 hover:shadow-xl hover:shadow-success/20 sm:mb-8 sm:p-6">
                <div className="mb-4 text-center">
                  <h3 className="mb-2 font-heading text-xl font-black leading-tight text-success sm:text-2xl">
                    Isso Pode Acontecer com Você!
                  </h3>
                  <p className="text-sm text-muted-foreground sm:text-base">
                    Vendas reais acontecendo <span className="font-bold text-success">agora mesmo</span>
                  </p>
                </div>

                <div className="overflow-hidden rounded-xl border-2 border-success/20 shadow-lg">
                  <img
                    src="/provasocial-kiwify.png"
                    alt="Notificações de vendas aprovadas mostrando valores de R$ 57,00 e R$ 139,90"
                    className="w-full h-auto"
                  />
                </div>

                <div className="mt-4 rounded-lg border border-success/20 bg-success/5 p-3 text-center sm:p-4">
                  <p className="text-sm font-semibold leading-relaxed text-foreground sm:text-base">
                    <span className="font-black text-success">Centenas de pessoas</span> estão faturando todos os dias
                    com o método. <span className="font-bold text-success">Você será o próximo?</span>
                  </p>
                </div>
              </Card>

              <Card className="mb-6 border-2 border-success/30 bg-gradient-to-br from-success/20 to-success/5 p-5 shadow-[0_0_50px_rgba(34,197,94,0.3)] backdrop-blur-xl transition-all hover:shadow-[0_0_70px_rgba(34,197,94,0.4)] sm:mb-8 sm:p-8">
                <div className="mb-5 text-center sm:mb-6">
                  <Badge className="mb-3 animate-pulse bg-success px-4 py-1.5 font-heading text-sm font-extrabold text-success-foreground shadow-lg shadow-success/30 sm:mb-4 sm:text-base">
                    OFERTA ESPECIAL
                  </Badge>
                  <h3 className="mb-2 font-heading text-2xl font-bold leading-tight sm:mb-3 sm:text-3xl">
                    Método <span className="font-black text-success">10k/Mês</span>
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    O curso completo para você fazer seus{" "}
                    <span className="font-extrabold text-success">primeiros R$ 10.000/mês</span> vendendo online
                  </p>
                </div>

                <div className="mb-6 space-y-3 sm:mb-7 sm:space-y-4">
                  <div className="flex items-center gap-3 rounded-lg border border-success/20 bg-background/50 p-3 transition-all hover:border-success/40 hover:bg-background/70 sm:gap-4 sm:p-4">
                    <BookOpen className="h-5 w-5 shrink-0 text-success sm:h-6 sm:w-6" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold leading-tight sm:text-base">+30 Módulos Completos</div>
                      <div className="text-xs text-muted-foreground sm:text-sm">Do zero aos 10k/mês passo a passo</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-success/20 bg-background/50 p-3 transition-all hover:border-success/40 hover:bg-background/70 sm:gap-4 sm:p-4">
                    <Users className="h-5 w-5 shrink-0 text-success sm:h-6 sm:w-6" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold leading-tight sm:text-base">Comunidade do Digital</div>
                      <div className="text-xs text-muted-foreground sm:text-sm">Networking e troca de experiências</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-success/20 bg-background/50 p-3 transition-all hover:border-success/40 hover:bg-background/70 sm:gap-4 sm:p-4">
                    <Sparkles className="h-5 w-5 shrink-0 text-success sm:h-6 sm:w-6" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold leading-tight sm:text-base">Templates Prontos</div>
                      <div className="text-xs text-muted-foreground sm:text-sm">
                        Copys, scripts e funis para usar hoje
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-success/20 bg-background/50 p-3 transition-all hover:border-success/40 hover:bg-background/70 sm:gap-4 sm:p-4">
                    <Gift className="h-5 w-5 shrink-0 text-success sm:h-6 sm:w-6" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold leading-tight sm:text-base">Bônus Exclusivos</div>
                      <div className="text-xs text-muted-foreground sm:text-sm">Ferramentas e recursos extras</div>
                    </div>
                  </div>
                </div>

                <div className="mb-5 rounded-xl border border-success/30 bg-success/10 p-5 text-center shadow-lg shadow-success/10 sm:mb-6 sm:p-6">
                  <div className="mb-1 text-sm text-muted-foreground line-through sm:text-base">De R$ 1.198,80</div>
                  <div className="mb-1 font-heading text-4xl font-black text-success sm:text-5xl">R$ 79,90</div>{" "}
                  {/* Alterado de R$ 69,90 para R$ 79,90 */}
                  <div className="text-sm text-muted-foreground sm:text-base">Pagamento único • Acesso vitalício</div>
                </div>

                <Button
                  onClick={handleMainCTA}
                  size="lg"
                  className="mb-4 h-14 w-full gap-2 bg-success font-heading text-base font-bold text-success-foreground shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all hover:scale-[1.02] hover:bg-success/90 hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] sm:h-16 sm:text-lg"
                >
                  <Rocket className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span>
                    Quero Fazer <span className="font-black">10k/Mês</span>
                  </span>
                </Button>

                <p className="text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  ✅ Garantia de <span className="font-bold text-foreground">7 dias</span> • ✅ Acesso{" "}
                  <span className="font-bold text-success">vitalício</span> • ✅ Certificado de conclusão
                </p>
              </Card>

              <div className="text-center">
                <Button
                  onClick={onRestart}
                  variant="outline"
                  size="lg"
                  className="h-11 gap-2 bg-transparent text-sm transition-all hover:scale-105 sm:h-12 sm:text-base"
                >
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  Testar Novamente
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-md max-h-[95vh] overflow-y-auto pt-6 animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
              {offerStage === "upsell" && (
                <Badge className="animate-bounce bg-gradient-to-r from-warning to-orange-500 px-2.5 py-0.5 font-heading text-[10px] font-extrabold text-white shadow-xl shadow-warning/50">
                  <Star className="mr-1 h-2.5 w-2.5 animate-pulse" />
                  UPGRADE VIP
                </Badge>
              )}
              {offerStage === "cross-sell" && (
                <Badge className="animate-bounce bg-gradient-to-r from-success to-emerald-500 px-2.5 py-0.5 font-heading text-[10px] font-extrabold text-white shadow-xl shadow-success/50">
                  <CheckCircle className="mr-1 h-2.5 w-2.5 animate-pulse" />
                  OFERTA COMPLETA
                </Badge>
              )}
              {offerStage === "down-sell" && (
                <Badge className="animate-bounce bg-gradient-to-r from-blue-500 to-cyan-500 px-2.5 py-0.5 font-heading text-[10px] font-extrabold text-white shadow-xl shadow-blue-500/50">
                  <TrendingDown className="mr-1 h-2.5 w-2.5 animate-pulse" />
                  ÚLTIMA CHANCE
                </Badge>
              )}
            </div>

            <div className="relative rounded-2xl border-2 bg-background p-3 shadow-2xl sm:p-4 mt-2">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute right-2 top-2 rounded-full bg-muted p-1 transition-all hover:bg-destructive hover:text-destructive-foreground hover:scale-110 hover:rotate-90 duration-200"
                aria-label="Fechar"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              {offerStage === "upsell" && (
                <div>
                  <div className="mb-2 text-center sm:mb-2.5">
                    <div className="mb-1.5 inline-flex items-center gap-1 rounded-full border-2 border-warning/30 bg-gradient-to-r from-warning/20 to-orange-500/20 px-2.5 py-0.5 shadow-lg shadow-warning/20 sm:gap-1.5">
                      <Crown className="h-3.5 w-3.5 text-warning animate-pulse sm:h-4 sm:w-4" />
                      <span className="text-[10px] font-bold text-warning sm:text-xs">UPGRADE EXCLUSIVO</span>
                    </div>
                    <h3 className="mb-1 font-heading text-base font-bold leading-tight sm:text-lg md:text-xl">
                      Acelere Seus <span className="text-warning">Resultados!</span>
                    </h3>
                    <p className="text-[10px] text-muted-foreground sm:text-xs">Comunidade VIP + Suporte Exclusivo</p>
                  </div>
                  <div className="mb-2 space-y-1.5 sm:mb-2.5">
                    {offerDetailsMap[offerStage].features.map((feature, index) => (
                      <div
                        key={index}
                        className="group flex items-start gap-2 rounded-lg border border-warning/20 bg-gradient-to-br from-warning/10 to-orange-500/5 p-2 transition-all hover:scale-[1.02] hover:border-warning/40 hover:shadow-md hover:shadow-warning/20 sm:p-2.5"
                      >
                        <div className="rounded-md bg-warning/20 p-1 transition-transform group-hover:scale-110 group-hover:rotate-3 sm:p-1.5">
                          {index === 0 ? (
                            <BookOpen className="h-3.5 w-3.5 text-warning sm:h-4 sm:w-4" />
                          ) : index === 1 ? (
                            <Users className="h-3.5 w-3.5 text-warning sm:h-4 sm:w-4" />
                          ) : index === 2 ? (
                            <MessageCircle className="h-3.5 w-3.5 text-warning sm:h-4 sm:w-4" />
                          ) : (
                            <Video className="h-3.5 w-3.5 text-warning sm:h-4 sm:w-4" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold leading-tight sm:text-sm">{feature}</div>
                          <div className="text-[10px] leading-tight text-muted-foreground sm:text-xs">
                            {feature === "+30 Módulos Completos"
                              ? "Todo conteúdo do zero aos 10k/mês"
                              : feature === "Comunidade Exclusiva VIP"
                                ? "Networking com vendedores de 6 dígitos"
                                : feature === "Suporte Prioritário"
                                  ? "Tire dúvidas direto com especialistas"
                                  : "Mentorias ao vivo toda semana"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mb-2 rounded-xl border-2 border-warning/40 bg-gradient-to-br from-warning/20 via-orange-500/15 to-warning/10 p-2.5 text-center shadow-lg shadow-warning/30 animate-pulse sm:mb-2.5 sm:p-3">
                    <div className="mb-0.5 text-[10px] text-muted-foreground line-through sm:text-xs">De R$ 297,00</div>
                    <div className="mb-0.5 font-heading text-2xl font-black text-warning sm:text-3xl">R$ 99,90</div>
                    <div className="text-[10px] font-semibold text-warning/80 sm:text-xs">Upgrade VIP</div>
                  </div>
                  <Button
                    onClick={handleAccept}
                    size="lg"
                    className="mb-1.5 h-11 w-full gap-2 bg-gradient-to-r from-warning to-orange-500 font-heading text-xs font-bold text-white shadow-lg shadow-warning/40 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-warning/50 sm:h-12 sm:text-sm"
                  >
                    <Crown className="h-3.5 w-3.5 animate-bounce sm:h-4 sm:w-4" />
                    Sim, Quero o Upgrade VIP!
                  </Button>
                  <button
                    onClick={handleDecline}
                    className="w-full py-1.5 text-center text-[10px] text-muted-foreground underline transition-all hover:text-foreground hover:scale-105 sm:text-xs"
                  >
                    Não, continuar com o plano básico
                  </button>
                </div>
              )}

              {offerStage === "cross-sell" && (
                <div>
                  <div className="mb-2 text-center">
                    <div className="mb-1.5 inline-flex items-center gap-1 rounded-full border-2 border-success/30 bg-gradient-to-r from-success/20 to-emerald-500/20 px-2.5 py-0.5 shadow-lg shadow-success/20">
                      <CheckCircle className="h-3.5 w-3.5 text-success animate-pulse" />
                      <span className="text-[10px] font-bold text-success">OFERTA COMPLETA</span>
                    </div>
                    <h3 className="mb-1 font-heading text-lg font-bold leading-tight sm:text-xl">
                      Tudo Bem! Vamos com o <span className="text-success">Essencial</span>
                    </h3>
                    <p className="text-[11px] text-muted-foreground sm:text-xs">Acesso completo ao método 10k/mês</p>
                  </div>

                  <div className="mb-2 space-y-1.5">
                    {offerDetailsMap[offerStage].features.map((feature, index) => (
                      <div
                        key={index}
                        className="group flex items-start gap-2 rounded-lg border border-success/20 bg-gradient-to-br from-success/10 to-emerald-500/5 p-2 transition-all hover:scale-[1.02] hover:border-success/40 hover:shadow-md hover:shadow-success/20"
                      >
                        <div className="rounded-md bg-success/20 p-1 transition-transform group-hover:scale-110 group-hover:rotate-3">
                          {index === 0 ? (
                            <BookOpen className="h-3.5 w-3.5 text-success" />
                          ) : index === 1 ? (
                            <Users className="h-3.5 w-3.5 text-success" />
                          ) : index === 2 ? (
                            <Sparkles className="h-3.5 w-3.5 text-success" />
                          ) : (
                            <Gift className="h-3.5 w-3.5 text-success" />
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-bold">{feature}</div>
                          <div className="text-[10px] text-muted-foreground">
                            {feature === "+30 Módulos Completos"
                              ? "Todo o conteúdo do zero aos 10k"
                              : feature === "Comunidade do Digital"
                                ? "Networking e troca de experiências"
                                : feature === "Templates e Bônus"
                                  ? "Tudo que você precisa para começar"
                                  : "Acesso vitalício"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-2 rounded-xl border-2 border-success/40 bg-gradient-to-br from-success/20 via-emerald-500/15 to-success/10 p-2.5 text-center shadow-lg shadow-success/30 animate-pulse">
                    <div className="mb-0.5 text-[10px] text-muted-foreground line-through">De R$ 1.198,80</div>
                    <div className="mb-0.5 font-heading text-2xl font-black text-success sm:text-3xl">R$ 79,90</div>
                    <div className="text-[10px] font-semibold text-success/80">Oferta completa</div>
                  </div>

                  <Button
                    onClick={handleAccept}
                    size="lg"
                    className="mb-1.5 h-11 w-full gap-2 bg-gradient-to-r from-success to-emerald-500 font-heading text-xs font-bold text-white shadow-lg shadow-success/40 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-success/50 sm:text-sm"
                  >
                    <Rocket className="h-3.5 w-3.5 animate-bounce" />
                    Garantir Minha Vaga Agora
                  </Button>

                  <button
                    onClick={handleDecline}
                    className="w-full py-1.5 text-center text-[10px] text-muted-foreground underline transition-all hover:text-foreground hover:scale-105"
                  >
                    Ver outra opção
                  </button>
                </div>
              )}

              {offerStage === "down-sell" && (
                <div>
                  <div className="mb-2 text-center">
                    <div className="mb-1.5 inline-flex items-center gap-1 rounded-full border-2 border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-2.5 py-0.5 shadow-lg shadow-blue-500/20">
                      <Gift className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-blue-500">ÚLTIMA CHANCE</span>
                    </div>
                    <h3 className="mb-1 font-heading text-lg font-bold leading-tight sm:text-xl">
                      Oferta <span className="text-blue-500">Especial</span> Para Você
                    </h3>
                    <p className="text-[11px] text-muted-foreground sm:text-xs">Comece com investimento menor</p>
                  </div>

                  <div className="mb-2 space-y-1.5">
                    {offerDetailsMap[offerStage].features.map((feature, index) => (
                      <div
                        key={index}
                        className="group flex items-start gap-2 rounded-lg border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 p-2 transition-all hover:scale-[1.02] hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-500/20"
                      >
                        <div className="rounded-md bg-blue-500/20 p-1 transition-transform group-hover:scale-110 group-hover:rotate-3">
                          {index === 0 ? (
                            <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                          ) : index === 1 ? (
                            <Users className="h-3.5 w-3.5 text-blue-500" />
                          ) : index === 2 ? (
                            <Zap className="h-3.5 w-3.5 text-blue-500" />
                          ) : (
                            <Gift className="h-3.5 w-3.5 text-blue-500" />
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-bold">{feature}</div>
                          <div className="text-[10px] text-muted-foreground">
                            {feature === "Módulos Essenciais"
                              ? "O core do método para começar"
                              : feature === "Comunidade do Digital"
                                ? "Networking e troca de experiências"
                                : feature === "Acesso Vitalício"
                                  ? "Estude no seu ritmo, para sempre"
                                  : "Suporte Básico"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-2 rounded-xl border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/20 via-cyan-500/15 to-blue-500/10 p-2.5 text-center shadow-lg shadow-blue-500/30 animate-pulse">
                    <div className="mb-0.5 text-[10px] text-muted-foreground line-through">De R$ 497,00</div>
                    <div className="mb-0.5 font-heading text-2xl font-black text-blue-500 sm:text-3xl">R$ 49,90</div>
                    <div className="text-[10px] font-semibold text-blue-500/80">Última chance</div>
                  </div>

                  <Button
                    onClick={handleAccept}
                    size="lg"
                    className="mb-1.5 h-11 w-full gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 font-heading text-xs font-bold text-white shadow-lg shadow-blue-500/40 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-500/50 sm:text-sm"
                  >
                    <Gift className="h-3.5 w-3.5 animate-bounce" />
                    Sim, Quero Começar Agora!
                  </Button>

                  <button
                    onClick={() => setShowPopup(false)}
                    className="w-full py-1.5 text-center text-[10px] text-muted-foreground underline transition-all hover:text-foreground hover:scale-105"
                  >
                    Não, obrigado
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
