
import { Target, Lightbulb } from 'lucide-react'

export default function MissionVision({ props }: { props: any }) {
   return (
      <section className="py-24 bg-white">
         <div className="container">
            <div className="grid md:grid-cols-2 gap-12">
               <div>
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-3 rounded-lg bg-primary/10">
                        <Target className="w-6 h-6 text-primary" />
                     </div>
                     <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                     {props.mission}
                  </p>
               </div>

               <div>
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-3 rounded-lg bg-primary/10">
                        <Lightbulb className="w-6 h-6 text-primary" />
                     </div>
                     <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                     {props.vision}
                  </p>
               </div>
            </div>
         </div>
      </section>
   )
}
