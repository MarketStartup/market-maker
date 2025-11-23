import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import courseImage from '@/public/assets/course_sample.jpeg';
import SectionHeading from '@/components/shared/sectionHeading';

export default function WhyChooseUs({ props }: { props: any }) {
   return (
      <div className="bg-white py-24">
         <div className="container">
            <SectionHeading
               badge={props.sectionHeading.badge}
               title={props.sectionHeading.title}
               description={props.sectionHeading.subtitle}
            />
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-blue-50/50 rounded-lg blur-2xl" />
                  <Image
                     src={props?.image?.url || courseImage}
                     alt="Team collaboration"
                     height={1000}
                     width={1000}
                     className="relative rounded-lg shadow-lg w-full h-auto object-cover"
                  />
               </div>
               <div>
                  <div className="space-y-4">
                     {props.points && props.points.map((point: { id: string, title: string, description: string }) => (
                        <div
                           key={point.id}
                           className="flex items-start gap-4"
                        >
                           <CheckCircle2 className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                           <div>
                              <h3 className="font-semibold text-slate-900 mb-1">{point.title}</h3>
                              <p className="text-slate-600">{point.description}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
