'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Download, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const PaymentConfirmation = () => {
 

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
                    <span className="font-medium text-right max-w-[200px]">Course Title</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Instructor</span>
                    <span>Instructor name</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="font-bold text-primary">₹ 123</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction ID</span>
                    <span className="font-mono text-sm">TXN13456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  {/* {user && ( */}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span>john@gmail.com</span>
                    </div>
                  {/* )} */}
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <p className="text-sm">
                  A confirmation email has been sent to your registered email address.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Download Receipt
                </Button>
                <Link href="/my-courses" className="flex-1">
                  <Button className="w-full gap-2">
                    Start Learning
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
