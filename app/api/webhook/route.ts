import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[v0] Webhook recebido:", body)

    // Here you would:
    // 1. Validate the webhook signature
    // 2. Update your database with the payment status
    // 3. Send confirmation email to customer if status is AUTHORIZED
    // 4. Grant access to the course content

    const { id, external_id, status, total_amount, payment_method } = body

    if (status === "AUTHORIZED") {
      console.log("[v0] Pagamento aprovado:", { id, external_id, total_amount })
      // TODO: Grant access to course, send email, etc.
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] Erro no webhook:", error)
    return NextResponse.json({ error: "Webhook error" }, { status: 500 })
  }
}
