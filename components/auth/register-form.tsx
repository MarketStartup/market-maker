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
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from "@/components/ui/command"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { ChevronDown, ChevronsUpDown, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import { stateData } from "@/lib/data/stateData"
import { registerAction } from "@/actions/auth-actions"
import { useRouter } from "next/navigation";

type FormData = {
   firstName: string;
   lastName: string;
   state: string;
   dob: Date | undefined;
   email: string;
   password: string;
   confirmPassword: string;
};

export function RegisterForm({
   className,
   ...props
}: React.ComponentProps<"div">) {
   const router = useRouter();

   const { register, handleSubmit, control, watch, formState: { errors } } = useForm<FormData>();
   const [loading, setLoading] = useState(false);
   const [isDobPopoverOpen, setIsDobPopoverOpen] = useState(false);
   const [statePopoverOpen, setStatePopoverOpen] = useState(false)

   const password = watch("password");

   const onSubmit = async (data: FormData) => {
      setLoading(true);
      try {
         const result = await registerAction(data)
         if (result.status) {
            toast.success('User registered successfully')
            router.push('/login');
         } else {
            toast.error(result.message)
         }
      } catch (error) {
         console.error(error)
      } finally {
         setLoading(false)
      }
   };

   return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
               <div className="p-6 md:p-8">
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
                              {...register("firstName", { required: "First name is required" })}
                           />
                           {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                        </Field>
                        <Field className="gap-2">
                           <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                           <Input
                              id="last-name"
                              type="text"
                              placeholder="Doe"
                              {...register("lastName", { required: "Last name is required" })}
                           />
                           {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                        </Field>
                     </Field>
                     <Field className="grid grid-cols-2 gap-4">
                        <Field className="gap-2">
                           <FieldLabel htmlFor="state">State</FieldLabel>
                           <Controller
                              name="state"
                              control={control}
                              rules={{ required: "State is required" }}
                              render={({ field }) => (
                                 <Popover open={statePopoverOpen} onOpenChange={setStatePopoverOpen}>
                                    <PopoverTrigger asChild>
                                       <Button
                                          variant="outline"
                                          role="combobox"
                                          aria-expanded={statePopoverOpen}
                                          className="w-[200px] justify-between"
                                       >
                                          {field.value
                                             ? stateData.find((state) => state.value === field.value)?.label
                                             : "Select State..."}
                                          <ChevronsUpDown className="opacity-50" />
                                       </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                       <Command>
                                          <CommandInput placeholder="Search State..." className="h-9" />
                                          <CommandList>
                                             <CommandEmpty>No state found.</CommandEmpty>
                                             <CommandGroup>
                                                {stateData.map((state) => (
                                                   <CommandItem
                                                      key={state.value}
                                                      value={state.value}
                                                      onSelect={(currentValue) => {
                                                         field.onChange(currentValue === field.value ? "" : currentValue)
                                                         setStatePopoverOpen(false)
                                                      }}
                                                   >
                                                      {state.label}
                                                      <Check
                                                         className={cn(
                                                            "ml-auto",
                                                            field.value === state.value ? "opacity-100" : "opacity-0"
                                                         )}
                                                      />
                                                   </CommandItem>
                                                ))}
                                             </CommandGroup>
                                          </CommandList>
                                       </Command>
                                    </PopoverContent>
                                 </Popover>
                              )}
                           />
                           {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                        </Field>
                        <Field className="gap-2">
                           <FieldLabel htmlFor="dob">DOB</FieldLabel>
                           <Controller
                              name="dob"
                              control={control}
                              rules={{ required: "Date of birth is required" }}
                              render={({ field }) => (
                                 <Popover open={isDobPopoverOpen} onOpenChange={setIsDobPopoverOpen}>
                                    <PopoverTrigger asChild>
                                       <Button
                                          variant="outline"
                                          id="date"
                                          className="w-full justify-between font-normal"
                                       >
                                          {field.value ? field.value.toLocaleDateString() : "Select date"}
                                          <ChevronDown />
                                       </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                       <Calendar
                                          mode="single"
                                          selected={field.value}
                                          captionLayout="dropdown"
                                          onSelect={(date) => {
                                             field.onChange(date);
                                             setIsDobPopoverOpen(false);
                                          }}
                                          initialFocus
                                       />
                                    </PopoverContent>
                                 </Popover>
                              )}
                           />
                           {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
                        </Field>
                     </Field>
                     <Field className="gap-2">
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                           id="email"
                           type="email"
                           placeholder="m@example.com"
                           {...register("email", {
                              required: "Email is required",
                              pattern: {
                                 value: /^\S+@\S+$/i,
                                 message: "Please enter a valid email address"
                              }
                           })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                     </Field>
                     <Field className="grid grid-cols-2 gap-4">
                        <Field className="gap-2">
                           <FieldLabel htmlFor="password">Password</FieldLabel>
                           <Input
                              id="password"
                              type="password"
                              {...register("password", {
                                 required: "Password is required",
                                 minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                 }
                              })}
                           />
                           {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </Field>
                        <Field className="gap-2">
                           <FieldLabel htmlFor="confirm-password">
                              Confirm Password
                           </FieldLabel>
                           <Input
                              id="confirm-password"
                              type="password"
                              {...register("confirmPassword", {
                                 required: "Please confirm your password",
                                 validate: (value) => value === password || "Passwords do not match"
                              })}
                           />
                           {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                        </Field>
                     </Field>
                     <Field>
                        <Button
                           type="submit"
                           onClick={handleSubmit(onSubmit)}
                           disabled={loading}
                        >
                           {loading ? "Loading..." : " Create Account"}
                        </Button>
                     </Field>
                     <FieldDescription className="text-center">
                        Already have an account? <Link href="/login">Sign in</Link>
                     </FieldDescription>
                  </FieldGroup>
               </div>
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