"use server"

type CreateTransactionParams = {
  offerType: "upsell" | "cross-sell" | "down-sell"
  offerPrice: number
  offerTitle: string
  customer: {
    name: string
    email: string
    phone: string
    document: string
    cep: string
    city: string
    state: string
    street: string
    number: string
    neighborhood: string
  }
}

const DEMO_MODE = false // Ative para testar sem chamar a API real

export async function createTransaction(params: CreateTransactionParams) {
  try {
    const { offerType, offerPrice, offerTitle, customer } = params

    console.log("[v0] Criando transação com dados:", {
      offerType,
      offerPrice,
      customer: {
        ...customer,
        document: customer.document,
        phone: customer.phone,
      },
    })

    if (DEMO_MODE) {
      console.log("[v0] MODO DEMO ATIVADO - Simulando transação")

      // Simula um delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Retorna dados simulados de PIX
      const mockPixPayload =
        "00020126580014br.gov.bcb.pix0136" +
        Math.random().toString(36).substring(2, 15) +
        "52040000530398654" +
        offerPrice.toFixed(2).replace(".", "") +
        "5802BR5925METODO 10K MES DIGITAL6009SAO PAULO62070503***6304"

      return {
        success: true,
        pixPayload: mockPixPayload,
        transactionId: `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        demo: true,
      }
    }

    const payload = {
      external_id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      total_amount: offerPrice,
      payment_method: "PIX",
      webhook_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://yourdomain.com"}/api/webhook`,
      items: [
        {
          id: offerType,
          title: offerTitle,
          description: `Acesso completo ao ${offerTitle}`,
          price: offerPrice,
          quantity: 1,
          is_physical: false,
        },
      ],
      ip: "0.0.0.0",
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        document_type: customer.document.length === 11 ? "CPF" : "CNPJ",
        document: customer.document,
      },
    }

    console.log("[v0] Payload enviado:", JSON.stringify(payload, null, 2))

    const response = await fetch("https://api.lirapaybr.com/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-secret": process.env.LIRAPAY_API_SECRET || "",
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    console.log("[v0] Resposta da API:", JSON.stringify(data, null, 2))

    if (data.hasError) {
      console.error("[v0] Erro da API:", data.errorFields)
      return {
        success: false,
        error: data.errorFields?.[0]?.message || "Erro ao gerar PIX",
      }
    }

    return {
      success: true,
      pixPayload: data.pix.payload,
      transactionId: data.id,
    }
  } catch (error) {
    console.error("[v0] Erro ao criar transação:", error)
    return {
      success: false,
      error: "Erro ao processar pagamento",
    }
  }
}
