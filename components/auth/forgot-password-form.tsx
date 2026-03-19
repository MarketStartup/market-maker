'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"

type FormData = {
   email: string
}

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
   const [loading, setLoading] = useState(false)
   const [submitted, setSubmitted] = useState(false)

   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>({ defaultValues: { email: '' } })

   const onSubmit = async (data: FormData) => {
      setLoading(true)
      try {
         const res = await fetch('/api/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: data.email }),
         })
         const result = await res.json()
         if (result.status) {
            setSubmitted(true)
         } else {
            toast.error(result.message || 'Something went wrong', { duration: 4000 })
         }
      } catch {
         toast.error('Something went wrong. Please try again.')
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0">
               <div className="p-6 md:p-8">
                  <FieldGroup className="gap-5">
                     <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">Forgot password</h1>
                        <p className="text-muted-foreground text-sm text-balance">
                           {submitted
                              ? "Check your email for a temporary password."
                              : "Enter your email and we'll send you a temporary password."}
                        </p>
                     </div>

                     {!submitted && (
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                           <Field className="gap-2">
                              <FieldLabel htmlFor="email">Email</FieldLabel>
                              <Controller
                                 name="email"
                                 control={control}
                                 rules={{
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Please enter a valid email" },
                                 }}
                                 render={({ field }) => (
                                    <Input id="email" type="email" placeholder="m@example.com" {...field} />
                                 )}
                              />
                              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                           </Field>

                           <Field>
                              <Button type="submit" disabled={loading}>
                                 {loading ? "Sending..." : "Send temporary password"}
                              </Button>
                           </Field>
                        </form>
                     )}

                     <FieldDescription className="text-center">
                        <Link href="/login" className="underline-offset-2 hover:underline">Back to login</Link>
                     </FieldDescription>
                  </FieldGroup>
               </div>
            </CardContent>
         </Card>
      </div>
   )
}
