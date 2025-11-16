
import { HomeBanner } from "@/components/home/homeBanner";
import { ArrowRight, ArrowRightLeft, PhoneCall, MoveRight } from 'lucide-react';
import Faq from "@/components/shared/faq";
import WhyChooseUs from "@/components/home/whyChooseUs";
import Feature from "@/components/home/feature";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Cta from "@/components/shared/cta";

export default function Home() {
   return (
      <div className="bg-background">
         <HomeBanner content={{
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
               text: "Get Started",
               icon: <ArrowRightLeft className="h-4 w-4" />,
            },
         }} />
         <Feature />
         <WhyChooseUs />
         <Faq />
         {/*TODO Testimonial */}

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

         <Cta />
      </div>
   );
}
