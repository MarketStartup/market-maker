import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Users, Clock } from 'lucide-react'
import courseImage from '@/public/assets/course_sample.jpeg';
import Image from 'next/image'
import { getCoursesData } from '@/lib/api';

export default async function CourseListing({ slug }: { slug: string }) {
   const coursesData = await getCoursesData();

   return (
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 py-16">
         {coursesData.map(course => (
            <Card
               key={course.id}
               className="overflow-hidden hover:shadow-lg transition-shadow h-full bg-card border-border p-0"
            >
               <div className="aspect-video overflow-hidden bg-muted h-[200]">
                  <Link
                     key={course.slug}
                     href={`/${slug}/${course.slug}`}
                  >
                     <Image
                        src={course.image?.url || courseImage}
                        alt={course.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        height={1000}
                        width={1000}
                     />
                  </Link>
               </div>

               <div className="p-6 pt-0">
                  <div className="flex items-start justify-between mb-3">
                     <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {course.category}
                     </Badge>
                     <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
                        {course.level}
                     </Badge>
                  </div>

                  <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">
                     {course.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                     {course.description}
                  </p>

                  <div className="space-y-3 mb-4 pb-4 border-b border-border">
                     <p className="text-xs text-muted-foreground">
                        by <span className="font-medium text-foreground">{course.instructor.name}</span>
                     </p>

                     <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                           <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                           <span className="font-medium text-foreground">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                           <Users className="w-3 h-3" />
                           <span>{course.student.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                           <Clock className="w-3 h-3" />
                           <span>{course.duration}</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center justify-between">
                     <div>
                        <span className="text-xl font-bold text-primary">
                           ₹{course.price.toLocaleString()}
                        </span>
                        {course.comparePrice && <span className="text-muted-foreground line-through text-sm ml-4">₹{course.comparePrice.toLocaleString()}</span>}
                     </div>
                     <Link href={`/${slug}/${course.slug}`} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                        Enroll Now
                     </Link>
                  </div>
               </div>
            </Card>
         ))
         }
      </div >
   )
}
