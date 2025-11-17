import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import courseImage from '@/public/assets/course_sample.jpeg';
import SectionBadge from '@/components/shared/sectionBadge';
import SectionHeading from '@/components/shared/sectionHeading';

export default function WhyChooseUs() {
   return (
      <div className="bg-white py-24">
         <div className="container">
            <SectionHeading
               badge='WHY CHOOSE US'
               title='Built for Modern Enterprise Organizations'
               description='Our platform combines cutting-edge technology with proven learning science to deliver measurable results for your organization.'
            />

            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-blue-50/50 rounded-lg blur-2xl"></div>
                  <Image
                     src={courseImage}
                     alt="Team collaboration"
                     height={1000}
                     width={1000}
                     className="relative rounded-lg shadow-lg w-full h-auto object-cover"
                  />
               </div>
               <div>
                  <div className="space-y-4">
                     <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                        <div>
                           <h3 className="font-semibold text-slate-900 mb-1">Proven ROI</h3>
                           <p className="text-slate-600">Our clients see average 34% productivity increase and 40% reduction in time-to-competency</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                        <div>
                           <h3 className="font-semibold text-slate-900 mb-1">Enterprise Compliance</h3>
                           <p className="text-slate-600">SOC 2 Type II, GDPR, HIPAA, and SCORM certified with comprehensive audit trails</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                        <div>
                           <h3 className="font-semibold text-slate-900 mb-1">Dedicated Support</h3>
                           <p className="text-slate-600">24/7 priority support with dedicated account managers for enterprise clients</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                        <div>
                           <h3 className="font-semibold text-slate-900 mb-1">Seamless Integration</h3>
                           <p className="text-slate-600">API-first architecture with support for SCORM, xAPI, and LTI standards</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
