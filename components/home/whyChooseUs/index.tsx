import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export default function WhyChooseUs() {
   return (
      <div className="bg-white py-24">
         <div className="container">
            <div className="text-center mb-16">
               <span className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-6">
                  WHY CHOOSE US
               </span>
               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                  Built for Modern Enterprise Organizations
               </h2>
               <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Our platform combines cutting-edge technology with proven learning science to deliver measurable results for your organization.
               </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-blue-50/50 rounded-2xl blur-2xl"></div>
                  <Image
                     src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                     alt="Team collaboration"
                     className="relative rounded-2xl shadow-lg w-full h-auto object-cover"
                  />
               </div>
               <div>
                  <div className="space-y-4">
                     <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                           <h3 className="font-semibold text-slate-900 mb-1">Proven ROI</h3>
                           <p className="text-slate-600">Our clients see average 34% productivity increase and 40% reduction in time-to-competency</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                           <h3 className="font-semibold text-slate-900 mb-1">Enterprise Compliance</h3>
                           <p className="text-slate-600">SOC 2 Type II, GDPR, HIPAA, and SCORM certified with comprehensive audit trails</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                           <h3 className="font-semibold text-slate-900 mb-1">Dedicated Support</h3>
                           <p className="text-slate-600">24/7 priority support with dedicated account managers for enterprise clients</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
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
