"use client"

import { ArrowLeft, Send, Phone, Video, LinkIcon } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { BonusReels } from "@/components/bonus-reels"

type Message = {
  id: number
  type: "received" | "sent" | "button" | "timestamp" | "image"
  content: string
  time?: string
  buttonText?: string
  buttonAction?: () => void
  images?: string[]
}

export default function OfertaPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [conversationPart, setConversationPart] = useState(0)
  const [clickedButtons, setClickedButtons] = useState<number[]>([])
  const [showInitialButton, setShowInitialButton] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showBonusModal, setShowBonusModal] = useState(false)
  const [conversationStartTime, setConversationStartTime] = useState<Date | null>(null)

  const getMessageTime = (baseMinutesOffset: number): string => {
    if (!conversationStartTime) return "00:00"

    const messageTime = new Date(conversationStartTime.getTime() + baseMinutesOffset * 60000)
    const hours = messageTime.getHours().toString().padStart(2, "0")
    const minutes = messageTime.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes}`
  }

  const getTimestampLabel = (): string => {
    const now = new Date()
    const hour = now.getHours()
    // If it's before 2 AM, show "Ontem", otherwise "Hoje"
    return hour < 2 ? "Ontem" : "Hoje"
  }

  const getMessageDelay = (message: Message): number => {
    if (message.type === "image") return 1500
    if (message.type === "button" || message.type === "timestamp") return 0

    const contentLength = message.content.length

    // Short messages (< 100 chars): 3000ms
    if (contentLength < 100) return 3000

    // Medium messages (100-250 chars): 3500ms
    if (contentLength < 250) return 3500

    // Long messages (> 250 chars): 4000ms
    return 4000
  }

  const conversationFlow: Message[] = [
    { id: 1, type: "timestamp", content: `${getTimestampLabel()} ${getMessageTime(0)}` },
    {
      id: 2,
      type: "received",
      content: "🔥 PARABÉNS! Você acabou de completar a experiência!",
      time: getMessageTime(0),
    },
    {
      id: 3,
      type: "received",
      content:
        "Irmão, sério... você acabou de aprender em alguns minutos o que 90% das pessoas NUNCA vai descobrir sobre vender no digital.",
      time: getMessageTime(0),
    },
    {
      id: 4,
      type: "received",
      content:
        "Você viu seu nicho, definiu seu produto, calculou o valor e testou as estratégias. Você literalmente TEM O MAPA nas mãos agora.",
      time: getMessageTime(0),
    },
    {
      id: 5,
      type: "received",
      content: "E olha a real: com o que você aprendeu AGORA, você já pode começar a faturar.",
      time: getMessageTime(1),
    },
    {
      id: 6,
      type: "received",
      content:
        "Não tô brincando. Se você aplicar exatamente o que viu, em 30 dias você pode estar com os primeiros resultados.",
      time: getMessageTime(1),
    },
    {
      id: 7,
      type: "received",
      content: "Mas... (e sempre tem um mas, né? 😅)",
      time: getMessageTime(1),
    },
    {
      id: 8,
      type: "received",
      content: "A diferença entre fazer uns trocados e REALMENTE bater 10k por mês não é sorte.",
      time: getMessageTime(2),
    },
    {
      id: 9,
      type: "received",
      content: "É ter o SISTEMA COMPLETO. É saber escalar. É ter as ferramentas certas trabalhando por você 24h.",
      time: getMessageTime(2),
    },
    {
      id: 10,
      type: "received",
      content: "É transformar esse conhecimento em MÁQUINA DE VENDAS.",
      time: getMessageTime(2),
    },
    {
      id: 11,
      type: "button",
      content: "QUERO SABER COMO ESCALAR ISSO!",
      buttonText: "QUERO SABER COMO ESCALAR ISSO!",
    },
  ]

  const conversationFlowPart2: Message[] = [
    {
      id: 12,
      type: "received",
      content: "Olha, eu comecei EXATAMENTE onde você tá agora.",
      time: getMessageTime(3),
    },
    {
      id: 13,
      type: "received",
      content: "Aprendi o básico, fiz minha primeira venda, fiquei empolgado pra caramba...",
      time: getMessageTime(3),
    },
    {
      id: 14,
      type: "received",
      content: "Mas ficava travado. Não sabia como ESCALAR. Como fazer isso todo dia. Como automatizar.",
      time: getMessageTime(3),
    },
    {
      id: 15,
      type: "received",
      content: "Até que eu descobri um sistema que mudou TUDO.",
      time: getMessageTime(3),
    },
    {
      id: 16,
      type: "received",
      content: "E olha onde eu cheguei:",
      time: getMessageTime(3),
    },
    {
      id: 17,
      type: "image",
      content: "",
      images: ["/proof-pix-notifications.png"],
    },
    {
      id: 18,
      type: "image",
      content: "",
      images: ["/proof-notifications.png"],
    },
    {
      id: 19,
      type: "image",
      content: "",
      images: ["/proof-dashboard-3.png"],
    },
    {
      id: 20,
      type: "received",
      content: "Sabe qual foi o segredo? Eu parei de fazer TUDO sozinho.",
      time: getMessageTime(4),
    },
    {
      id: 21,
      type: "received",
      content: "Montei um sistema que:",
      time: getMessageTime(4),
    },
    {
      id: 22,
      type: "received",
      content:
        "✅ Atrai clientes no automático\n✅ Vende enquanto eu durmo\n✅ Escala sem eu precisar trabalhar 12h por dia",
      time: getMessageTime(4),
    },
    {
      id: 23,
      type: "received",
      content: "E o melhor? Isso me deu TEMPO. Tempo pra viver. Pra estar com quem eu amo. Pra fazer o que EU quero.",
      time: getMessageTime(4),
    },
    {
      id: 24,
      type: "received",
      content: "Porque no final, não é só sobre dinheiro. É sobre LIBERDADE de verdade.",
      time: getMessageTime(4),
    },
    {
      id: 25,
      type: "received",
      content:
        "E não sou só eu não. Tem gente que começou do zero, aprendeu o básico igual você acabou de aprender, mas pegou o sistema completo e decolou. Olha só:",
      time: getMessageTime(5),
    },
    {
      id: 26,
      type: "image",
      content: "",
      images: ["/proof-dashboard-1.png"],
    },
    {
      id: 27,
      type: "image",
      content: "",
      images: ["/proof-dashboard-2.png"],
    },
    {
      id: 28,
      type: "image",
      content: "",
      images: ["/testimonial-chat.png"],
    },
    {
      id: 29,
      type: "button",
      content: "Quero o sistema completo!",
      buttonText: "Quero o sistema completo!",
    },
  ]

  const conversationFlowPart3: Message[] = [
    {
      id: 30,
      type: "received",
      content:
        "Então fechou! Você já tem o conhecimento. Agora vou te entregar o SISTEMA COMPLETO pra você escalar isso.",
      time: getMessageTime(8),
    },
  ]

  const conversationFlowPart4: Message[] = [
    {
      id: 31,
      type: "received",
      content: "No Método Liberdade 10k/Mês você recebe:",
      time: getMessageTime(13),
    },
    {
      id: 32,
      type: "received",
      content:
        "✅ Módulo 1: O Mapa da Liberdade\nQual produto vender que gera resultado RÁPIDO - aprofundamento do que você viu",
      time: getMessageTime(14),
    },
    {
      id: 33,
      type: "received",
      content:
        "✅ Módulo 2: Sistema de Atração Avançado\nComo fazer cliente vir até VOCÊ todos os dias, sem perseguir ninguém",
      time: getMessageTime(14),
    },
    {
      id: 34,
      type: "received",
      content: "✅ Módulo 3: Escala Inteligente\nO passo a passo exato pra sair de 2k e chegar nos 10k+ por mês",
      time: getMessageTime(14),
    },
    {
      id: 35,
      type: "received",
      content:
        "E só pra quem passou pela experiência e tá aqui AGORA, vou liberar 6 BÔNUS INSANOS que valem mais que o método todo:",
      time: getMessageTime(15),
    },
    {
      id: 36,
      type: "received",
      content:
        "🎁 BÔNUS 1: KIT COMPLETO DE TEMPLATES PRONTOS (Valor: R$ 297,00)\nTodos os meus roteiros, copies e estratégias que vendem. É só adaptar e usar.",
      time: getMessageTime(15),
    },
    {
      id: 37,
      type: "received",
      content:
        "🎁 BÔNUS 2: MENTALIDADE DE VENCEDOR (Valor: R$ 197,00)\nO mindset que me tirou da merda e me fez faturar consistente. Sem isso, nada funciona.",
      time: getMessageTime(15),
    },
    {
      id: 38,
      type: "received",
      content:
        "🎁 BÔNUS 3: SUPORTE DIRETO POR 30 DIAS (Valor: R$ 347,00)\nVocê não vai ficar perdido. Qualquer dúvida, eu te respondo pessoalmente.",
      time: getMessageTime(15),
    },
    {
      id: 39,
      type: "received",
      content:
        "🎁 BÔNUS 4: AGENTE DE IA COPYWRITER (Valor: R$ 697,00)\nUm robô treinado pra criar copies, roteiros de venda e textos persuasivos pra você 24h por dia. Nunca mais trave na hora de vender.",
      time: getMessageTime(16),
    },
    {
      id: 40,
      type: "received",
      content:
        "🎁 BÔNUS 5: AGENTE DE IA PARA ESTRATÉGIAS (Valor: R$ 797,00)\nIA especializada que cria planos de ação personalizados pro SEU negócio. É como ter um consultor trabalhando de graça.",
      time: getMessageTime(16),
    },
    {
      id: 41,
      type: "received",
      content:
        "🎁 BÔNUS 6: AUTOMAÇÃO DE ATENDIMENTO COM IA (Valor: R$ 497,00)\nSistema completo que responde seus clientes no Instagram e WhatsApp automaticamente. Você vende até dormindo.",
      time: getMessageTime(16),
    },
    {
      id: 42,
      type: "button",
      content: "Quanto vai custar?",
      buttonText: "Quanto vai custar?",
    },
  ]

  const conversationFlowPart5: Message[] = [
    {
      id: 43,
      type: "received",
      content: "Se eu cobrasse tudo separado, o valor passaria fácil dos R$ 2.997,00.",
      time: getMessageTime(17),
    },
    {
      id: 44,
      type: "received",
      content: "Mas você acabou de passar pela experiência. Você viu que isso funciona. Você MERECE essa chance.",
      time: getMessageTime(17),
    },
    {
      id: 45,
      type: "received",
      content:
        "Por isso, SOMENTE pra quem completou a experiência HOJE, o acesso completo ao Método + todos os 6 Bônus não vai sair por R$ 2.997,00...",
      time: getMessageTime(18),
    },
    {
      id: 46,
      type: "received",
      content: "Nem por R$ 497,00...",
      time: getMessageTime(18),
    },
    {
      id: 47,
      type: "received",
      content: "Seu investimento vai ser de apenas:",
      time: getMessageTime(18),
    },
    {
      id: 48,
      type: "received",
      content: "💰 R$ 99,90\nou\n💳 10x de R$ 9,90 no cartão",
      time: getMessageTime(18),
    },
    {
      id: 49,
      type: "received",
      content: "O preço de uma pizza pra ter o SISTEMA COMPLETO que pode te levar aos 10k por mês.",
      time: getMessageTime(18),
    },
  ]

  const conversationFlowPart6: Message[] = [
    {
      id: 50,
      type: "received",
      content: "Olha, você tem duas opções agora:",
      time: getMessageTime(22),
    },
    {
      id: 51,
      type: "received",
      content:
        "1️⃣ Sair daqui com o conhecimento e bônus que você ganhou de graça e tentar sozinho (vai funcionar, mas vai demorar MUITO mais)",
      time: getMessageTime(22),
    },
    {
      id: 52,
      type: "received",
      content:
        "2️⃣ Pegar o sistema completo AGORA, com tudo pronto, automatizado e acesso a comunidade de pessoas que já estão no jogo tendo os resultados que mostrei (o resultado vai vir 2x mais rápido)",
      time: getMessageTime(22),
    },
    {
      id: 53,
      type: "button",
      content: "Opção 1",
      buttonText: "Opção 1",
    },
    {
      id: 54,
      type: "button",
      content: "Opção 2",
      buttonText: "Opção 2",
    },
    {
      id: 55,
      type: "received",
      content:
        "A escolha é sua. Mas esse preço é SÓ pra quem age AGORA. Daqui algumas horas volta pro valor normal de R$ 497,00.",
      time: getMessageTime(22),
    },
    {
      id: 56,
      type: "received",
      content:
        "P.S.: Você já deu o primeiro passo completando a experiência. Agora é só decidir: continuar no modo devagar ou ACELERAR de vez? ⚡",
      time: getMessageTime(23),
    },
    {
      id: 57,
      type: "received",
      content:
        "P.P.S.: Lembra da sensação de ver seu resultado na experiência? Agora imagina isso acontecendo DE VERDADE, TODO MÊS. É disso que eu tô falando. 🔥",
      time: getMessageTime(23),
    },
  ]

  const isNearBottom = () => {
    if (!scrollContainerRef.current) return true
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
    return scrollHeight - scrollTop - clientHeight < 150
  }

  const scrollToBottom = () => {
    if (isNearBottom()) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (conversationPart === 1 && currentMessageIndex < conversationFlow.length) {
      const currentMessage = conversationFlow[currentMessageIndex]
      const messageDelay = currentMessage ? getMessageDelay(currentMessage) : 3000

      const timer = setTimeout(
        () => {
          setIsTyping(true)
          setTimeout(() => {
            const message = conversationFlow[currentMessageIndex]
            if (message) {
              setMessages((prev) => [...prev, message])
              setIsTyping(false)
              setCurrentMessageIndex((prev) => prev + 1)
            }
          }, messageDelay)
        },
        currentMessageIndex === 0 ? 500 : 100,
      )

      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex, conversationPart])

  const handleInitialButtonClick = () => {
    setConversationStartTime(new Date())
    setShowInitialButton(false)
    setConversationPart(1)
    setCurrentMessageIndex(0)
  }

  const handleButtonClick = (part: number, buttonId: number, userResponse: string, userTime: string) => {
    setClickedButtons((prev) => [...prev, buttonId])

    setMessages((prev) => [
      ...prev,
      {
        id: 100 + part,
        type: "sent",
        content: userResponse,
        time: userTime,
      },
    ])

    let flowToContinue: Message[] = []

    if (part === 1) {
      setConversationPart(2)
      flowToContinue = conversationFlowPart2
    } else if (part === 2) {
      setConversationPart(3)
      flowToContinue = conversationFlowPart3
    } else if (part === 3) {
      setConversationPart(4)
      flowToContinue = conversationFlowPart4
    } else if (part === 4) {
      setConversationPart(5)
      flowToContinue = conversationFlowPart5
    }

    let index = 0
    const continueConversation = () => {
      if (index < flowToContinue.length) {
        const message = flowToContinue[index]
        if (message && message.type !== "button") {
          setIsTyping(true)
        }

        const typingDelay = message ? getMessageDelay(message) : 3000

        setTimeout(() => {
          if (message) {
            setMessages((prev) => [...prev, message])
            setIsTyping(false)
            index++
            if (index < flowToContinue.length) {
              const nextMessage = flowToContinue[index]
              const nextDelay = nextMessage ? getMessageDelay(nextMessage) : 3000
              setTimeout(continueConversation, nextDelay)
            } else {
              if (part === 2) {
                // After Part 3 finishes, automatically load Part 4
                setTimeout(() => {
                  setConversationPart(4)
                  let part4Index = 0
                  const continuePart4 = () => {
                    if (part4Index < conversationFlowPart4.length) {
                      const message = conversationFlowPart4[part4Index]
                      if (message && message.type !== "button") {
                        setIsTyping(true)
                      }

                      const typingDelay = message ? getMessageDelay(message) : 3000

                      setTimeout(() => {
                        if (message) {
                          setMessages((prev) => [...prev, message])
                          setIsTyping(false)
                          part4Index++
                          if (part4Index < conversationFlowPart4.length) {
                            const nextMessage = conversationFlowPart4[part4Index]
                            const nextDelay = nextMessage ? getMessageDelay(nextMessage) : 3000
                            setTimeout(continuePart4, nextDelay)
                          }
                        }
                      }, typingDelay)
                    }
                  }
                  continuePart4()
                }, 2000)
              } else if (part === 4) {
                // After Part 5 finishes, automatically load Part 6
                setTimeout(() => {
                  setConversationPart(6)
                  let part6Index = 0
                  const continuePart6 = () => {
                    if (part6Index < conversationFlowPart6.length) {
                      const message = conversationFlowPart6[part6Index]
                      if (message && message.type !== "button") {
                        setIsTyping(true)
                      }

                      const typingDelay = message ? getMessageDelay(message) : 3000

                      setTimeout(() => {
                        if (message) {
                          setMessages((prev) => [...prev, message])
                          setIsTyping(false)
                          part6Index++
                          if (part6Index < conversationFlowPart6.length) {
                            const nextMessage = conversationFlowPart6[part6Index]
                            const nextDelay = nextMessage ? getMessageDelay(nextMessage) : 3000
                            setTimeout(continuePart6, nextDelay)
                          }
                        }
                      }, typingDelay)
                    }
                  }
                  continuePart6()
                }, 2000)
              }
            }
          }
        }, typingDelay)
      }
    }

    setTimeout(continueConversation, 1000)
  }

  const handleFinalCTA = () => {
    setShowBonusModal(true)
  }

  const handleBonusComplete = () => {
    setShowBonusModal(false)
    window.location.href = "/checkout"
  }

  if (showBonusModal) {
    return <BonusReels onComplete={handleBonusComplete} />
  }

  return (
    <div className="flex h-screen flex-col bg-black overflow-hidden font-sans">
      <div className="border-b border-white/10 bg-black px-3 py-2.5 shadow-lg sm:px-4 sm:py-3">
        <div className="mx-auto flex max-w-2xl items-center gap-2 sm:gap-3">
          <button className="text-white/70 transition-all hover:text-white hover:scale-110 active:scale-95">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <div className="flex items-center gap-2 flex-1 sm:gap-3">
            <div className="relative h-9 w-9 rounded-full bg-white/10 border border-white/20 overflow-hidden sm:h-10 sm:w-10">
              <Image src="/ph-profile.png" alt="PH Domingos" fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-xs font-semibold text-white sm:text-sm">PH Domingos</h1>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse sm:h-2 sm:w-2" />
                Online agora
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button className="text-white/70 transition-all hover:text-white hover:scale-110 active:scale-95">
              <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button className="text-white/70 transition-all hover:text-white hover:scale-110 active:scale-95">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button className="text-white/70 transition-all hover:text-white hover:scale-110 active:scale-95">
              <Video className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto bg-black">
        {/* Profile Card Section */}
        <div className="border-b border-white/10 bg-black px-3 py-4 sm:px-4 sm:py-6">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 text-center shadow-xl sm:p-6">
              <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-white/10 border-2 border-white/20 overflow-hidden relative sm:h-20 sm:w-20 sm:mb-4">
                <Image src="/ph-profile.png" alt="PH Domingos" fill className="object-cover" />
              </div>
              <h2 className="text-base font-semibold text-white mb-1 sm:text-lg">PH Domingos</h2>
              <p className="text-xs text-white/60 mb-2 sm:text-sm">@ph.domingoss</p>
              <div className="text-[10px] text-white/70 leading-relaxed mb-3 space-y-0.5 sm:text-xs sm:mb-4">
                <p>💸| Faturando mais de 100k/ano com funil gamificado</p>
                <p>🦥| Sistema preguiçoso onde tudo é feito por IA</p>
                <p>👇🏼| Veja como</p>
              </div>
              <button className="rounded-full bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 text-black px-6 py-2.5 text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(16,185,129,0.7)] transition-all hover:shadow-[0_0_50px_rgba(16,185,129,0.9)] active:scale-95 sm:text-sm sm:px-8 sm:py-3">
                Ver perfil
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="px-3 py-4 sm:px-4 sm:py-6">
          <div className="mx-auto max-w-2xl space-y-3 sm:space-y-4">
            {showInitialButton && conversationPart === 0 && (
              <div className="flex justify-center py-4 sm:py-6">
                <button
                  onClick={handleInitialButtonClick}
                  className="group relative rounded-full bg-gradient-to-br from-emerald-400 via-green-400 to-emerald-500 text-black px-6 py-3 text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(52,211,153,0.8),0_0_80px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(52,211,153,1),0_0_100px_rgba(16,185,129,0.6)] animate-pulse hover:animate-none flex flex-col items-center gap-1.5 sm:px-8 sm:py-4 sm:text-sm before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
                >
                  <span className="relative z-10 text-center leading-tight">
                    Começar conversa e ganhar
                    <br />
                    <span className="text-base sm:text-lg font-extrabold">BÔNUS no final</span>
                  </span>
                  <span className="relative z-10 text-[10px] sm:text-xs font-semibold opacity-95 bg-black/20 px-3 py-1 rounded-full">
                    🎁 50+ Reels Prontos pra Postar
                  </span>
                </button>
              </div>
            )}

            {messages.map((message, index) => {
              if (!message) return null

              if (message.type === "timestamp") {
                return (
                  <div key={message.id} className="flex items-center justify-center">
                    <span className="text-[10px] text-white/40 sm:text-xs">{message.content}</span>
                  </div>
                )
              }

              if (message.type === "image") {
                return (
                  <div key={message.id} className="flex items-start gap-2">
                    <div className="h-7 w-7 rounded-full bg-white/10 border border-white/20 overflow-hidden relative flex-shrink-0 sm:h-8 sm:w-8">
                      <Image src="/ph-profile.png" alt="PH" fill className="object-cover" />
                    </div>
                    <div className="flex-1 max-w-[75%] space-y-2">
                      {message.images?.map((img, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-lg transition-all hover:scale-[1.02] sm:rounded-2xl"
                        >
                          <div className="relative w-full h-auto">
                            <Image
                              src={img || "/placeholder.svg"}
                              alt={`Prova ${idx + 1}`}
                              width={600}
                              height={400}
                              className="w-full h-auto object-contain"
                              unoptimized
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }

              if (message.type === "button") {
                if (clickedButtons.includes(message.id)) {
                  return null
                }

                if (message.id === 53) {
                  const button54 = messages.find((m) => m.id === 54)
                  if (button54 && !clickedButtons.includes(54)) {
                    return (
                      <div key={message.id} className="flex justify-center gap-3 py-2 sm:py-3">
                        <button
                          onClick={() => {
                            setClickedButtons((prev) => [...prev, 53])
                            handleFinalCTA()
                          }}
                          className="group relative rounded-full bg-gradient-to-br from-emerald-400 via-green-400 to-emerald-500 text-black px-5 py-2.5 text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(52,211,153,0.8),0_0_80px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(52,211,153,1),0_0_100px_rgba(16,185,129,0.6)] animate-pulse hover:animate-none flex items-center gap-2 sm:px-6 sm:py-3 sm:text-sm before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
                        >
                          <span className="relative z-10">{message.buttonText}</span>
                          <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                        </button>
                        <button
                          onClick={() => {
                            setClickedButtons((prev) => [...prev, 54])
                            handleFinalCTA()
                          }}
                          className="group relative rounded-full bg-gradient-to-br from-emerald-400 via-green-400 to-emerald-500 text-black px-5 py-2.5 text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(52,211,153,0.8),0_0_80px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(52,211,153,1),0_0_100px_rgba(16,185,129,0.6)] animate-pulse hover:animate-none flex items-center gap-2 sm:px-6 sm:py-3 sm:text-sm before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
                        >
                          <span className="relative z-10">{button54.buttonText}</span>
                          <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
                        </button>
                      </div>
                    )
                  }
                }

                if (message.id === 54) {
                  return null
                }

                return (
                  <div key={message.id} className="flex justify-center py-2 sm:py-3">
                    <button
                      onClick={() => {
                        if (message.id === 11) {
                          handleButtonClick(1, message.id, "QUERO SABER COMO ESCALAR ISSO!", getMessageTime(2))
                        } else if (message.id === 29) {
                          handleButtonClick(2, message.id, "Quero o sistema completo!", getMessageTime(7))
                        } else if (message.id === 42) {
                          handleButtonClick(4, message.id, "Quanto vai custar?", getMessageTime(12))
                        }
                      }}
                      className="group relative rounded-full bg-gradient-to-br from-emerald-400 via-green-400 to-emerald-500 text-black px-6 py-3 text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(52,211,153,0.8),0_0_80px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(52,211,153,1),0_0_100px_rgba(16,185,129,0.6)] animate-pulse hover:animate-none flex items-center gap-2 sm:px-8 sm:py-4 sm:text-sm before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
                    >
                      <span className="relative z-10">{message.buttonText}</span>
                    </button>
                  </div>
                )
              }

              if (message.type === "sent") {
                return (
                  <div key={message.id} className="flex items-end justify-end">
                    <div className="max-w-[75%]">
                      <div className="rounded-2xl rounded-br-md bg-[#0084FF] px-3 py-2.5 shadow-xl transition-all duration-200 hover:scale-[1.02] sm:px-4 sm:py-3">
                        <p className="text-xs text-white font-medium leading-relaxed whitespace-pre-line sm:text-sm">
                          {message.content}
                        </p>
                      </div>
                      {message.time && (
                        <span className="mt-1 block text-[10px] text-white/40 mr-2 text-right sm:text-xs">
                          {message.time}
                        </span>
                      )}
                    </div>
                  </div>
                )
              }

              return (
                <div key={message.id} className="flex items-start gap-2">
                  <div className="h-7 w-7 rounded-full bg-white/10 border border-white/20 overflow-hidden relative flex-shrink-0 sm:h-8 sm:w-8">
                    <Image src="/ph-profile.png" alt="PH" fill className="object-cover" />
                  </div>
                  <div className="max-w-[75%]">
                    <div className="rounded-xl rounded-tl-md border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm px-3 py-2.5 shadow-lg shadow-emerald-500/10 transition-all duration-200 hover:scale-[1.02] sm:rounded-2xl sm:px-4 sm:py-3">
                      <p className="text-xs text-white/90 leading-relaxed whitespace-pre-line sm:text-sm">
                        {message.content}
                      </p>
                    </div>
                    {message.time && (
                      <span className="mt-1 block text-[10px] text-white/40 ml-2 sm:text-xs">{message.time}</span>
                    )}
                  </div>
                </div>
              )
            })}

            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="h-7 w-7 rounded-full bg-white/10 border border-white/20 overflow-hidden relative flex-shrink-0 sm:h-8 sm:w-8">
                  <Image src="/ph-profile.png" alt="PH" fill className="object-cover" />
                </div>
                <div className="rounded-xl rounded-tl-md border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm px-4 py-3 shadow-lg shadow-emerald-500/10 sm:rounded-2xl">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-black px-3 py-2.5 shadow-2xl sm:px-4 sm:py-3">
        <div className="mx-auto flex max-w-2xl items-center gap-2 sm:gap-3">
          <div className="flex-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2.5 sm:px-5 sm:py-3">
            <input
              type="text"
              placeholder="Mensagem..."
              className="w-full bg-transparent text-xs text-white placeholder:text-white/50 focus:outline-none sm:text-sm"
              disabled
            />
          </div>
          <button className="rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-500 p-2.5 shadow-[0_0_30px_rgba(16,185,129,0.7)] transition-all hover:scale-110 hover:shadow-[0_0_50px_rgba(16,185,129,0.9)] active:scale-95 sm:p-3">
            <Send className="h-4 w-4 text-black sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
