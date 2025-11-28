import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Dashboard() {
   return (
      <div className="bg-background">
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Track your learning progress and continue where you left off</p>
         </div>

         {/* {enrollments.length === 0 ? ( */}
         <div className="text-center py-20 bg-muted rounded-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4">No courses yet</h2>
            <p className="text-muted-foreground mb-8">Start learning by exploring our collection of courses</p>
            <Link href="/courses">
               <Button className="bg-primary text-primary-foreground hover:opacity-90 inline-flex items-center gap-2">
                  Explore Courses
                  <ArrowRight className="w-4 h-4" />
               </Button>
            </Link>
         </div>
         {/* ) : (
                  <div className="space-y-12">
                     {inProgressCourses.length > 0 && (
                        <div>
                           <h2 className="text-2xl font-bold text-foreground mb-6">Continuing Learning</h2>
                           <div className="space-y-4">
                              {inProgressCourses.map((enrollment) => (
                                 <EnrolledCourseCard
                                    key={enrollment.courseId}
                                    courseId={enrollment.courseId}
                                    progress={enrollment.progress}
                                 />
                              ))}
                           </div>
                        </div>
                     )}

                     {completedCourses.length > 0 && (
                        <div>
                           <h2 className="text-2xl font-bold text-foreground mb-6">Completed Courses</h2>
                           <div className="space-y-4">
                              {completedCourses.map((enrollment) => (
                                 <EnrolledCourseCard
                                    key={enrollment.courseId}
                                    courseId={enrollment.courseId}
                                    progress={enrollment.progress}
                                 />
                              ))}
                           </div>
                        </div>
                     )}

                     {enrollments.length > 0 && (
                        <div className="bg-muted/50 border border-border rounded-lg p-8 text-center">
                           <p className="text-foreground mb-4">Ready to continue learning?</p>
                           <Link href="/courses">
                              <Button className="bg-primary text-primary-foreground hover:opacity-90">Browse More Courses</Button>
                           </Link>
                        </div>
                     )}
                  </div>
               )} */}
      </div>
   )
}
