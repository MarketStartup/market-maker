import { BreadcrumbType } from '@/models/breadcrumbType'
import BreadcrumbWrap from './breadcrumbWrap';

export default function Banner({ breadcrumbItems, title, description }: { breadcrumbItems: BreadcrumbType[], title: string, description?: string }) {
   return (
      <section className="py-16 bg-[var(--color-primary)]"
      >
         <div className="container">
            <BreadcrumbWrap
               items={breadcrumbItems}
            />
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
               {title}
            </h1>
            {description &&
               <p className=" max-w-2xl text-md text-gray-200 animate-fade-in mt-4">
                  {description}
               </p>
            }
         </div>
      </section>
   )
}
