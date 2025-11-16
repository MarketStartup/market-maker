'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useEmblaCarousel from 'embla-carousel-react'

interface Testimonial {
   name: string
   role: string
   text: string
   rating: number
}

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
   const [emblaRef, emblaApi] = useEmblaCarousel({
      loop: true,
      align: 'start',
   })
   const [selectedIndex, setSelectedIndex] = useState(0)
   const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

   const onSelect = useCallback(() => {
      if (!emblaApi) return
      setSelectedIndex(emblaApi.selectedScrollSnap())
   }, [emblaApi])

   useEffect(() => {
      if (!emblaApi) return
      onSelect()
      setScrollSnaps(emblaApi.scrollSnapList())
      emblaApi.on('select', onSelect)
      return () => {
         emblaApi.off('select', onSelect)
      }
   }, [emblaApi, onSelect])

   const scrollPrev = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev()
   }, [emblaApi])

   const scrollNext = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext()
   }, [emblaApi])

   return (
      <div className="w-full">
         <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
               {testimonials.map((testimonial, index) => (
                  <div
                     key={index}
                     className="embla__slide flex-[0_0_100%]"
                  >
                     <div className="relative bg-card border border-border rounded-lg p-4">
                        <div className="mb-4">
                           <div className="flex items-center gap-1 mb-4">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                 <Star
                                    key={i}
                                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                 />
                              ))}
                           </div>
                           <Quote className="w-6 h-6 text-primary/30 mb-4" />
                           <p className="text-foreground mb-4 leading-relaxed text-lg italic">
                              "{testimonial.text}"
                           </p>
                        </div>

                        <div className="pt-4 border-t border-border">
                           <p className="font-semibold text-foreground text-base">{testimonial.name}</p>
                           <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
               {scrollSnaps.map((_, index) => (
                  <button
                     key={index}
                     onClick={() => emblaApi?.scrollTo(index)}
                     className={`w-2 h-2 rounded-full transition-all ${index === selectedIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30'
                        }`}
                     aria-label={`Go to slide ${index + 1}`}
                  />
               ))}
            </div>

            <div className="flex gap-2">
               <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollPrev}
                  className="border-border hover:bg-muted"
                  aria-label="Previous testimonial"
               >
                  <ChevronLeft className="w-4 h-4" />
               </Button>
               <Button
                  variant="outline"
                  size="icon"
                  onClick={scrollNext}
                  className="border-border hover:bg-muted"
                  aria-label="Next testimonial"
               >
                  <ChevronRight className="w-4 h-4" />
               </Button>
            </div>
         </div>
      </div>
   )
}
