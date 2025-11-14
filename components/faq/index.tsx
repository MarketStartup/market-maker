'use client'

import { ChevronDown } from "lucide-react";
import { useState } from "react";

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
];

export default function Faq() {
   const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
   return (
      <div className="bg-slate-50 py-24">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
                  FAQ
               </span>
               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
               <p className="text-xl text-slate-600">
                  Everything you need to know about our platform and services
               </p>
            </div>

            <div className="space-y-4">
               {faqs.map((faq, index) => (
                  <div
                     key={index}
                     className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors"
                  >
                     <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                        className="w-full px-6 py-5 flex items-center justify-between transition-colors"
                     >
                        <span className="text-base font-semibold text-slate-900 text-left">{faq.question}</span>
                        <ChevronDown
                           className={`w-5 h-5 text-blue-600 transition-transform duration-300 flex-shrink-0 ${openFaqIndex === index ? 'transform rotate-180' : ''
                              }`}
                        />
                     </button>
                     {openFaqIndex === index && (
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                           <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                        </div>
                     )}
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}