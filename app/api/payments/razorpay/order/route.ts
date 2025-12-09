import { NextResponse } from "next/server"
import Razorpay from "razorpay"
import { auth } from "@/auth"
// import { getBatchById } from "@/lib/api" // if you want to fetch price from backend

const razorpay = new Razorpay({
   key_id: process.env.RAZORPAY_KEY_ID!,
   key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: Request) {
   try {
      // Ensure user is logged in
      const session = await auth()
      if (!session?.user) {
         return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      }

      const { batchId, amount } = await req.json() as {
         batchId: string
         amount: number // in rupees, e.g. 4999
      }

      // Ideally: fetch batch by id and take price from DB instead of trusting client
      // const batch = await getBatchById(batchId)
      // const amountInPaise = batch.price * 100

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
