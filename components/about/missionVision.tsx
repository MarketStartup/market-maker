
import { Target, Lightbulb } from 'lucide-react'

export default function MissionVision() {
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
                     To democratize quality education by providing accessible, affordable, and industry-relevant courses to learners worldwide. We believe everyone deserves the opportunity to upskill and transform their career, regardless of their background or location.
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
                     To become the world's leading learning platform where professionals and aspiring learners can master in-demand skills through expert instruction, cutting-edge technology, and a supportive community. We envision a future where learning is continuous, engaging, and directly tied to career success.
                  </p>
               </div>
            </div>
         </div>
      </section>
   )
}
