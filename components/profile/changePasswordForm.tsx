'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react"
import { toast } from "sonner"

const inputClass = "w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors pr-10"

type Props = {
   userId: number
   email: string
}

type PasswordFields = 'currentPassword' | 'newPassword' | 'confirmPassword'

export function ChangePasswordForm({ userId, email }: Props) {
   const { update } = useSession()
   const [formData, setFormData] = useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
   })
   const [showPassword, setShowPassword] = useState<Record<PasswordFields, boolean>>({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
   })
   const [error, setError] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
      setError('')
   }

   const toggleVisibility = (field: PasswordFields) => {
      setShowPassword(prev => ({ ...prev, [field]: !prev[field] }))
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setError('')

      if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
         setError('All fields are required')
         return
      }

      if (formData.newPassword.length < 8) {
         setError('New password must be at least 8 characters')
         return
      }

      if (formData.newPassword !== formData.confirmPassword) {
         setError('New passwords do not match')
         return
      }

      setIsLoading(true)
      try {
         const response = await fetch('/api/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               userId,
               email,
               currentPassword: formData.currentPassword,
               newPassword: formData.newPassword,
            }),
         })

         const data = await response.json()
         if (data.status) {
            await update({ hasChangedInitialPassword: true })
            toast.success(data.message)
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
         } else {
            setError(data.message)
         }
      } catch {
         setError('Something went wrong. Please try again.')
      } finally {
         setIsLoading(false)
      }
   }

   const fields: { key: PasswordFields; label: string; placeholder: string }[] = [
      { key: 'currentPassword', label: 'Current Password', placeholder: 'Enter current password' },
      { key: 'newPassword', label: 'New Password', placeholder: 'Min. 8 characters' },
      { key: 'confirmPassword', label: 'Confirm New Password', placeholder: 'Repeat new password' },
   ]

   return (
      <Card>
         <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base mb-1">
               <div className="p-1.5 rounded-md bg-primary/10">
                  <Lock className="w-4 h-4 text-primary" />
               </div>
               Security
            </CardTitle>
            <CardDescription>Update your password to keep your account secure</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ key, label, placeholder }) => (
               <div key={key}>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
                  <div className="relative">
                     <input
                        type={showPassword[key] ? 'text' : 'password'}
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder={placeholder}
                     />
                     <button
                        type="button"
                        onClick={() => toggleVisibility(key)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                     >
                        {showPassword[key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                     </button>
                  </div>
               </div>
            ))}

            {error && (
               <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  {error}
               </div>
            )}

            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
               {isLoading ? 'Updating...' : 'Update Password'}
            </Button>
            </form>
         </CardContent>
      </Card>
   )
}
