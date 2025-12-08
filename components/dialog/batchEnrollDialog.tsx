"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Calendar, Clock, Users } from "lucide-react"

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
import type { CourseBatchType } from "@/models/courseType"

type BatchEnrollDialogProps = {
   batches: CourseBatchType[]
}

export function BatchEnrollDialog({ batches }: BatchEnrollDialogProps) {
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

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!selectedBatch) return

      console.log({ selectedBatch })
      console.log({ batches })
      // 👉 TODO: call your enroll API / navigate
      const SelectedBatchData = batches.find(b => b.id === selectedBatch)
      console.log("Enrolling in batch:", SelectedBatchData)

      setOpen(false)
   }

   const triggerButton =
      sessionStatus === "loading" ? (
         <Skeleton className="h-14 w-full" />
      ) : (
         <Button
            className="w-full bg-primary text-primary-foreground hover:opacity-90 py-7 text-base font-semibold shadow-md hover:shadow-lg transition-shadow"
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
         <div className="flex flex-col gap-4 my-6">
            {batches.map((batch) => (
               <div
                  key={batch.id}
                  onClick={() => onSelectBatch(batch.id)}
                  className={cn(
                     "relative p-4 rounded-lg border-2 cursor-pointer transition-all",
                     selectedBatch === batch.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 bg-card"
                  )}
               >
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
               </div>
            ))}
         </div>

         <Button type="submit" disabled={!selectedBatch}>
            Continue to payment
         </Button>
      </form>
   )
}
