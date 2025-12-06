import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Play, BookOpen, Clock, CheckCircle } from 'lucide-react';
import { CourseType } from "@/models/courseType"
import { TestimonialCarousel } from '@/components/course/testimonial';

export default function CourseDetail({ course }: { course?: CourseType }) {
   if (!course)
      return null;

   return (
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
                     {course.whatYouLearnPoints && course.whatYouLearnPoints.map((item) => (
                        <div key={item.id} className="flex items-start gap-3">
                           <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                           <span className="text-foreground">{item.title}</span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Course Curriculum */}
               <div>
                  <h2 className="text-3xl font-bold text-foreground mb-8">Course Curriculum</h2>
                  <div className="space-y-4">
                     {course.curriculums.map((curriculum, sectionIndex: number) => (
                        <details
                           key={curriculum.id}
                           className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/60 transition-colors"
                        >
                           <summary className="px-8 py-6 cursor-pointer hover:bg-muted transition-colors flex items-center justify-between font-semibold text-foreground">
                              <span className="flex items-center gap-3">
                                 <span className="text-primary font-bold">Section {sectionIndex + 1}</span>
                                 <span>{curriculum.sectionTitle}</span>
                              </span>
                              <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                                 ▼
                              </span>
                           </summary>
                           <div className="px-8 py-4 border-t border-border bg-muted/50 space-y-3">
                              {curriculum.lessons.map((lesson, lessionIndex) => (
                                 <div
                                    key={lesson.id}
                                    className="flex items-center gap-4 p-4 rounded hover:bg-background transition-colors"
                                 >
                                    <Play className="w-4 h-4 text-primary flex-shrink-0" />
                                    <span className="text-foreground flex-1">Lesson {lessionIndex + 1}: {lesson.lessonTitle}</span>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">{lesson.lessonDuration}</span>
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
                  <TestimonialCarousel testimonials={course.reviews} />
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
                           <Avatar className='size-full'>
                              <AvatarImage src={course.instructor.image?.url} alt={course.instructor.name} />
                              <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                           </Avatar>
                        </div>
                        <h4 className="text-lg font-bold text-foreground">{course.instructor.name}</h4>
                     </div>
                     <p className="text-foreground leading-relaxed text-sm">
                        {course.instructor.bio}
                     </p>
                  </div>
               </div>

               {/* Skills You'll Gain */}
               <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">Skills you'll gain</h3>
                  <div className="space-y-3">
                     {course.skills && course.skills.map((skill) => (
                        <Badge
                           key={skill.id}
                           className="px-2 py-2 mr-2 bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 text-sm font-small"
                        >
                           <CheckCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                           {skill.title}
                        </Badge>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
