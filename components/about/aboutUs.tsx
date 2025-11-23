import SectionHeading from '../shared/sectionHeading'
import { RichText } from '../richText'

export default function AboutUs({ props }: { props: any }) {
   return (
      <section className="py-24 bg-slate-50">
         <div className="container">
            <SectionHeading
               badge={props.sectionHeading.badge}
               title={props.sectionHeading.title}
               description={props.sectionHeading.subtitle}
            />
            <div className="text-lg text-muted-foreground leading-relaxed">
               <RichText data={props.content} />
            </div>
         </div>
      </section>
   )
}
