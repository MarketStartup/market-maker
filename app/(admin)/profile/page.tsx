import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { PersonalInfoForm } from "@/components/profile/personalInfoForm";

export default async function Profile() {
   const session = await auth()
   const user = session?.user

   return (
      <div className="bg-background">
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
         </div>

         <div className="space-y-6">
            <PersonalInfoForm user={{
               firstName: user?.firstName || '',
               lastName: user?.lastName || '',
               dob: user?.dob || '',
               state: user?.state || '',
               mobile: user?.mobile || '',
               email: user?.email || '',
            }} />

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
