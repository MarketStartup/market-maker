import { NextResponse } from "next/server"
import Razorpay from "razorpay"
import { auth } from "@/lib/auth"
import { createOrder } from "@/lib/api"
import { generateOrderNumber } from "@/lib/utils"
// import { getBatchById } from "@/lib/api" // if you want to fetch price from backend

const razorpay = new Razorpay({
   key_id: process.env.RAZORPAY_KEY_ID!,
   key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: Request) {
   try {
      // Ensure user is logged in
      const session = await auth.api.getSession({ headers: req.headers })
      const externalId = (session?.user as any)?.externalId
      if (!session?.user || !externalId) {
         return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      }

      const { batchId, amount } = await req.json() as {
         batchId: string
         amount: number // in rupees, e.g. 4999
      }

      const transactionId = generateOrderNumber();
      const createOrderInCms = await createOrder(externalId, parseInt(batchId), transactionId, amount)
      if (!createOrderInCms.status) {
         return NextResponse.json({ message: "Error in creating error" }, { status: 401 })
      }

      const amountInPaise = amount * 100

      const order = await razorpay.orders.create({
         amount: amountInPaise,
         currency: "INR",
         receipt: `order_rcpt_${batchId}_${Date.now()}`,
         notes: {
            batchId,
            userEmail: session.user.email as string,
         },
      })

      return NextResponse.json(
         {
            order,
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            orderId: createOrderInCms.orderId
         },
         { status: 200 },
      )
   } catch (error) {
      console.error("Razorpay order error:", error)
      return NextResponse.json(
         { message: "Failed to create order" },
         { status: 500 },
      )
   }
}
