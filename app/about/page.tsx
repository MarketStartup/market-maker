import Banner from '@/components/shared/banner'
import Cta from '@/components/shared/cta'
import { BreadcrumbType } from '@/models/breadcrumbType'
import SectionHeading from '@/components/shared/sectionHeading'
import Team from '@/components/about/team'
import MissionVision from '@/components/about/missionVision'

const breadcrumbItems: BreadcrumbType[] = [
   { label: 'Home', href: '/' },
   { label: 'About' },
]

export default function page() {
   return (
      <div>
         <Banner
            breadcrumbItems={breadcrumbItems}
            title="About Market Makers"
         />

         <section className="py-24 bg-slate-50">
            <div className="container">
               <SectionHeading
                  badge='About'
                  title='About Market Makers'
                  description=''
               />
               <p className="text-lg text-muted-foreground leading-relaxed">
                  To democratize quality education by providing accessible, affordable, and industry-relevant courses to learners worldwide. We believe everyone deserves the opportunity to upskill and transform their career, regardless of their background or location.
               </p>
            </div>
         </section>

         <MissionVision />
         <Team />
         <Cta />
      </div>
   )
}
