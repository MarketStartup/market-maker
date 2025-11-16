import React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { ArrowRight, ArrowRightLeft } from 'lucide-react'

export default function Cta() {
   return (
      <div className="bg-white py-16 px-4 sm:px-6 md:px-20">
         <div className="container flex flex-col text-center bg-muted rounded-md p-14 gap-8 items-center">
            <div>
               <Badge className="px-4 py-2 bg-blue-100 text-blue-700">Get started</Badge>
            </div>
            <div className="flex flex-col gap-2">
               <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                  Try our platform today!
               </h3>
               <p className="text-lg leading-relaxed tracking-tight text-slate-500 max-w-xl">
                  Managing a small business today is already tough. Avoid further
                  complications by ditching outdated, tedious trade methods. Our goal
                  is to streamline SMB trade, making it easier and faster than ever.
               </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
               <Link
                  href="/courses"
                  className={cn(
                     buttonVariants({ size: "lg" }),
                     "gap-2 w-full sm:w-auto justify-center"
                  )}
               >
                  <ArrowRight className="h-4 w-4" />
                  Explore Courses
               </Link>


               <Link
                  href="/register"
                  className={cn(
                     buttonVariants({ variant: "outline", size: "lg" }),
                     "gap-2 w-full sm:w-auto justify-center"
                  )}
               >
                  <ArrowRightLeft className="h-4 w-4" />
                  Explore Courses
               </Link>
            </div>
         </div>
      </div>
   )
}
