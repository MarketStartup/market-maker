import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { ArrowRight, ArrowRightLeft } from 'lucide-react'
import SectionHeading from './sectionHeading'

export default function PromoBanner({ props }: { props: any }) {
   return (
      <div className="bg-white py-16 px-4 sm:px-6 md:px-20">
         <div className="container flex flex-col text-center bg-muted rounded-lg p-6 md:p-14 items-center justify-center">
            <SectionHeading
               badge={props.sectionHeading.badge}
               title={props.sectionHeading.title}
            />
            <div className="flex flex-col gap-2 items-center">
               <p className="text-lg leading-relaxed tracking-tight text-slate-500 max-w-xl">
                  {props.description}
               </p>
               <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  {props.primaryAction && (
                     <Link
                        href={props.primaryAction.href}
                        className={cn(
                           buttonVariants({ size: "lg" }),
                           "gap-2 w-full sm:w-auto justify-center"
                        )}
                     >
                        <ArrowRight className="h-4 w-4" />
                        {props.primaryAction.label}
                     </Link>
                  )}

                  {props.secondaryAction && (
                     <Link
                        href={props.secondaryAction.href}
                        className={cn(
                           buttonVariants({ variant: "outline", size: "lg" }),
                           "gap-2 w-full sm:w-auto justify-center"
                        )}
                     >
                        <ArrowRightLeft className="h-4 w-4" />
                        {props.secondaryAction.label}
                     </Link>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}
