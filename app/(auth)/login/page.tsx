import { LoginForm } from '@/components/auth/login-form'
import React from 'react'

export default function page() {
   return (
      <div className="bg-muted flex flex-col items-center justify-center p-6 md:p-16">
         <div className='w-full max-w-sm '>
            <LoginForm />
         </div>
      </div >
   )
}
