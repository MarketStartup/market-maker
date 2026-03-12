import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import { getCourseData, getUserEnrollment } from "@/lib/api";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation";

export default async function Dashboard() {
   const session = await auth.api.getSession({ headers: await headers() });
   if (!session?.user)
      redirect(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/login`);

   const enrollments = await getUserEnrollment((session.user as any).externalId);
   const courses = await getCourseData();

   const currentDate = new Date();
   const inProgressCourses = enrollments.filter(enrollment =>
      new Date(enrollment.startDate) <= currentDate &&
      new Date(enrollment.endDate) >= currentDate
   ).map(enrollment => ({
      ...enrollment,
      progress: Math.max(0, Math.ceil((new Date(enrollment.endDate).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)))
   }));

   const completedCourses = enrollments.filter(enrollment =>
      new Date(enrollment.endDate) < currentDate
   );

   return (
      <div className="bg-background">
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Track your learning progress and continue where you left off</p>
         </div>

         {enrollments.length === 0 ? (
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
         ) : (
            <div className="space-y-12">
               {inProgressCourses.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {inProgressCourses.map((enrollment) => {
                        const course = courses.find(c => c.id === enrollment.course);
                        return (
                           <Card
                              key={enrollment.name}
                              className="overflow-hidden hover:shadow-lg transition-shadow h-full bg-card border-border p-0"
                           >
                              <div className="aspect-video overflow-hidden bg-muted h-[200px]">
                                 <Image
                                    src={course?.image?.url || "/placeholder.png"}
                                    alt={course?.title || "Course"}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    height={200}
                                    width={400}
                                 />
                              </div>

                              <div className="p-6 pt-0">
                                 <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">
                                    {course?.title} - {course?.batches.docs.find(batch => batch.title === enrollment.title)?.name}
                                 </h3>
                                 <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                    {course?.description}
                                 </p>

                                 <div>
                                    <div className="flex items-center justify-between mb-2">
                                       <span className="text-xs font-medium text-foreground">Progress</span>
                                       <span className="text-xs font-bold text-primary">{enrollment.progress}%</span>
                                    </div>
                                    <Progress value={enrollment.progress} className="h-2" />
                                 </div>
                                 <div className="flex justify-end mt-4">
                                    <Link href={`/courses/${course?.slug}`} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                                       Continue Learning
                                    </Link>
                                 </div>
                              </div>
                           </Card>
                        );
                     })}
                  </div>
               )}

               {completedCourses.length > 0 && (
                  <div>
                     <h2 className="text-2xl font-bold text-foreground mb-6">Completed Courses</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {completedCourses.map((enrollment) => {
                           const course = courses.find(c => c.id === enrollment.course);
                           return (
                              <Card
                                 key={enrollment.name}
                                 className="overflow-hidden hover:shadow-lg transition-shadow h-full bg-card border-border p-0"
                              >
                                 <div className="aspect-video overflow-hidden bg-muted h-[200px]">
                                    <Image
                                       src={course?.image?.url || "/placeholder.png"}
                                       alt={course?.title || "Course"}
                                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                       height={200}
                                       width={400}
                                    />
                                 </div>

                                 <div className="p-6 pt-0">
                                    <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">
                                       {course?.title} - {course?.batches.docs.find(batch => batch.title === enrollment.title)?.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                       {course?.description}
                                    </p>
                                    <div className="flex justify-end mt-4">
                                       <Link href={`/courses/${course?.slug}`} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                                          Continue Learning
                                       </Link>
                                    </div>
                                 </div>
                              </Card>
                           );
                        })}
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
         )}
      </div>
   )
}
