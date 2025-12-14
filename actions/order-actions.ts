"use server"

import { auth } from "@/auth"
import { updateOrder } from "@/lib/api"

export async function updateOrderAction(
   orderId: number,
   status: string,
   razorpayPaymentId?: string,
   razorpayOrderId?: string
) {
   const session = await auth()

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
