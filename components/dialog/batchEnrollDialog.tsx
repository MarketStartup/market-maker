"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock, Users } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

import { cn, formatDate } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
} from "@/components/ui/drawer"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import type { CourseBatchType, CourseType } from "@/models/courseType"
import { useSession } from "next-auth/react"

function loadRazorpayScript(): Promise<boolean> {
   return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
         return resolve(true)
      }

      const script = document.createElement("script")
      script.id = "razorpay-script"
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
   })
}

export function BatchEnrollDialog({ course, batches }: { course: CourseType, batches: CourseBatchType[] }) {
   const { data: session, status: sessionStatus } = useSession()
   const router = useRouter()

   const [open, setOpen] = useState(false)
   const [selectedBatch, setSelectedBatch] = useState<string | null>(null)
   const isDesktop = useMediaQuery("(min-width: 426px)")

   const handleEnrollClick = () => {
      if (!session?.user) {
         router.push("/login")
         return
      }
      setOpen(true)
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!selectedBatch) return

      const SelectedBatchData = batches.find((b) => b.id === selectedBatch)
      if (!SelectedBatchData) return
      console.log({ SelectedBatchData })
      // 1) Ensure Razorpay script is loaded
      const ok = await loadRazorpayScript()
      if (!ok) {
         toast.error("Razorpay SDK failed to load. Please try again.")
         return
      }

      try {
         // 2) Create order on your backend
         const orderRes = await fetch("/api/payments/razorpay/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               batchId: SelectedBatchData.id,
               amount: course.price, // assuming price is in rupees
            }),
         })

         if (!orderRes.ok) {
            toast.error("Failed to start payment. Please try again.")
            return
         }

         const { order, key } = await orderRes.json()

         // 3) Open Razorpay checkout
         const options: any = {
            key,
            amount: order.amount, // in paise
            currency: order.currency,
            name: "Market Makers",
            description: SelectedBatchData.name,
            order_id: order.id,
            prefill: {
               name: session?.user?.firstName ?? "",
               email: session?.user?.email ?? "",
               contact: (session?.user as any)?.mobile ?? "",
            },
            theme: {
               color: "#0073D8",
            },
            handler: async function (response: any) {
               // 4) Verify payment on backend
               const verifyRes = await fetch("/api/payments/razorpay/verify", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                     razorpay_payment_id: response.razorpay_payment_id,
                     razorpay_order_id: response.razorpay_order_id,
                     razorpay_signature: response.razorpay_signature,
                     batchId: SelectedBatchData.id,
                  }),
               })

               if (verifyRes.ok) {
                  toast.success("Payment successful! You are enrolled.")
                  router.push("/dashboard") // or a dedicated success page
               } else {
                  toast.error("Payment verification failed. Please contact support.")
               }
            },
            modal: {
               ondismiss: () => {
                  // Optional: track abandoned payments
               },
            },
         }

         const rzp = new (window as any).Razorpay(options)
         rzp.open()
      } catch (err) {
         console.error("Razorpay error", err)
         toast.error("Something went wrong while processing payment.")
      } finally {
         setOpen(false)
      }
   }

   const triggerButton =
      sessionStatus === "loading" ? (
         <Skeleton className="h-14 w-full" />
      ) : (
         <Button
            className={cn(
               "w-full bg-primary text-primary-foreground py-7 text-base font-semibold shadow-md  transition-shadow",
               "hover:opacity-90 hover:shadow-lg hover:cursor-pointer")}
            onClick={handleEnrollClick}
         >
            Enroll Now
         </Button>
      )

   if (isDesktop) {
      return (
         <>
            {triggerButton}

            <Dialog open={open} onOpenChange={setOpen}>
               <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                     <DialogTitle>Select Batch</DialogTitle>
                     <DialogDescription>
                        Choose a batch you&apos;d like to enroll in.
                     </DialogDescription>
                  </DialogHeader>

                  <BatchSelectionForm
                     onSubmit={handleSubmit}
                     batches={batches}
                     selectedBatch={selectedBatch}
                     onSelectBatch={setSelectedBatch}
                  />
               </DialogContent>
            </Dialog>
         </>
      )
   }

   return (
      <>
         {triggerButton}

         <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
               <DrawerHeader className="text-left">
                  <DrawerTitle>Select Batch</DrawerTitle>
                  <DrawerDescription>
                     Choose a batch you&apos;d like to enroll in.
                  </DrawerDescription>
               </DrawerHeader>

               <BatchSelectionForm
                  className="px-4"
                  onSubmit={handleSubmit}
                  batches={batches}
                  selectedBatch={selectedBatch}
                  onSelectBatch={setSelectedBatch}
               />

               <DrawerFooter className="pt-2">
                  <DrawerClose asChild>
                     <Button variant="outline">Cancel</Button>
                  </DrawerClose>
               </DrawerFooter>
            </DrawerContent>
         </Drawer>
      </>
   )
}

type BatchSelectionFormProps = React.ComponentProps<"form"> & {
   batches: CourseBatchType[]
   selectedBatch: string | null
   onSelectBatch: (id: string) => void
}

function BatchSelectionForm({
   className,
   batches,
   selectedBatch,
   onSelectBatch,
   ...formProps
}: BatchSelectionFormProps) {
   return (
      <form className={cn("grid items-start gap-6", className)} {...formProps}>
         <RadioGroup
            className="flex flex-col gap-4 my-6"
            value={selectedBatch ?? ""}
            onValueChange={onSelectBatch}
         >
            {batches.map((batch) => {
               const id = `batch-${batch.id}`

               return (
                  <Label
                     key={batch.id}
                     htmlFor={id}
                     className={cn(
                        "relative block p-4 rounded-lg border-2 cursor-pointer transition-all bg-card border-border hover:border-primary/50",
                        selectedBatch === batch.id && "border-primary bg-primary/5"
                     )}
                  >
                     {/* Real radio input (visually hidden) */}
                     <RadioGroupItem
                        id={id}
                        value={batch.id}
                        className="sr-only"
                     />

                     {/* ✅ Tick when selected */}
                     {selectedBatch === batch.id && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                           <span className="text-sm font-bold">✓</span>
                        </div>
                     )}

                     <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1">
                           <h3 className="font-semibold text-primary text-lg">
                              {batch.name}
                              <span className="text-sm text-foreground"> (3 weeks)</span>
                           </h3>
                        </div>
                     </div>

                     <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                           <Calendar className="w-4 h-4" />
                           <span>
                              {formatDate(batch.startDate)} to {formatDate(batch.endDate)}
                           </span>
                        </div>
                     </div>
                  </Label>
               )
            })}
         </RadioGroup>

         <Button type="submit" disabled={!selectedBatch}>
            Continue to payment
         </Button>
      </form>
   )
}