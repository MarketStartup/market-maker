import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import { getOrderData } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export default async function Billing() {
   const session = await auth();
   if (!session)
      redirect('/login');

   const orders = await getOrderData(session.user.id);

   return (
      <div className="bg-background">
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Billing & Subscriptions</h1>
            <p className="text-muted-foreground">Manage your subscriptions and payment methods</p>
         </div>

         {orders && orders.length > 0 ?
            (
               <div className="space-y-6">
                  {/* Invoice History */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Invoice History</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-2">
                           <div className="grid grid-cols-4 gap-4 p-4 text-sm font-medium text-muted-foreground border-b border-border">
                              <div>Invoice ID</div>
                              <div>Date</div>
                              <div>Amount</div>
                              <div>Status</div>
                              {/* <div>Action</div> */}
                           </div>
                           {orders.map((order, idx) => (
                              <div
                                 key={idx}
                                 className="grid grid-cols-4 gap-4 p-4 items-center text-sm border-b border-border last:border-b-0 hover:bg-muted transition-colors"
                              >
                                 <div className="font-medium text-foreground">{order.transactionId}</div>
                                 <div className="text-muted-foreground">{formatDate(order.createdAt)}</div>
                                 <div className="font-semibold text-foreground">₹{parseFloat(order.amount.toFixed(2)).toLocaleString('en-IN')}</div>
                                 <div>
                                    <span className={cn(
                                       "text-xs px-2 py-1 rounded-full",
                                       order.status === 'success' && "bg-green-100 text-green-800",
                                       order.status === 'pending' && "bg-yellow-100 text-yellow-800",
                                       order.status === 'cancelled' && "bg-red-100 text-red-800",
                                       order.status === 'failed' && "bg-red-100 text-red-800",
                                       !['success', 'pending', 'cancelled', 'failed'].includes(order.status) && "bg-gray-100 text-gray-800"
                                    )}>
                                       {order.status}
                                    </span>
                                 </div>
                                 {/* <button className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors">
                                    <Download className="w-4 h-4" />
                                    <span>Download</span>
                                 </button> */}
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </div>
            ) :
            (
               <div className="text-center py-20 bg-muted rounded-lg">
                  <h2 className="text-2xl font-bold text-foreground mb-4">No courses yet</h2>
                  <p className="text-muted-foreground mb-8">Start learning by exploring our collection of courses</p>
                  <Link href="/courses">
                     <Button className="bg-primary text-primary-foreground hover:opacity-90 inline-flex items-center gap-2">
                        Explore Courses
                        <ArrowRight className="w-4 h-4" />
                     </Button>
                  </Link>
               </div>
            )
         }
      </div>
   )
}
