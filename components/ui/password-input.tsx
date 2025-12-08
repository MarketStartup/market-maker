"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface PasswordInputProps
   extends React.InputHTMLAttributes<HTMLInputElement> { }

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
   ({ className, ...props }, ref) => {
      const [show, setShow] = React.useState(false)

      return (
         <div className="relative">
            <Input
               ref={ref}
               className={cn("pr-10 password-input", className)}
               type={show ? "text" : "password"}
               {...props}
            />
            <button
               type="button"
               onClick={() => setShow((s) => !s)}
               className="absolute right-3 top-1/2 -translate-y-1/2"
               aria-label={show ? "Hide password" : "Show password"}
            >
               {show ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
               ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
               )}
            </button>
         </div>
      )
   }
)

PasswordInput.displayName = "PasswordInput"
