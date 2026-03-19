import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'

export default function ForgotPasswordPage() {
   return (
      <div className="bg-muted flex flex-col items-center justify-center p-6 md:p-16">
         <div className='w-full max-w-sm'>
            <ForgotPasswordForm />
         </div>
      </div>
   )
}
