'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
   const { data: session } = useSession()
   const [isEditing, setIsEditing] = useState(false)
   const [formData, setFormData] = useState({
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      phone: '+1 (555) 000-0000',
      bio: 'Software engineer passionate about learning new technologies.',
      location: 'San Francisco, CA',
   })

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
   }

   const handleSave = () => {
      // TODO: Save profile data to backend
      setIsEditing(false)
   }

   return (
      <div className="bg-background">
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
         </div>

         <div className="space-y-6">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                     <CardTitle>Personal Information</CardTitle>
                     <CardDescription>Update your profile details</CardDescription>
                  </div>
                  <Button variant={isEditing ? 'default' : 'outline'} onClick={() => setIsEditing(!isEditing)}>
                     {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                     <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
                        <input
                           type="text"
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           disabled={!isEditing}
                           className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground disabled:opacity-50"
                        />
                     </div>
                     <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                        <input
                           type="email"
                           name="email"
                           value={formData.email}
                           onChange={handleChange}
                           disabled={!isEditing}
                           className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground disabled:opacity-50"
                        />
                     </div>
                     <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Phone</label>
                        <input
                           type="tel"
                           name="phone"
                           value={formData.phone}
                           onChange={handleChange}
                           disabled={!isEditing}
                           className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground disabled:opacity-50"
                        />
                     </div>
                     <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                        <input
                           type="text"
                           name="location"
                           value={formData.location}
                           onChange={handleChange}
                           disabled={!isEditing}
                           className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground disabled:opacity-50"
                        />
                     </div>
                  </div>
                  <div>
                     <label className="text-sm font-medium text-foreground mb-2 block">Bio</label>
                     <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        disabled={!isEditing}
                        rows={4}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground disabled:opacity-50"
                     />
                  </div>
                  {isEditing && (
                     <Button onClick={handleSave} className="w-full">
                        Save Changes
                     </Button>
                  )}
               </CardContent>
            </Card>

            {/* Password Section */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Lock className="w-5 h-5" />
                     Security
                  </CardTitle>
                  <CardDescription>Update your password and security settings</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div>
                     <label className="text-sm font-medium text-foreground mb-2 block">Current Password</label>
                     <input
                        type="password"
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                        placeholder="••••••••"
                     />
                  </div>
                  <div>
                     <label className="text-sm font-medium text-foreground mb-2 block">New Password</label>
                     <input
                        type="password"
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                        placeholder="••••••••"
                     />
                  </div>
                  <div>
                     <label className="text-sm font-medium text-foreground mb-2 block">Confirm Password</label>
                     <input
                        type="password"
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                        placeholder="••••••••"
                     />
                  </div>
                  <Button className="w-full">Update Password</Button>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}
