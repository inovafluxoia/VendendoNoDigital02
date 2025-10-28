"use client"

import { useState } from "react"
import { MethodTutorial } from "@/components/method-tutorial"
import { NicheSelection, type Niche } from "@/components/niche-selection"
import { BonusMiniTraining } from "@/components/bonus-mini-training"
import { BonusEbook } from "@/components/bonus-ebook"
import { ProductTypeSelection } from "@/components/product-type-selection"
import { PriceSelection, type PriceRange } from "@/components/price-selection"
import { StrategySelection, type Strategy } from "@/components/strategy-selection"
import { OrganicCampaign } from "@/components/organic-campaign"
import { FinalOffer } from "@/components/final-offer"
import type { StrategyPerformance } from "@/components/strategy-performance"

export type Product = {
  id: string
  name: string
  type: "affiliate" | "own"
  price: number
  conversionRate: number
  niche: string
  difficulty: "easy" | "medium" | "hard"
}

export type Business = {
  cash: number
  products: { product: Product; sales: number; totalRevenue: number }[]
  totalRevenue: number
  campaignsRun: number
  initialCash: number
}

type SimulatorInterfaceProps = {
  showTutorialInitially?: boolean
}

export function SimulatorInterface({ showTutorialInitially = false }: SimulatorInterfaceProps) {
  const [tutorialCompleted, setTutorialCompleted] = useState(!showTutorialInitially)
  const [firstBonusShown, setFirstBonusShown] = useState(false)
  const [secondBonusShown, setSecondBonusShown] = useState(false)
  const [selectedNiche, setSelectedNiche] = useState<Niche | null>(null)
  const [selectedProductType, setSelectedProductType] = useState<"affiliate" | "own" | null>(null)
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedStrategies, setSelectedStrategies] = useState<Strategy[]>([])
  const [showCampaign, setShowCampaign] = useState(false)
  const [showFinalOffer, setShowFinalOffer] = useState(false)
  const [showSecondBonus, setShowSecondBonus] = useState(false)
  const [campaignPerformances, setCampaignPerformances] = useState<StrategyPerformance[]>([])
  const [totalSales, setTotalSales] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)

  const handleNicheSelected = (niche: Niche) => {
    setSelectedNiche(niche)
  }

  const handleProductTypeSelected = (type: "affiliate" | "own", niche: string) => {
    setSelectedProductType(type)
  }

  const handlePriceSelected = (priceRange: PriceRange) => {
    setSelectedPriceRange(priceRange)

    if (selectedNiche && selectedProductType) {
      const product: Product = {
        id: `${selectedProductType}-${selectedNiche.id}-${priceRange.price}`,
        name:
          selectedProductType === "affiliate"
            ? `Produto Afiliado de ${selectedNiche.name}`
            : `Seu Produto de ${selectedNiche.name}`,
        type: selectedProductType,
        price: priceRange.price,
        conversionRate: priceRange.conversionRate,
        niche: selectedNiche.name,
        difficulty: priceRange.difficulty,
      }
      setSelectedProduct(product)
    }
  }

  const handleStrategiesSelected = (strategies: Strategy[]) => {
    setSelectedStrategies(strategies)
    setShowCampaign(true)
  }

  const handleCampaignComplete = (sales: number, revenue: number, performances: StrategyPerformance[]) => {
    setTotalSales(sales)
    setTotalRevenue(revenue)
    setCampaignPerformances(performances)
    setShowCampaign(false)
    setShowSecondBonus(true)
  }

  const handleSecondBonusComplete = () => {
    setSecondBonusShown(true)
    setShowSecondBonus(false)
    setShowFinalOffer(true)
  }

  const handleRestart = () => {
    setTutorialCompleted(false)
    setFirstBonusShown(false)
    setSecondBonusShown(false)
    setShowSecondBonus(false)
    setSelectedNiche(null)
    setSelectedProductType(null)
    setSelectedPriceRange(null)
    setSelectedProduct(null)
    setSelectedStrategies([])
    setShowCampaign(false)
    setShowFinalOffer(false)
    setCampaignPerformances([])
    setTotalSales(0)
    setTotalRevenue(0)
  }

  if (!tutorialCompleted) {
    return <MethodTutorial onComplete={() => setTutorialCompleted(true)} />
  }

  if (!firstBonusShown) {
    return <BonusMiniTraining onComplete={() => setFirstBonusShown(true)} />
  }

  if (!selectedNiche) {
    return <NicheSelection onComplete={handleNicheSelected} />
  }

  if (!selectedProductType) {
    return <ProductTypeSelection niche={selectedNiche} onComplete={handleProductTypeSelected} />
  }

  if (!selectedPriceRange) {
    return <PriceSelection productType={selectedProductType} niche={selectedNiche} onComplete={handlePriceSelected} />
  }

  if (selectedProduct && selectedStrategies.length === 0) {
    return (
      <StrategySelection product={selectedProduct} niche={selectedNiche.name} onComplete={handleStrategiesSelected} />
    )
  }

  if (showCampaign && selectedProduct && selectedNiche && selectedPriceRange) {
    return (
      <OrganicCampaign
        product={selectedProduct}
        strategies={selectedStrategies}
        niche={selectedNiche}
        priceRange={selectedPriceRange}
        onComplete={handleCampaignComplete}
      />
    )
  }

  if (showSecondBonus) {
    return <BonusEbook onComplete={handleSecondBonusComplete} />
  }

  if (showFinalOffer && selectedProduct) {
    return (
      <FinalOffer
        performances={campaignPerformances}
        productPrice={selectedProduct.price}
        totalSales={totalSales}
        totalRevenue={totalRevenue}
        onRestart={handleRestart}
      />
    )
  }

  return null
}
