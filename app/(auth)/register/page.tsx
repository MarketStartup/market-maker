import { RegisterForm } from '@/components/auth/register-form'
import React from 'react'

export default function page() {
   return (
      <div className="bg-muted flex flex-col items-center justify-center p-6 md:p-24">
         <div className='w-full max-w-sm md:max-w-4xl'>
            <RegisterForm />
         </div>
      </div >
   )
}
