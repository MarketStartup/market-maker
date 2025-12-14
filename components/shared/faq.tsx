
import {
   Accordion,
   AccordionItem,
   AccordionTrigger,
   AccordionContent,
} from "@/components/ui/accordion"
import SectionHeading from "./sectionHeading"
import { RichText } from "../richText"

export default function Faq({ props }: { props: any }) {
   return (
      <div className="bg-slate-50 py-24">
         <div className="container">
            <SectionHeading
               badge={props.sectionHeading.badge}
               title={props.sectionHeading.title}
               description={props.sectionHeading.subtitle}
            />
            <Accordion type="single" collapsible className="space-y-4">
               {props.items && props.items.map((faq: { id: string, question: string, answer: any }) => (
                  <AccordionItem
                     key={faq.id}
                     value={`faq-${faq.id}`}
                     className="bg-white border border-slate-200 rounded-lg overflow-hidden transition-colors !border-b 
                        hover:border-[var(--color-primary)] hover:shadow-lg 
                        data-[state=open]:border-[var(--color-primary)]
                        data-[state=open]:shadow-[var(--shadow-lg)]
                        data-[state=open]:bg-[var(--color-accent)]/40"
                  >
                     <AccordionTrigger className="px-6 text-left text-base font-semibold text-slate-900 hover:no-underline cursor-pointer">
                        {faq.question}
                     </AccordionTrigger>

                     <AccordionContent className="px-6 pb-4 text-slate-600 leading-relaxed">
                        <RichText data={faq.answer} />
                     </AccordionContent>
                  </AccordionItem>
               ))}
            </Accordion>

         </div>
      </div>
   )
}
