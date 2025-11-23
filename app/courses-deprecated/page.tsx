import Banner from '@/components/shared/banner'

import { BreadcrumbType } from '@/models/breadcrumbType'

const breadcrumbItems: BreadcrumbType[] = [
   { label: 'Home', href: '/' },
   { label: 'Courses' },
]

export default function page() {
   return (
      <div className='bg-white'>
         {/* <Banner
            breadcrumbItems={breadcrumbItems}
            title='Our Courses'
            description='Empowering learners worldwide with quality education and transforming lives through accessible online learning.'
         /> */}

        
      </div>
   )
}
