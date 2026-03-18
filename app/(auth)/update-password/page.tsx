import { UpdatePasswordForm } from '@/components/auth/update-password-form'

export default function UpdatePasswordPage() {
   return (
      <div className="bg-muted flex flex-col items-center justify-center p-6 md:p-16">
         <div className="w-full max-w-sm">
            <UpdatePasswordForm />
         </div>
      </div>
   )
}
