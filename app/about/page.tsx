import React from 'react'
import Banner from '@/components/shared/banner'
import { Target, Lightbulb } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Cta from '@/components/shared/cta'
import Image from 'next/image'

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

export default function page() {
   return (
      <div>
         <Banner
            title="About Market Makers"
            description="Market Makers is on a mission to make quality education accessible to everyone. Founded in 2024, we've helped thousands of learners achieve their goals through high-quality, affordable online courses."
         />

         <section className="py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

         <section className="py-24 bg-slate-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                  <div>
                     <Badge className="px-4 py-2 bg-blue-100 text-blue-700 mb-4">Team</Badge>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Team</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                     Meet the talented individuals dedicated to transforming education through technology
                  </p>
               </div>

               <div className="grid md:grid-cols-3 gap-8">
                  {teamMembers.map((member, index) => (
                     <div key={index} className="text-center group">
                        <div className="mb-6 overflow-hidden rounded-full w-32 h-32 mx-auto bg-muted border-4 border-primary/10 hover:border-primary/30 transition-all">
                           <Image
                              src={member.avatar || "/placeholder.svg"}
                              alt={member.name}
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

         <Cta />
      </div>
   )
}
