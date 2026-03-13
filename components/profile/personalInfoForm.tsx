'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ChevronsUpDown, User } from "lucide-react"
import { stateData } from "@/lib/data/stateData"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"

type Props = {
   firstName: string
   lastName: string
   dob: string
   state: string
   mobile: string
   email: string
}

export function PersonalInfoForm({ firstName, lastName, dob, state, mobile, email }: Props) {
   const [isEditing, setIsEditing] = useState(false)
   const [statePopoverOpen, setStatePopoverOpen] = useState(false)
   const [formData, setFormData] = useState({ firstName, lastName, dob, state })

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
   }

   const handleSave = () => {
      // TODO: Save profile data to backend
      setIsEditing(false)
   }

   const inputClass = "w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground disabled:opacity-50"
   const readonlyClass = "w-full px-3 py-2 border border-border rounded-lg bg-muted text-muted-foreground cursor-not-allowed"

   return (
      <Card>
         <CardHeader className="flex flex-row items-center justify-between">
            <div>
               <CardTitle className="flex items-center gap-2 text-primary mb-1">
                  <User className="w-4 h-4" />
                  Personal Information
               </CardTitle>
               <CardDescription>Update your profile details</CardDescription>
            </div>
            <Button variant={isEditing ? 'default' : 'outline'} onClick={() => setIsEditing(!isEditing)}>
               {isEditing ? 'Cancel' : 'Edit'}
            </Button>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
               <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">First Name</label>
                  <input
                     type="text"
                     name="firstName"
                     value={formData.firstName}
                     onChange={handleChange}
                     disabled={!isEditing}
                     className={inputClass}
                  />
               </div>
               <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Last Name</label>
                  <input
                     type="text"
                     name="lastName"
                     value={formData.lastName}
                     onChange={handleChange}
                     disabled={!isEditing}
                     className={inputClass}
                  />
               </div>
               <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Date of Birth</label>
                  <input
                     type="date"
                     name="dob"
                     value={formData.dob ? formData.dob.split('T')[0] : ''}
                     onChange={handleChange}
                     disabled={!isEditing}
                     className={inputClass}
                  />
               </div>
               <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">State</label>
                  {isEditing ? (
                     <Popover open={statePopoverOpen} onOpenChange={setStatePopoverOpen}>
                        <PopoverTrigger asChild>
                           <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={statePopoverOpen}
                              className="w-full justify-between font-normal"
                           >
                              {formData.state
                                 ? stateData.find((s) => s.value === formData.state)?.label
                                 : "Select State..."}
                              <ChevronsUpDown className="opacity-50" />
                           </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                           <Command>
                              <CommandInput placeholder="Search State..." className="h-9" />
                              <CommandList>
                                 <CommandEmpty>No state found.</CommandEmpty>
                                 <CommandGroup>
                                    {stateData.map((s) => (
                                       <CommandItem
                                          key={s.value}
                                          value={s.value}
                                          onSelect={(val) => {
                                             setFormData(prev => ({ ...prev, state: val === prev.state ? '' : val }))
                                             setStatePopoverOpen(false)
                                          }}
                                       >
                                          {s.label}
                                          <Check className={cn("ml-auto", formData.state === s.value ? "opacity-100" : "opacity-0")} />
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
                        value={formData.state}
                        disabled
                        className={inputClass}
                     />
                  )}
               </div>
               <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Mobile Number</label>
                  <input
                     type="tel"
                     value={mobile}
                     readOnly
                     className={readonlyClass}
                  />
               </div>
               <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <input
                     type="email"
                     value={email}
                     readOnly
                     className={readonlyClass}
                  />
               </div>
            </div>
            {isEditing && (
               <Button onClick={handleSave} className="w-full">
                  Save Changes
               </Button>
            )}
         </CardContent>
      </Card>
   )
}
