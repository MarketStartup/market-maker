import Image from 'next/image';
import SectionHeading from '../shared/sectionHeading';

export default function Feature({ props }: { props: any }) {
   return (
      <div className="bg-slate-50 py-24">
         <div className="container">
            <SectionHeading
               badge={props.sectionHeading.badge}
               title={props.sectionHeading.title}
               description={props.sectionHeading.subtitle}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {props.features.map((feature: { id: string; icon: { url: string; alt: string }; title: string; description: string }) => (
                  <div
                     key={feature.id}
                     className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-[var(--color-primary)]"
                  >
                     <div className="w-14 h-14 bg-[var(--color-accent)] rounded-lg flex items-center justify-center mb-6">
                        <Image
                           className="w-7 h-7 text-[var(--color-primary)]"
                           src={feature.icon.url}
                           alt={feature.icon.alt}
                           height={100}
                           width={100} />
                     </div>
                     <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                     <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}
