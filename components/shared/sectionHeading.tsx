'use client'

import { motion } from 'framer-motion'
import SectionBadge from './sectionBadge'

export default function SectionHeading({ badge, title, description }: { badge: string, title: string, description?: string }) {
   return (
      <motion.div
         className="text-center mb-16"
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.5 }}
      >
         <SectionBadge title={badge} />
         <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {title}
         </h2>
         {description &&
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
               {description}
            </p>
         }
      </motion.div>
   )
}
