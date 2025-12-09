import { NextResponse } from "next/server"
import crypto from "crypto"
import { auth } from "@/auth"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      batchId,
    } = await req.json()

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex")

    const isValid = expectedSignature === razorpay_signature

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid payment signature" },
        { status: 400 },
      )
    }

    // TODO: mark enrollment as paid in DB here
    // await enrollUserInBatch({ userId: session.user.id, batchId, razorpay_order_id, razorpay_payment_id })

    return NextResponse.json(
      { message: "Payment verified and enrollment created" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Razorpay verify error:", error)
    return NextResponse.json(
      { message: "Failed to verify payment" },
      { status: 500 },
    )
  }
}
