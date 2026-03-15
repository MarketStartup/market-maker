export const dynamic = 'force-dynamic';

import { auth } from "@/auth";
import { PersonalInfoForm } from "@/components/profile/personalInfoForm";
import { ChangePasswordForm } from "@/components/profile/changePasswordForm";

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
               id: user?.id as number,
               firstName: user?.firstName || '',
               lastName: user?.lastName || '',
               dob: user?.dob || '',
               state: user?.state || '',
               mobile: user?.mobile || '',
               email: user?.email || '',
            }} />

            <ChangePasswordForm
               userId={user?.id as number}
               email={user?.email || ''}
            />
         </div>
      </div>
   )
}
