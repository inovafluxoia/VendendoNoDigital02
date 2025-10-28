"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Handshake, Rocket, CheckCircle2, ArrowRight } from "lucide-react"
import type { Niche } from "./niche-selection"

export type ProductType = "affiliate" | "own"

type ProductTypeSelectionProps = {
  niche: Niche
  onComplete: (productType: ProductType) => void
}

export function ProductTypeSelection({ niche, onComplete }: ProductTypeSelectionProps) {
  const [selectedType, setSelectedType] = useState<ProductType | null>(null)

  const productTypes = [
    {
      id: "affiliate" as ProductType,
      name: "Produto de Afiliado",
      description: "Venda produtos de terceiros e ganhe comissões de 30-50%",
      icon: <Handshake className="h-6 w-6 sm:h-7 sm:w-7 md:h-5 md:w-5" />,
      pros: [
        "Não precisa criar nada",
        "Comece vendendo HOJE mesmo",
        "Produtos já validados no mercado",
        "Suporte do produtor",
      ],
      cons: ["Comissão menor (30-50%)", "Dependência do produtor"],
    },
    {
      id: "own" as ProductType,
      name: "Produto Próprio",
      description: "Crie e venda seu próprio produto digital (ebook, curso, mentoria)",
      icon: <Rocket className="h-6 w-6 sm:h-7 sm:w-7 md:h-5 md:w-5" />,
      pros: [
        "100% do lucro é seu",
        "Total controle sobre o produto",
        "Construa sua marca pessoal",
        "Maior margem de lucro",
      ],
      cons: ["Precisa criar o produto", "Mais responsabilidade"],
    },
  ]

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-background/98 backdrop-blur-xl">
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-success/10 blur-[120px] md:h-[250px] md:w-[250px]" />

      <div className="relative z-10 shrink-0 border-b border-border/50 bg-background/80 px-4 py-3 backdrop-blur-sm md:py-2">
        <div className="mx-auto max-w-4xl">
          <div className="mb-2 flex items-center justify-between md:mb-1">
            <h3 className="text-sm font-bold sm:text-base md:text-sm">Tipo de Produto</h3>
            <span className="text-xs font-medium text-muted-foreground sm:text-sm md:text-xs">40% completo</span>
          </div>
          <Progress value={40} className="h-1.5 md:h-1" />
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 md:px-4 md:py-3">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-4 text-center sm:mb-6 md:mb-3">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1.5 sm:mb-3 sm:px-4 sm:py-2 md:mb-1.5 md:px-2.5 md:py-1">
              <span className="text-xs font-semibold text-success sm:text-sm md:text-xs">
                Nicho: <span className="font-bold">{niche.name}</span>
              </span>
            </div>
            <h2 className="mb-2 text-balance text-xl font-bold leading-tight sm:text-2xl md:mb-1.5 md:text-lg">
              Escolha o Tipo de Produto
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base md:text-sm">
              Produto de afiliado ou criar o seu próprio?
            </p>
          </div>

          <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 md:gap-3">
            {productTypes.map((type) => {
              const isSelected = selectedType === type.id

              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full rounded-xl border-2 p-4 text-left transition-all active:scale-[0.98] sm:p-5 md:p-3 ${
                    isSelected
                      ? "border-success bg-success/10 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                      : "border-border/50 bg-card/50 hover:border-success/30 hover:bg-card/70"
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between sm:mb-4 md:mb-2">
                    <div
                      className={`rounded-xl p-2.5 sm:p-3 md:p-2 ${isSelected ? "bg-success/20 text-success" : "bg-success/10 text-success"}`}
                    >
                      {type.icon}
                    </div>
                    {isSelected && <CheckCircle2 className="h-5 w-5 text-success sm:h-6 sm:w-6 md:h-4 md:w-4" />}
                  </div>

                  <h3 className="mb-2 text-base font-bold leading-tight sm:text-lg md:mb-1 md:text-sm">{type.name}</h3>
                  <p className="mb-3 text-sm leading-relaxed text-muted-foreground sm:mb-4 sm:text-base md:mb-2 md:text-xs">
                    {type.description}
                  </p>

                  <div className="mb-3 space-y-2 md:mb-2 md:space-y-1">
                    <div className="text-xs font-semibold text-success sm:text-sm md:text-xs">✓ Vantagens:</div>
                    <ul className="space-y-1.5 md:space-y-1">
                      {type.pros.map((pro, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-xs"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success sm:h-4 sm:w-4 md:h-3 md:w-3" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5 md:space-y-1">
                    <div className="text-xs font-semibold text-warning sm:text-sm md:text-xs">⚠ Desvantagens:</div>
                    <ul className="space-y-1 md:space-y-0.5">
                      {type.cons.map((con, index) => (
                        <li key={index} className="text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-xs">
                          • {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="h-20 md:h-14" />
        </div>
      </div>

      {selectedType && (
        <div className="relative z-10 shrink-0 border-t border-border/50 bg-background/95 px-4 py-3 backdrop-blur-sm md:py-2">
          <div className="mx-auto max-w-4xl">
            <Button
              onClick={() => onComplete(selectedType)}
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
