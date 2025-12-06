import { BreadcrumbType } from '@/models/breadcrumbType'
import BreadcrumbWrap from './breadcrumbWrap';

export default function Banner({ props, pageTitle }: { props: any, pageTitle?: string }) {

   const breadcrumbItems: BreadcrumbType[] = [
      { label: 'Home', href: '/' },
      { label: pageTitle || '' },
   ]

   return (
      <section className="py-16 bg-[var(--color-primary)]"
      >
         <div className="container">
            <BreadcrumbWrap
               items={breadcrumbItems}
            />
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
               {props.title}
            </h1>
            {props.subtitle &&
               <p className=" max-w-2xl text-md text-gray-200 animate-fade-in mt-4">
                  {props.subtitle}
               </p>
            }
         </div>
      </section>
   )
}
