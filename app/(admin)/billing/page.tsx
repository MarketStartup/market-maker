import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Download } from "lucide-react";

const invoices = [
   {
      id: "INV-001",
      date: "2024-11-15",
      amount: "$99.99",
      status: "Paid",
   },
   {
      id: "INV-002",
      date: "2024-10-15",
      amount: "$149.99",
      status: "Paid",
   },
   {
      id: "INV-003",
      date: "2024-09-15",
      amount: "$99.99",
      status: "Paid",
   },
]

export default function Billing() {
   return (
      <div className="bg-background">
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Billing & Subscriptions</h1>
            <p className="text-muted-foreground">Manage your subscriptions and payment methods</p>
         </div>

         <div className="space-y-6">
            {/* Invoice History */}
            <Card>
               <CardHeader>
                  <CardTitle>Invoice History</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-2">
                     <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium text-muted-foreground border-b border-border">
                        <div>Invoice ID</div>
                        <div>Date</div>
                        <div>Amount</div>
                        <div>Status</div>
                        <div>Action</div>
                     </div>
                     {invoices.map((invoice, idx) => (
                        <div
                           key={idx}
                           className="grid grid-cols-5 gap-4 p-4 items-center text-sm border-b border-border last:border-b-0 hover:bg-muted transition-colors"
                        >
                           <div className="font-medium text-foreground">{invoice.id}</div>
                           <div className="text-muted-foreground">{new Date(invoice.date).toLocaleDateString()}</div>
                           <div className="font-semibold text-foreground">{invoice.amount}</div>
                           <div>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                 {invoice.status}
                              </span>
                           </div>
                           <button className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors">
                              <Download className="w-4 h-4" />
                              <span>Download</span>
                           </button>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}
