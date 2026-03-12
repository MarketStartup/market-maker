"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { updateOrder } from "@/lib/api"

export async function updateOrderAction(
   orderId: number,
   status: string,
   razorpayPaymentId?: string,
   razorpayOrderId?: string
) {
   const session = await auth.api.getSession({ headers: await headers() })

   if (!session?.user) {
      throw new Error("Not authenticated")
   }

   return updateOrder(
      orderId,
      status,
      razorpayPaymentId,
      razorpayOrderId
   )
}
