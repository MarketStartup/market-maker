import { Fragment } from 'react';
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbSeparator,
   BreadcrumbList,
   BreadcrumbPage
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { BreadcrumbType } from '@/models/breadcrumbType';

export default function BreadcrumbWrap({ items, className }: { items: BreadcrumbType[], className?: string }) {
   return (
      <Breadcrumb className={className}>
         <BreadcrumbList>
            {items.map((item, idx) => (
               <Fragment key={idx}>
                  {item.href ?
                     <BreadcrumbItem>
                        <BreadcrumbLink asChild
                           className='text-white hover:text-white hover:underline'>
                           <Link href={item.href || ''}>{item.label}</Link>
                        </BreadcrumbLink>
                     </BreadcrumbItem> :
                     <BreadcrumbItem>
                        <BreadcrumbPage className='text-[var(--color-accent)] font-medium'>
                           {item.label}
                        </BreadcrumbPage>
                     </BreadcrumbItem>
                  }
                  {(idx + 1) < items.length &&
                     <BreadcrumbSeparator className='text-white' />
                  }
               </Fragment>
            ))}
         </BreadcrumbList>
      </Breadcrumb>
   )
}
