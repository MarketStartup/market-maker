'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import { toast } from "sonner"

const inputClass = "w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"

type Props = {
   userId: number
   email: string
}

export function ChangePasswordForm({ userId, email }: Props) {
   const [formData, setFormData] = useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
   })
   const [error, setError] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
      setError('')
   }

   const handleSubmit = async () => {
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

   return (
      <Card>
         <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary mb-1">
               <Lock className="w-4 h-4" />
               Security
            </CardTitle>
            <CardDescription>Update your password and security settings</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            <div>
               <label className="text-sm font-medium text-foreground mb-2 block">Current Password</label>
               <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="••••••••"
               />
            </div>
            <div>
               <label className="text-sm font-medium text-foreground mb-2 block">New Password</label>
               <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="••••••••"
               />
            </div>
            <div>
               <label className="text-sm font-medium text-foreground mb-2 block">Confirm Password</label>
               <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="••••••••"
               />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
               {isLoading ? 'Updating...' : 'Update Password'}
            </Button>
         </CardContent>
      </Card>
   )
}
