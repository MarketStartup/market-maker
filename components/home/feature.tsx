import { Users, Shield, Briefcase, BarChart3, TrendingUp, Zap } from 'lucide-react';

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

export default function Feature() {
   return (
      <div className="bg-slate-50 py-24">
         <div className="container">
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
   )
}
