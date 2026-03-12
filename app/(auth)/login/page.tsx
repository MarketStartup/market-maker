import { LoginForm } from '@/components/auth/login-form'
import React from 'react'

export default function page({ searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }) {
   const params = React.use(searchParams)
   return (
      <div className="bg-muted flex flex-col items-center justify-center p-6 md:p-16">
         <div className='w-full max-w-sm '>
            <LoginForm callbackUrl={params.callbackUrl} />
         </div>
      </div >
   )
}
