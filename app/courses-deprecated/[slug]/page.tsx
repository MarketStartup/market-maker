import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Users, Play, BookOpen, Clock, CheckCircle } from 'lucide-react';
import { coursesData } from '@/lib/data/course-data'
import { notFound } from 'next/navigation';
import { TestimonialCarousel } from '@/components/course/testimonial';
import { BreadcrumbType } from '@/models/breadcrumbType';
import BreadcrumbWrap from '@/components/shared/breadcrumbWrap';

type Props = {
   params: {
      slug?: string | string[]
   }
}

const skillsGained = [
   'JavaScript Fundamentals',
   'React Components',
   'State Management',
   'API Integration',
   'Performance Optimization',
   'Testing & Debugging',
]

const testimonials = [
   {
      name: 'Sarah Chen',
      role: 'Junior Developer',
      text: 'This course completely changed my career trajectory. The practical projects were incredibly valuable.',
      rating: 5,
   },
   {
      name: 'Michael Rodriguez',
      role: 'Full Stack Engineer',
      text: 'Best investment I made this year. The instructor explains complex concepts in an easy-to-understand way.',
      rating: 5,
   },
   {
      name: 'Emma Thompson',
      role: 'Tech Lead',
      text: 'Great content with excellent real-world examples. Highly recommend to anyone serious about learning.',
      rating: 5,
   },
]

export default async function CourseDetail({ params }: Props) {
   const { slug } = await params
   const courseSlug = Array.isArray(slug) ? slug[0] : slug

   if (!courseSlug) return notFound()

   const course = coursesData.find((c) => c.id === courseSlug)
   if (!course) return notFound()

   const breadcrumbItems: BreadcrumbType[] = [
      { label: 'Home', href: '/' },
      { label: 'Courses', href: '/courses' },
      { label: course.category, href: `/courses?category=${course.category}` },
      { label: course.title },
   ]

   const heroStyle = {
      backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9)), url('/assets/course_sample.jpeg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
   }

   return (
      <div>
         <div className="text-white py-12 mb-12" style={heroStyle}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Breadcrumb */}
               {/* <div className="mb-8"> */}
               <BreadcrumbWrap
                  className='mb-8'
                  items={breadcrumbItems}
               />
               {/* </div> */}

               <div className="grid md:grid-cols-3 gap-8 items-start">
                  <div className="md:col-span-2">
                     <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/20">
                           Bestseller
                        </Badge>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/20">
                           Trending
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
                           <span className="font-bold text-lg">{course.rating}</span>
                           <span className="text-gray-400">({course.students.toLocaleString()} reviews)</span>
                        </div>

                        <div className="flex items-center gap-2">
                           <Users className="w-5 h-5 text-gray-300" />
                           <span className="text-gray-300">{(course.students / 1000).toFixed(0)}k+ learners</span>
                        </div>
                     </div>

                     <div className="flex items-center gap-4 pb-6 border-b border-gray-700">
                        <span className="text-sm text-gray-300">Created by <span className="text-white font-semibold">{course.instructor}</span></span>
                     </div>

                     <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                        <span>Last updated 11/2025</span>
                        <span>English</span>
                     </div>
                  </div>

                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 h-fit border border-white/10 shadow-xl">
                     <div className="mb-6">
                        <p className="text-xs font-bold text-slate-600 tracking-widest mb-2">COURSE PRICE</p>
                        <div className="flex items-baseline gap-2">
                           <p className="text-4xl font-bold text-slate-900">${course.price.toFixed(2)}</p>
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
                     <Button
                        className="w-full bg-primary text-primary-foreground hover:opacity-90 py-7 text-base font-semibold shadow-md hover:shadow-lg transition-shadow"
                     >
                        Enroll Now
                     </Button>
                     {/* )} */}

                     <div className="pt-6 border-t border-slate-200 space-y-4 mt-6">
                        <p className="text-xs font-bold text-slate-600 tracking-wider">THIS COURSE INCLUDES</p>
                        <div className="space-y-3 text-sm">
                           <p className="flex items-center gap-3 text-slate-700">
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                              {course.duration} of video
                           </p>
                           <p className="flex items-center gap-3 text-slate-700">
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                              Lifetime access
                           </p>
                           <p className="flex items-center gap-3 text-slate-700">
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                              Certificate of completion
                           </p>
                           <p className="flex items-center gap-3 text-slate-700">
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                              24/7 Q&A support
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="grid md:grid-cols-3 gap-8">
               <div className="md:col-span-2 space-y-12">
                  {/* Course Details Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-12">
                     <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/60 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                           <BookOpen className="w-6 h-6 text-primary" />
                           <span className="text-sm text-muted-foreground">SKILL LEVEL</span>
                        </div>
                        <p className="text-lg font-semibold text-foreground">{course.level}</p>
                     </div>

                     <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/60 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                           <Clock className="w-6 h-6 text-primary" />
                           <span className="text-sm text-muted-foreground">DURATION</span>
                        </div>
                        <p className="text-lg font-semibold text-foreground">{course.duration}</p>
                     </div>
                  </div>

                  {/* What You'll Learn */}
                  <div>
                     <h2 className="text-3xl font-bold text-foreground mb-8">What you'll learn</h2>
                     <div className="grid md:grid-cols-2 gap-6 bg-card border border-border rounded-lg p-6 hover:border-primary/60 transition-colors">
                        {[
                           'Master fundamental concepts and core principles',
                           'Build real-world projects from scratch',
                           'Best practices and industry standards',
                           'Hands-on problem solving techniques',
                           'Career development strategies',
                           'Lifetime access to resources',
                        ].map((item, index) => (
                           <div key={index} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-foreground">{item}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Course Curriculum */}
                  <div>
                     <h2 className="text-3xl font-bold text-foreground mb-8">Course Curriculum</h2>
                     <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((week) => (
                           <details
                              key={week}
                              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/60 transition-colors"
                           >
                              <summary className="px-8 py-6 cursor-pointer hover:bg-muted transition-colors flex items-center justify-between font-semibold text-foreground">
                                 <span className="flex items-center gap-3">
                                    <span className="text-primary font-bold">Section {week}</span>
                                    <span>Course Module</span>
                                 </span>
                                 <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                                    ▼
                                 </span>
                              </summary>
                              <div className="px-8 py-4 border-t border-border bg-muted/50 space-y-3">
                                 {[1, 2, 3].map((lesson) => (
                                    <div
                                       key={lesson}
                                       className="flex items-center gap-4 p-4 rounded hover:bg-background transition-colors"
                                    >
                                       <Play className="w-4 h-4 text-primary flex-shrink-0" />
                                       <span className="text-foreground flex-1">Lesson {lesson}: Key Concepts</span>
                                       <span className="text-xs text-muted-foreground whitespace-nowrap">15 min</span>
                                    </div>
                                 ))}
                              </div>
                           </details>
                        ))}
                     </div>
                  </div>

                  <div>
                     <h2 className="text-3xl font-bold text-foreground mb-8">Student reviews</h2>
                     {/* <TestimonialCarousel testimonials={testimonials} /> */}
                     <TestimonialCarousel testimonials={testimonials} />
                  </div>

                  {/* {enrolled && (
                     <div className="p-8 bg-primary/5 border border-primary/20 rounded-lg">
                        <p className="text-primary font-semibold flex items-center gap-3">
                           <CheckCircle className="w-6 h-6" />
                           You're enrolled in this course!
                        </p>
                     </div>
                  )} */}
               </div>

               <div className="space-y-8">
                  {/* About the Instructor */}
                  <div className="">
                     <h3 className="text-2xl font-bold text-foreground mb-6">About the instructor</h3>
                     <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/60 transition-colors">
                        <div className="flex flex-col items-center text-center mb-2">
                           <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border-2 border-primary/20 mb-4">
                              <span className="text-3xl font-bold text-primary">
                                 {course.instructor.charAt(0)}
                              </span>
                           </div>
                           <h4 className="text-lg font-bold text-foreground">{course.instructor}</h4>
                        </div>
                        <p className="text-foreground leading-relaxed text-sm">
                           Experienced instructor with a passion for teaching and industry expertise in {course.category}. With over 10 years of experience, this instructor has helped thousands of students achieve their learning goals.
                        </p>
                     </div>
                  </div>

                  {/* Skills You'll Gain */}
                  <div>
                     <h3 className="text-2xl font-bold text-foreground mb-6">Skills you'll gain</h3>
                     <div className="space-y-3">
                        {skillsGained.map((skill, index) => (
                           <Badge
                              key={index}
                              className="px-2 py-2 mr-2 bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 text-sm font-small"
                           >
                              <CheckCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                              {skill}
                           </Badge>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
