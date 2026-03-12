import { NextResponse } from "next/server"
import crypto from "crypto"
import { auth } from "@/lib/auth"
import { updateOrder, enrollUserInBatch } from "@/lib/api"
import { TransactionStatusConstant } from "@/lib/constants"

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    batch,
    orderId,
    amount
  } = await req.json()

  try {
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

    const createOrderInCms = await updateOrder(orderId, TransactionStatusConstant.SUCCESS, razorpay_payment_id, razorpay_order_id)
    if (!createOrderInCms.status) {
      const createOrderInCms = await updateOrder(
        orderId,
        TransactionStatusConstant.FAILED,
        razorpay_payment_id,
        razorpay_order_id,
        `Razorpay verify error: Payment Success but failed to update order in CMS: ${orderId}`
      );
    }
    const enrollUser = await enrollUserInBatch(batch, (session.user as any).externalId, amount);
    // TODO: handle order update failure 

    return NextResponse.json(
      { message: "Payment verified and enrollment created" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Razorpay verify error:", error)
    const createOrderInCms = await updateOrder(
      orderId,
      TransactionStatusConstant.FAILED,
      razorpay_payment_id,
      razorpay_order_id,
      `Razorpay verify error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );

    return NextResponse.json(
      { message: "Failed to verify payment" },
      { status: 500 },
    )
  }
}
