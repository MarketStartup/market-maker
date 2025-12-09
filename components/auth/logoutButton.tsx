"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
   DialogFooter,
} from "@/components/ui/dialog"

export function LogoutButton() {
   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false)

   const handleLogout = async () => {
      setLoading(true)
      toast.success("Logged out successfully!")

      await signOut({
         callbackUrl: "/login",
         redirect: true,
      })

      setLoading(false)
   }

   return (
      <>
         {/* Trigger Button */}
         <button
            onClick={() => setOpen(true)}
            className="flex w-full items-center px-2 py-1.5 font-medium hover:bg-accent rounded-md transition"
         >
            <LogOut color="red" className="mr-2 size-4" />
            Log out
         </button>

         {/* Confirmation Dialog */}
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                     You will be logged out of your account.
                  </DialogDescription>
               </DialogHeader>

               <DialogFooter className="flex justify-end gap-3">
                  <Button
                     variant="outline"
                     onClick={() => setOpen(false)}
                     disabled={loading}
                  >
                     Cancel
                  </Button>

                  <Button
                     variant="destructive"
                     onClick={handleLogout}
                     disabled={loading}
                  >
                     {loading ? "Logging out..." : "Logout"}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   )
}
