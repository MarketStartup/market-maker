export interface OrderType {
   id: number;
   transactionId: string;
   razorpayPaymentId?: string;
   razorpayOrderId?: string
   amount: number;
   status: string;
   createdAt: string;
}