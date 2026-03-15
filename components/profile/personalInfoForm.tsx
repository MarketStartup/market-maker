'use client'

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Check, ChevronDown, ChevronsUpDown, Pencil, User, X } from "lucide-react"
import { stateData } from "@/lib/data/stateData"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const inputClass = "w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 transition-colors"
const readonlyClass = "w-full px-3 py-2.5 border border-border rounded-lg bg-muted text-muted-foreground text-sm cursor-not-allowed"

type UserProfile = {
   id: number
   firstName: string
   lastName: string
   dob: string
   state: string
   mobile: string
   email: string
}

type FormData = {
   firstName: string
   lastName: string
   dob: Date | undefined
   state: string
}

export function PersonalInfoForm({ user }: { user: UserProfile }) {
   const [isEditing, setIsEditing] = useState(false)
   const [isDobPopoverOpen, setIsDobPopoverOpen] = useState(false)
   const [statePopoverOpen, setStatePopoverOpen] = useState(false)

   const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
      defaultValues: {
         firstName: user.firstName,
         lastName: user.lastName,
         dob: user.dob ? new Date(user.dob) : undefined,
         state: user.state,
      },
   })

   const handleCancel = () => {
      reset()
      setIsEditing(false)
   }

   const onSubmit = async (data: FormData) => {
      try {
         const response = await fetch('/api/update-profile', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               userId: user.id,
               firstName: data.firstName,
               lastName: data.lastName,
               dob: data.dob ? data.dob.toISOString() : '',
               state: data.state,
            }),
         })
         const result = await response.json()
         if (result.status) {
            toast.success(result.message)
            setIsEditing(false)
         } else {
            toast.error(result.message)
         }
      } catch {
         toast.error('Something went wrong. Please try again.')
      }
   }

   return (
      <Card>
         <CardHeader className="flex flex-row items-start justify-between pb-4">
            <div>
               <CardTitle className="flex items-center gap-2 text-base mb-1">
                  <div className="p-1.5 rounded-md bg-primary/10">
                     <User className="w-4 h-4 text-primary" />
                  </div>
                  Personal Information
               </CardTitle>
               <CardDescription>Update your profile details</CardDescription>
            </div>
            {!isEditing ? (
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5"
               >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
               </Button>
            ) : (
               <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
               >
                  <X className="w-3.5 h-3.5" />
                  Cancel
               </Button>
            )}
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
               <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">First Name</label>
                  <input
                     type="text"
                     disabled={!isEditing}
                     className={isEditing ? inputClass : readonlyClass}
                     {...register('firstName', { required: 'First name is required' })}
                  />
                  {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>}
               </div>
               <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name</label>
                  <input
                     type="text"
                     disabled={!isEditing}
                     className={isEditing ? inputClass : readonlyClass}
                     {...register('lastName', { required: 'Last name is required' })}
                  />
                  {errors.lastName && <p className="text-destructive text-xs mt-1">{errors.lastName.message}</p>}
               </div>
               <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Date of Birth</label>
                  <Controller
                     name="dob"
                     control={control}
                     rules={{ required: 'Date of birth is required' }}
                     render={({ field }) => (
                        isEditing ? (
                           <Popover open={isDobPopoverOpen} onOpenChange={setIsDobPopoverOpen}>
                              <PopoverTrigger asChild>
                                 <Button variant="outline" className="w-full justify-between font-normal text-sm h-10">
                                    {field.value ? field.value.toLocaleDateString() : 'Select date'}
                                    <ChevronDown className="w-4 h-4 opacity-50" />
                                 </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                 <Calendar
                                    mode="single"
                                    selected={field.value}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                       field.onChange(date)
                                       setIsDobPopoverOpen(false)
                                    }}
                                 />
                              </PopoverContent>
                           </Popover>
                        ) : (
                           <input
                              type="text"
                              value={field.value ? field.value.toLocaleDateString() : ''}
                              disabled
                              className={readonlyClass}
                           />
                        )
                     )}
                  />
                  {errors.dob && <p className="text-destructive text-xs mt-1">{errors.dob.message}</p>}
               </div>
               <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">State</label>
                  <Controller
                     name="state"
                     control={control}
                     rules={{ required: 'State is required' }}
                     render={({ field }) => (
                        isEditing ? (
                           <Popover open={statePopoverOpen} onOpenChange={setStatePopoverOpen}>
                              <PopoverTrigger asChild>
                                 <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={statePopoverOpen}
                                    className="w-full justify-between font-normal text-sm h-10"
                                 >
                                    {field.value
                                       ? stateData.find((s) => s.value === field.value)?.label
                                       : 'Select State...'}
                                    <ChevronsUpDown className="w-4 h-4 opacity-50" />
                                 </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                 <Command>
                                    <CommandInput placeholder="Search state..." className="h-9" />
                                    <CommandList>
                                       <CommandEmpty>No state found.</CommandEmpty>
                                       <CommandGroup>
                                          {stateData.map((s) => (
                                             <CommandItem
                                                key={s.value}
                                                value={s.value}
                                                onSelect={(val) => {
                                                   field.onChange(val === field.value ? '' : val)
                                                   setStatePopoverOpen(false)
                                                }}
                                             >
                                                {s.label}
                                                <Check className={cn("ml-auto w-4 h-4", field.value === s.value ? "opacity-100" : "opacity-0")} />
                                             </CommandItem>
                                          ))}
                                       </CommandGroup>
                                    </CommandList>
                                 </Command>
                              </PopoverContent>
                           </Popover>
                        ) : (
                           <input
                              type="text"
                              value={stateData.find((s) => s.value === field.value)?.label ?? field.value}
                              disabled
                              className={readonlyClass}
                           />
                        )
                     )}
                  />
                  {errors.state && <p className="text-destructive text-xs mt-1">{errors.state.message}</p>}
               </div>
               <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Mobile Number</label>
                  <input type="tel" value={user.mobile} readOnly className={readonlyClass} />
                  <p className="text-xs text-muted-foreground mt-1">Contact support to change your mobile number</p>
               </div>
               <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <input type="email" value={user.email} readOnly className={readonlyClass} />
                  <p className="text-xs text-muted-foreground mt-1">Contact support to change your email</p>
               </div>
            </div>
            {isEditing && (
               <Button onClick={handleSubmit(onSubmit)} className="w-full mt-2" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
               </Button>
            )}
         </CardContent>
      </Card>
   )
}
