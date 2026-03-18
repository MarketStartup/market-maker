'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function PaymentConfirmationContent() {
  const params = useSearchParams()
  const course = params.get("course") ?? "—"
  const batch = params.get("batch") ?? "—"
  const amount = params.get("amount") ?? "—"
  const paymentId = params.get("paymentId") ?? "—"
  const email = params.get("email") ?? "—"

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader className="text-center pb-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-4"
              >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-10 w-10 text-white" />
                </div>
              </motion.div>
              <CardTitle className="text-2xl md:text-3xl text-green-600">Payment Successful!</CardTitle>
              <p className="text-muted-foreground mt-2">Thank you for your enrollment</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg">Order Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Course</span>
                    <span className="font-medium text-right max-w-[280px]">{course}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Batch</span>
                    <span className="font-medium text-right max-w-[280px]">{batch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="font-bold text-primary">
                      ₹{Number(amount).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction ID</span>
                    <span className="font-mono text-sm break-all text-right max-w-[280px]">{paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="text-right max-w-[280px] break-all">{email}</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <p className="text-sm">
                  A confirmation email has been sent to your registered email address.
                </p>
              </div>

              <Link href="/dashboard">
                <Button className="w-full gap-2">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function PaymentConfirmation() {
  return (
    <Suspense>
      <PaymentConfirmationContent />
    </Suspense>
  )
}
