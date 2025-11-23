import SectionHeading from "@/components/shared/sectionHeading"
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import teamAvatar from '@/public/assets/team-avatar.jpeg'

export default function Team({ props }: { props: any }) {
   return (
      <section className="py-24 bg-slate-50">
         <div className="container">
            <SectionHeading
               badge={props.sectionHeading.badge}
               title={props.sectionHeading.title}
               description={props.sectionHeading.subtitle}
            />

            <div className="grid md:grid-cols-3 gap-8">
               {props.members && props.members.map((member: { id: string, name: string, designation: string, photo: { url: string, alt: string }, bio: string }) => (
                  <div key={member.id} className="text-center group">
                     <div className="mb-6 overflow-hidden rounded-full w-32 h-32 mx-auto bg-muted border-4 border-primary/10 hover:border-primary/30 transition-all">
                        <Image
                           src={member.photo?.url || teamAvatar}
                           alt={member.photo?.alt || member.name}
                           height={1000}
                           width={1000}
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                     </div>
                     <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                     <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
                        {member.designation}
                     </Badge>
                     <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}
