"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Video, TrendingUp, Zap, CheckCircle2 } from "lucide-react"

type BonusReelsProps = {
  onComplete: () => void
}

export function BonusReels({ onComplete }: BonusReelsProps) {
  const [claimed, setClaimed] = useState(false)

  const handleClaim = () => {
    setClaimed(true)
    setTimeout(() => {
      onComplete()
    }, 2000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-950 via-black to-black p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-2xl">
        {/* Celebration Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-4 py-2 backdrop-blur-sm sm:gap-3 sm:px-6 sm:py-2.5">
            <Sparkles className="h-4 w-4 text-purple-400 sm:h-5 sm:w-5" />
            <span className="text-xs font-bold text-purple-300 sm:text-sm">50+ Reels Prontos!</span>
            <Sparkles className="h-4 w-4 text-purple-400 sm:h-5 sm:w-5" />
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="overflow-hidden rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-950/50 to-black/50 p-6 shadow-2xl backdrop-blur-sm sm:rounded-3xl sm:p-8"
        >
          {/* Header */}
          <div className="mb-6 text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
              className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20 sm:h-20 sm:w-20"
            >
              <Video className="h-8 w-8 text-purple-400 sm:h-10 sm:w-10" />
            </motion.div>
            <h3 className="mb-1 text-lg font-bold sm:mb-2 sm:text-xl">50+ Reels Prontos para Postar</h3>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Conteúdo viral pronto para você começar a vender hoje mesmo
            </p>
          </div>

          {/* Features List */}
          <div className="mb-6 space-y-3 sm:mb-8 sm:space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 sm:h-6 sm:w-6">
                <Video className="h-3 w-3 text-purple-400 sm:h-3.5 sm:w-3.5" />
              </div>
              <div>
                <p className="text-sm font-semibold sm:text-base">50+ Reels Editados e Prontos</p>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Vídeos profissionais prontos para postar no Instagram e TikTok
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 sm:h-6 sm:w-6">
                <TrendingUp className="h-3 w-3 text-purple-400 sm:h-3.5 sm:w-3.5" />
              </div>
              <div>
                <p className="text-sm font-semibold sm:text-base">Conteúdo Viral Testado</p>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Reels que já geraram milhares de visualizações e vendas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 sm:h-6 sm:w-6">
                <Zap className="h-3 w-3 text-purple-400 sm:h-3.5 sm:w-3.5" />
              </div>
              <div>
                <p className="text-sm font-semibold sm:text-base">Poste e Comece a Vender</p>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Sem precisar criar conteúdo do zero, economize horas de trabalho
                </p>
              </div>
            </div>
          </div>

          {/* Value Badge */}
          <div className="mb-6 rounded-xl bg-purple-500/10 p-4 text-center backdrop-blur-sm sm:mb-8">
            <p className="mb-1 text-xs text-muted-foreground sm:text-sm">Valor Real</p>
            <p className="text-xl font-bold line-through opacity-50 sm:text-2xl">R$ 197,00</p>
            <p className="mt-1 text-xs text-purple-400 sm:text-sm">
              Seu hoje: <span className="text-lg font-extrabold text-purple-400 sm:text-xl">GRÁTIS</span>
            </p>
          </div>

          {/* CTA Button */}
          {!claimed ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClaim}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-4 text-sm font-bold text-white shadow-lg transition-all hover:shadow-purple-500/50 sm:text-base"
            >
              Resgatar 50+ Reels Agora
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-2 rounded-xl bg-purple-500/20 px-6 py-4"
            >
              <CheckCircle2 className="h-5 w-5 text-purple-400 sm:h-6 sm:w-6" />
              <span className="text-sm font-bold text-purple-400 sm:text-base">Bônus Resgatado!</span>
            </motion.div>
          )}

          {/* Progress Indicator */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground sm:text-sm">
              Bônus <span className="font-bold text-purple-400">3 de 3</span> desbloqueado
            </p>
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center text-xs text-muted-foreground sm:mt-6 sm:text-sm"
        >
          Você está a um passo de transformar seu digital 🚀
        </motion.p>
      </motion.div>
    </div>
  )
}
