import SectionHeading from "@/components/shared/sectionHeading"
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import teamAvatar from '@/public/assets/team-avatar.jpeg'

const teamMembers = [
   {
      name: 'Zeeshan Shaikh',
      role: 'Founder & CEO',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      bio: 'Visionary leader with 10+ years in EdTech',
   },
   {
      name: 'Ikhlaq Shaikh',
      role: 'CTO & Co-Founder',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: 'Full-stack developer passionate about learning',
   },
   {
      name: 'Junaid Shaikh',
      role: 'Head of Product',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      bio: 'UX strategist focused on user outcomes',
   },
]

export default function Team() {
   return (
      <section className="py-24 bg-slate-50">
         <div className="container">
            <SectionHeading
               badge='Team'
               title='Our Team'
               description='Meet the talented individuals dedicated to transforming education through technology'
            />

            <div className="grid md:grid-cols-3 gap-8">
               {teamMembers.map((member, index) => (
                  <div key={index} className="text-center group">
                     <div className="mb-6 overflow-hidden rounded-full w-32 h-32 mx-auto bg-muted border-4 border-primary/10 hover:border-primary/30 transition-all">
                        <Image
                           src={teamAvatar}
                           alt={member.name}
                           height={1000}
                           width={1000}
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                     </div>
                     <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                     <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
                        {member.role}
                     </Badge>
                     <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}
