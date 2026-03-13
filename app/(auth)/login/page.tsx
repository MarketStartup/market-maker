import { LoginForm } from '@/components/auth/login-form'
import React from 'react'

export default async function page({ searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }) {
   const { callbackUrl } = await searchParams
   
   return (
      <div className="bg-muted flex flex-col items-center justify-center p-6 md:p-16">
         <div className='w-full max-w-sm '>
            <LoginForm callbackUrl={callbackUrl} />
         </div>
      </div >
   )
}
