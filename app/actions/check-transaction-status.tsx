"use server"

const DEMO_MODE = false // Deve estar sincronizado com create-transaction.ts

export async function checkTransactionStatus(transactionId: string) {
  try {
    if (DEMO_MODE && transactionId.startsWith("demo_")) {
      console.log("[v0] MODO DEMO - Verificando status simulado")

      const transactionTime = Number.parseInt(transactionId.split("_")[1])
      const elapsedTime = Date.now() - transactionTime

      // Simula aprovação após 10 segundos
      if (elapsedTime > 10000) {
        console.log("[v0] MODO DEMO - Pagamento aprovado (simulado)")
        return {
          success: true,
          status: "PAID",
          transaction: { id: transactionId, status: "PAID" },
        }
      }

      console.log("[v0] MODO DEMO - Pagamento pendente (simulado)")
      return {
        success: true,
        status: "PENDING",
        transaction: { id: transactionId, status: "PENDING" },
      }
    }

    const response = await fetch(`https://api.lirapaybr.com/v1/transactions/${transactionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-secret": process.env.LIRAPAY_API_SECRET || "",
      },
    })

    const data = await response.json()

    console.log("[v0] Status da transação:", data.status)

    return {
      success: true,
      status: data.status,
      transaction: data,
    }
  } catch (error) {
    console.error("[v0] Erro ao verificar status:", error)
    return {
      success: false,
      status: "ERROR",
    }
  }
}
