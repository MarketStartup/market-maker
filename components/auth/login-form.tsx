'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
   Field,
   FieldDescription,
   FieldGroup,
   FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { signIn } from "next-auth/react"

type FormData = {
   email: string
   password: string
}

export function LoginForm({
   className,
   ...props
}: React.ComponentProps<"div">) {
   const router = useRouter()
   const [loading, setLoading] = useState(false)

   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>({
      defaultValues: {
         email: "",
         password: "",
      },
   })

   const onSubmit = async (data: FormData) => {
      setLoading(true);
      try {
         const res = await signIn("credentials", {
            redirect: false,        // we control redirect manually
            email: data.email,
            password: data.password,
         });

         if (res?.error) {
            toast.error("Invalid email or password");
         } else {
            toast.success("Logged in successfully");
            router.push('/dashboard')
         }
      } catch (err: any) {
         console.error("login error", err);
         toast.error(err?.message || "Login failed");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0">
               <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
                  <FieldGroup className="gap-5">
                     <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">Welcome back</h1>
                        <p className="text-muted-foreground text-sm text-balance">
                           Login to your account
                        </p>
                     </div>

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
                              <Input
                                 id="email"
                                 type="email"
                                 placeholder="m@example.com"
                                 {...field}
                              />
                           )}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                     </Field>

                     <Field className="gap-2">
                        <div className="flex items-center">
                           <FieldLabel htmlFor="password">Password</FieldLabel>
                           <a
                              href="#"
                              className="ml-auto text-sm text-gray-500 underline-offset-2 hover:underline"
                           >
                              Forgot your password?
                           </a>
                        </div>
                        <Controller
                           name="password"
                           control={control}
                           rules={{
                              required: "Password is required",
                              minLength: { value: 6, message: "Password must be at least 6 characters" },
                           }}
                           render={({ field }) => (
                              <Input id="password" type="password" {...field} />
                           )}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                     </Field>

                     <Field>
                        <Button type="submit" disabled={loading}>
                           {loading ? "Logging in..." : "Login"}
                        </Button>
                     </Field>

                     <FieldDescription className="text-center">
                        Don't have an account? <Link href="/register">Sign up</Link>
                     </FieldDescription>
                  </FieldGroup>
               </form>
            </CardContent>
         </Card>

         <FieldDescription className=" text-center">
            By clicking continue, you agree to our <a href="/privacy-policy">Privacy Policy</a>.
         </FieldDescription>
      </div>
   )
}
