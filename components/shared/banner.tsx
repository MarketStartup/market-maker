import React from 'react'

export default function Banner({ title, description }: { title: string, description: string }) {
   return (
      <section className="py-16" style={{ background: 'rgba(15, 23, 42, 0.9)' }}>
         <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
               {title}
            </h1>
            {description &&
               <p className="mx-auto max-w-2xl text-md text-gray-200 animate-fade-in">
                  {description}
               </p>
            }
         </div>
      </section>
   )
}
