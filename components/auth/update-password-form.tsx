'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
   Field,
   FieldDescription,
   FieldGroup,
   FieldLabel,
} from "@/components/ui/field"
import { PasswordInput } from "@/components/ui/password-input"
import { toast } from "sonner"
import { useForm } from "react-hook-form"

type FormData = {
   newPassword: string
   confirmPassword: string
}

export function UpdatePasswordForm() {
   const { data: session, update } = useSession()
   const router = useRouter()
   const [loading, setLoading] = useState(false)
   const [waitingForSession, setWaitingForSession] = useState(false)

   // Navigate only after the JWT cookie actually reflects the updated value
   useEffect(() => {
      if (waitingForSession && session?.user?.hasChangedInitialPassword === true) {
         router.push('/dashboard')
      }
   }, [session?.user?.hasChangedInitialPassword, waitingForSession, router])

   const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()
   const newPassword = watch("newPassword")

   const onSubmit = async (data: FormData) => {
      setLoading(true)
      try {
         const res = await fetch('/api/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: session?.user?.id, email: session?.user?.email, newPassword: data.newPassword, hasChangedInitialPassword: false }),
         })

         const result = await res.json()
         if (result.status) {
            toast.success('Password updated successfully!')
            setWaitingForSession(true)
            await update({ hasChangedInitialPassword: true })
         } else {
            toast.error(result.message)
         }
      } catch {
         toast.error('Something went wrong. Please try again.')
      } finally {
         setLoading(false)
      }
   }

   return (
      <Card className="overflow-hidden p-0">
         <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)}>
               <FieldGroup className="gap-5">
                  <div className="flex flex-col items-center gap-2 text-center">
                     <h1 className="text-2xl font-bold">Set Your Password</h1>
                     <p className="text-muted-foreground text-sm text-balance">
                        Welcome! Please set a new password for your account before continuing.
                     </p>
                  </div>

                  <Field className="gap-2">
                     <FieldLabel htmlFor="new-password">New Password</FieldLabel>
                     <PasswordInput
                        id="new-password"
                        placeholder="Min. 8 characters"
                        {...register("newPassword", {
                           required: "New password is required",
                           minLength: { value: 8, message: "Password must be at least 8 characters" },
                        })}
                     />
                     {errors.newPassword && (
                        <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
                     )}
                  </Field>

                  <Field className="gap-2">
                     <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                     <PasswordInput
                        id="confirm-password"
                        placeholder="Repeat new password"
                        {...register("confirmPassword", {
                           required: "Please confirm your password",
                           validate: (value) => value === newPassword || "Passwords do not match",
                        })}
                     />
                     {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                     )}
                  </Field>

                  <Field>
                     <Button type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Set Password & Continue"}
                     </Button>
                  </Field>
               </FieldGroup>
            </form>
         </CardContent>
      </Card>
   )
}
