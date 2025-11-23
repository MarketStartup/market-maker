'use client'

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import {
   Field,
   FieldDescription,
   FieldGroup,
   FieldLabel,
} from "@/components/ui/field"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { ChevronDownIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function RegisterForm({
   className,
   ...props
}: React.ComponentProps<"div">) {
   const [open, setOpen] = useState(false)
   const [date, setDate] = useState<Date | undefined>(undefined)

   return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
               <form className="p-6 md:p-8">
                  <FieldGroup className="gap-5">
                     <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">Create your account</h1>
                        <p className="text-muted-foreground text-sm text-balance">
                           Enter your details below to create your account
                        </p>
                     </div>
                     <Field className="grid grid-cols-2 gap-4">
                        <Field className="gap-2">
                           <FieldLabel htmlFor="first-name">First name</FieldLabel>
                           <Input
                              id="first-name"
                              type="text"
                              placeholder="John"
                              required
                           />
                        </Field>
                        <Field className="gap-2">
                           <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                           <Input
                              id="last-name"
                              type="text"
                              placeholder="Doe"
                              required
                           />
                        </Field>
                     </Field>
                     <Field className="grid grid-cols-2 gap-4">
                        <Field className="gap-2">
                           <FieldLabel htmlFor="state">State</FieldLabel>
                           <Input
                              id="state"
                              type="text"
                              placeholder="John"
                              required
                           />
                        </Field>
                        <Field className="gap-2">
                           <FieldLabel htmlFor="dob">DOB</FieldLabel>
                           <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                 <Button
                                    variant="outline"
                                    id="date"
                                    className="w-48 justify-between font-normal"
                                 >
                                    {date ? date.toLocaleDateString() : "Select date"}
                                    <ChevronDownIcon />
                                 </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                 <Calendar
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                       setDate(date)
                                       setOpen(false)
                                    }}
                                 />
                              </PopoverContent>
                           </Popover>
                        </Field>
                     </Field>
                     <Field className="gap-2">
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                           id="email"
                           type="email"
                           placeholder="m@example.com"
                           required
                        />
                     </Field>
                     <Field className="grid grid-cols-2 gap-4">
                        <Field className="gap-2">
                           <FieldLabel htmlFor="password">Password</FieldLabel>
                           <Input id="password" type="password" required />
                        </Field>
                        <Field className="gap-2">
                           <FieldLabel htmlFor="confirm-password">
                              Confirm Password
                           </FieldLabel>
                           <Input id="confirm-password" type="password" required />
                        </Field>
                     </Field>
                     <Field>
                        <Button type="submit">Create Account</Button>
                     </Field>
                     <FieldDescription className="text-center">
                        Already have an account? <Link href="/login">Sign in</Link>
                     </FieldDescription>
                  </FieldGroup>
               </form>
               <div className="bg-muted relative hidden md:block">
                  <Image
                     src="https://ui.shadcn.com/placeholder.svg"
                     alt="Image"
                     width={500}
                     height={500}
                     className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                  />
               </div>
            </CardContent>
         </Card>
         <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
            and <a href="#">Privacy Policy</a>.
         </FieldDescription>
      </div>
   )
}
