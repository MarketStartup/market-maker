import { Star, Users, CheckCircle } from 'lucide-react';
import BreadcrumbWrap from '@/components/shared/breadcrumbWrap';
import { CourseType } from '@/models/courseType';
import { BreadcrumbType } from '@/models/breadcrumbType';
import { Badge } from '@/components/ui/badge';
import { BatchEnrollDialog } from '../dialog/batchEnrollDialog';
import { format } from 'date-fns'

export default function CourseDetailBanner({ slug, course }: { slug: string, course?: CourseType }) {
   if (!course)
      return null;

   const breadcrumbItems: BreadcrumbType[] = [
      { label: 'Home', href: '/' },
      { label: 'Courses', href: `/${slug}` },
      { label: course.title },
   ]

   const heroStyle = {
      backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9)), url('/assets/course_sample.jpeg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
   }

   return (
      <div className="text-white py-12 mb-12" style={heroStyle}>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            {/* <div className="mb-8"> */}
            <BreadcrumbWrap
               className='mb-8'
               items={breadcrumbItems}
            />
            {/* </div> */}

            <div className="grid md:grid-cols-3 gap-8 items-center">
               <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                     <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/20">
                        {course.category}
                     </Badge>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                     {course.title}
                  </h1>
                  <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                     {course.description}
                  </p>

                  <div className="flex flex-wrap gap-6 mb-6">
                     <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                           {[...Array(5)].map((_, i) => (
                              <Star
                                 key={i}
                                 className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}`}
                              />
                           ))}
                        </div>
                        {/* <span className="font-bold text-lg">{course.rating}</span> */}
                        <span className="text-gray-400">({course.review.toLocaleString()} reviews)</span>
                     </div>

                     <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-300" />
                        {/* <span className="text-gray-300">{(course.student / 1000).toFixed(0)}k+ learners</span> */}
                        <span className="text-gray-300">{course.student.toLocaleString()} learners</span>
                     </div>
                  </div>

                  <div className="flex items-center gap-4 pb-6 border-b border-gray-700">
                     <span className="text-sm text-gray-300">Created by <span className="text-white font-semibold">{course.instructor.name}</span></span>
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                     <span>Last updated {format(course.updatedAt, 'dd-MMM-yyyy')}</span>
                     <span>English</span>
                  </div>
               </div>

               <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 h-fit border border-white/10 shadow-xl">
                  <div className="mb-6">
                     <p className="text-xs font-bold text-slate-600 tracking-widest mb-2">COURSE PRICE</p>
                     <div className="flex items-baseline gap-2">
                        <p className="text-4xl font-bold text-slate-900">₹{course.price.toFixed(2)}</p>
                     </div>
                  </div>

                  {/* {enrolled ? (
                        <div className="space-y-3">
                           <Button className="w-full bg-primary text-primary-foreground hover:opacity-90 py-6 text-base font-semibold">
                              <Play className="w-5 h-5 mr-2" />
                              Continue Learning
                           </Button>
                           <Button variant="outline" className="w-full border-slate-300 text-slate-900 hover:bg-slate-50 py-6">
                              View Progress
                           </Button>
                        </div>
                     ) : ( */}
                  {/* <Button
                     className="w-full bg-primary text-primary-foreground hover:opacity-90 py-7 text-base font-semibold shadow-md hover:shadow-lg transition-shadow"
                  >
                     Enroll Now
                  </Button> */}
                  <BatchEnrollDialog course={course} batches={course.batches.docs} />
                  {/* )} */}

                  {course.thisCourseIncludes &&
                     <div className="pt-6 border-t border-slate-200 space-y-4 mt-6">
                        <p className="text-xs font-bold text-slate-600 tracking-wider">THIS COURSE INCLUDES</p>
                        <div className="space-y-3 text-sm">
                           {course.thisCourseIncludes.map((item: { id: string; title: string }) => (
                              <p key={item.id} className="flex items-center gap-3 text-slate-700">
                                 <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                 {item.title}
                              </p>
                           ))}
                        </div>
                     </div>
                  }
               </div>
            </div>
         </div>
      </div>
   )
}
