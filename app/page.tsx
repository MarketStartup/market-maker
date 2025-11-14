import Image from "next/image";
import Header from "@/components/header";
import { Hero } from "@/components/hero";
import Link from "next/link";
import { Users, Shield, ArrowRight, ArrowRightLeft, Briefcase, BarChart3, TrendingUp, Zap, CheckCircle2, ChevronDown } from 'lucide-react';
import Faq from "@/components/faq";
import Footer from "@/components/footer";

const services = [
   {
      icon: Briefcase,
      title: 'Professional Development',
      description: 'Advance your career with industry-recognized certifications and in-demand skills'
   },
   {
      icon: BarChart3,
      title: 'Data-Driven Learning',
      description: 'Track your progress with comprehensive analytics and personalized learning paths'
   },
   {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security and compliance for your learning data and corporate training'
   },
   {
      icon: Users,
      title: 'Team Management',
      description: 'Manage large learning cohorts with admin dashboards and team collaboration tools'
   },
   {
      icon: TrendingUp,
      title: 'Skills Assessment',
      description: 'Evaluate competencies with standardized assessments and detailed performance metrics'
   },
   {
      icon: Zap,
      title: 'Seamless Integration',
      description: 'Integrate with your existing enterprise systems and learning management platforms'
   }
];

export default function Home() {
   return (
      <div className="min-h-screen bg-background">
         <Header />
         <Hero content={{
            title: "Professional Development",
            titleHighlight: "for the Modern Workforce",
            description:
               "Elevate your career with industry-leading courses designed by experts. Join thousands of professionals advancing their skills with comprehensive learning paths.",
            primaryAction: {
               href: "/courses",
               text: "Explore Courses",
               icon: <ArrowRight className="h-4 w-4" />,
            },
            secondaryAction: {
               href: "/register",
               text: "Start Free Trial",
               icon: <ArrowRightLeft className="h-4 w-4" />,
            },
         }} />

         <div className="bg-slate-50 py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                  <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
                     CORE CAPABILITIES
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Enterprise Features Built for Scale</h2>
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                     Everything you need to manage, track, and optimize learning across your entire organization
                  </p>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service, index) => {
                     const Icon = service.icon;
                     return (
                        <div
                           key={index}
                           className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:border-blue-300"
                        >
                           <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                              <Icon className="w-7 h-7 text-blue-600" />
                           </div>
                           <h3 className="text-lg font-bold text-slate-900 mb-3">{service.title}</h3>
                           <p className="text-slate-600 leading-relaxed">{service.description}</p>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>

         <div className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-center">
                  <span className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-6">
                     WHY CHOOSE US
                  </span>
               </div>
               <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="relative">
                     <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-blue-50/50 rounded-2xl blur-2xl"></div>
                     <img
                        src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                        alt="Team collaboration"
                        className="relative rounded-2xl shadow-lg w-full h-auto object-cover"
                     />
                  </div>
                  <div>
                     <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        Built for Modern Enterprise Organizations
                     </h2>
                     <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        Our platform combines cutting-edge technology with proven learning science to deliver measurable results for your organization.
                     </p>
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

         <Faq />

         {/* <div className="relative overflow-hidden py-24">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
               <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Learning at Scale?</h2>
               <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                  Join thousands of organizations improving skills, productivity, and performance with our enterprise learning platform
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                     href="/register"
                     className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
                  >
                     Start Free Trial
                  </Link>
                  <Link
                     href="/contact"
                     className="inline-flex items-center justify-center px-8 py-4 bg-slate-700/50 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-600 transition-colors"
                  >
                     Contact Sales
                  </Link>
               </div>
            </div>
         </div> */}
         <Footer />

      </div>
   );
}
