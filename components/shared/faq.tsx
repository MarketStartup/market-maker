'use client'

import {
   Accordion,
   AccordionItem,
   AccordionTrigger,
   AccordionContent,
} from "@/components/ui/accordion"
import SectionBadge from "./sectionBadge"
import SectionHeading from "./sectionHeading"

const faqs = [
   {
      question: 'How do I enroll in a course?',
      answer: 'Browse our comprehensive course catalog, select a course aligned with your professional goals, and click "Enroll". Account creation and payment processing are quick and secure. You gain immediate access upon enrollment.'
   },
   {
      question: 'Can courses be customized for our organization?',
      answer: 'Yes. We offer enterprise customization options for organizations with specific training needs. Contact our enterprise solutions team to discuss tailored learning programs.'
   },
   {
      question: 'What compliance and certifications do you maintain?',
      answer: 'We maintain SOC 2 Type II, GDPR, HIPAA, and SCORM compliance. Our platform is regularly audited to ensure the highest standards of data security and privacy.'
   },
   {
      question: 'How do I track team learning progress?',
      answer: 'Administrators have access to comprehensive dashboards showing individual and team progress, completion rates, assessment scores, and skill development metrics in real-time.'
   },
   {
      question: 'Do you offer API access for integration?',
      answer: 'Yes. Our robust API allows seamless integration with your existing HR systems, LMS platforms, and business intelligence tools.'
   },
   {
      question: 'What is your support and SLA?',
      answer: 'We provide 24/7 dedicated support with 99.9% uptime SLA. Enterprise clients receive priority support with dedicated account managers.'
   },
   {
      question: 'Can we integrate this with our existing LMS?',
      answer: 'Absolutely. We support SCORM, xAPI, and LTI standards for seamless integration with popular LMS platforms like Canvas, Blackboard, and Moodle.'
   },
   {
      question: 'What reporting capabilities are available?',
      answer: 'Generate detailed reports on learner engagement, competency development, ROI analysis, and compliance training verification. Export in multiple formats including PDF and CSV.'
   }
]

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
               {props.items && props.items.map((faq: {id: string, question:string, answer: string}) => (
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
                        {faq.answer}
                     </AccordionContent>
                  </AccordionItem>
               ))}
            </Accordion>

         </div>
      </div>
   )
}
