export const dynamic = 'force-dynamic';

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen, CalendarClock, CheckCircle2, Clock } from "lucide-react";
import { getCourseData, getUserEnrollment } from "@/lib/api";
import { auth } from "@/auth"
import { redirect } from "next/navigation";

export default async function Dashboard() {
   const session = await auth()
   if (!session?.user)
      redirect(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/login`);

   const enrollments = await getUserEnrollment(session.user.id);
   const courses = await getCourseData();

   const currentDate = new Date();

   const upcomingCourses = enrollments.filter(enrollment =>
      new Date(enrollment.startDate) > currentDate
   ).map(enrollment => {
      const daysUntilStart = Math.ceil((new Date(enrollment.startDate).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      return { ...enrollment, daysUntilStart };
   });

   const inProgressCourses = enrollments.filter(enrollment =>
      new Date(enrollment.startDate) <= currentDate &&
      new Date(enrollment.endDate) >= currentDate
   ).map(enrollment => {
      const startDate = new Date(enrollment.startDate);
      const endDate = new Date(enrollment.endDate);
      const totalDays = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
      const elapsedDays = Math.ceil((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)));
      const progress = Math.min(100, Math.max(0, Math.round((elapsedDays / totalDays) * 100)));
      return { ...enrollment, progress, daysRemaining };
   });

   const completedCourses = enrollments.filter(enrollment =>
      new Date(enrollment.endDate) < currentDate
   );

   const stats = [
      { label: "Total Enrolled", value: enrollments.length, icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30" },
      { label: "In Progress", value: inProgressCourses.length, icon: Clock, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/30" },
      { label: "Completed", value: completedCourses.length, icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50 dark:bg-green-950/30" },
   ];

   return (
      <div className="bg-background">
         <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-1">Dashboard</h1>
            <p className="text-muted-foreground">Track your learning progress and continue where you left off</p>
         </div>

         {/* Stats */}
         {enrollments.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-10">
               {stats.map((stat) => (
                  <div key={stat.label} className={`rounded-xl border border-border p-4 flex items-center gap-4 ${stat.bg}`}>
                     <div className={`p-2 rounded-lg bg-background/80 ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                     </div>
                     <div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                     </div>
                  </div>
               ))}
            </div>
         )}

         {enrollments.length === 0 ? (
            <div className="text-center py-20 bg-muted/50 border border-border rounded-xl">
               <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
               </div>
               <h2 className="text-2xl font-bold text-foreground mb-3">No courses yet</h2>
               <p className="text-muted-foreground mb-8 max-w-sm mx-auto">Start your learning journey by exploring our collection of courses</p>
               <Link href="/courses">
                  <Button className="inline-flex items-center gap-2">
                     Explore Courses
                     <ArrowRight className="w-4 h-4" />
                  </Button>
               </Link>
            </div>
         ) : (
            <div className="space-y-12">

               {/* Upcoming */}
               {upcomingCourses.length > 0 && (
                  <div>
                     <div className="flex items-center gap-2 mb-6">
                        <CalendarClock className="w-5 h-5 text-blue-500" />
                        <h2 className="text-xl font-bold text-foreground">Upcoming</h2>
                        <span className="text-sm text-muted-foreground">({upcomingCourses.length})</span>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingCourses.map((enrollment) => {
                           const course = courses.find(c => c.id === enrollment.course);
                           return (
                              <Card
                                 key={enrollment.name}
                                 className="overflow-hidden gap-0 hover:shadow-lg transition-all hover:-translate-y-0.5 duration-300 h-full bg-card border-border p-0"
                              >
                                 <div className="overflow-hidden bg-muted h-[180px] relative">
                                    <Image
                                       src={course?.image?.url || "/placeholder.png"}
                                       alt={course?.title || "Course"}
                                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                       height={180}
                                       width={400}
                                    />
                                    <div className="absolute top-2 right-2">
                                       <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                                          <CalendarClock className="w-3 h-3" />
                                          Upcoming
                                       </span>
                                    </div>
                                 </div>
                                 <div className="p-5">
                                    <h3 className="font-bold text-base text-foreground mb-1 line-clamp-2">
                                       {course?.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mb-1">
                                       {course?.batches?.docs?.find(batch => batch.title === enrollment.title)?.name ?? enrollment.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                       {course?.description}
                                    </p>
                                    <div className="mb-4 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 rounded-lg px-3 py-2">
                                       <CalendarClock className="w-4 h-4 shrink-0" />
                                       Starts in {enrollment.daysUntilStart} day{enrollment.daysUntilStart !== 1 ? 's' : ''}
                                    </div>
                                    <Link
                                       href={`/courses/${course?.slug}`}
                                       className="block w-full text-center px-4 py-2 rounded-lg border border-border text-muted-foreground text-sm font-medium hover:bg-muted transition-colors"
                                    >
                                       View Details
                                    </Link>
                                 </div>
                              </Card>
                           );
                        })}
                     </div>
                  </div>
               )}

               {/* In Progress */}
               {inProgressCourses.length > 0 && (
                  <div>
                     <div className="flex items-center gap-2 mb-6">
                        <Clock className="w-5 h-5 text-amber-500" />
                        <h2 className="text-xl font-bold text-foreground">In Progress</h2>
                        <span className="text-sm text-muted-foreground">({inProgressCourses.length})</span>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {inProgressCourses.map((enrollment) => {
                           const course = courses.find(c => c.id === enrollment.course);
                           return (
                              <Card
                                 key={enrollment.name}
                                 className="overflow-hidden gap-0 hover:shadow-lg transition-all hover:-translate-y-0.5 duration-300 h-full bg-card border-border p-0"
                              >
                                 <div className="overflow-hidden bg-muted h-[180px]">
                                    <Image
                                       src={course?.image?.url || "/placeholder.png"}
                                       alt={course?.title || "Course"}
                                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                       height={180}
                                       width={400}
                                    />
                                 </div>
                                 <div className="p-5">
                                    <h3 className="font-bold text-base text-foreground mb-1 line-clamp-2">
                                       {course?.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mb-1">
                                       {course?.batches?.docs?.find(batch => batch.title === enrollment.title)?.name ?? enrollment.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                       {course?.description}
                                    </p>
                                    <div className="mb-4">
                                       <div className="flex items-center justify-between mb-1.5">
                                          <span className="text-xs font-medium text-foreground">Progress</span>
                                          <span className="text-xs font-semibold text-primary">{enrollment.progress}%</span>
                                       </div>
                                       <Progress value={enrollment.progress} className="h-1.5" />
                                       <p className="text-xs text-muted-foreground mt-1.5">{enrollment.daysRemaining} days remaining</p>
                                    </div>
                                    <Link
                                       href={`/courses/${course?.slug}`}
                                       className="block w-full text-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                                    >
                                       Continue Learning
                                    </Link>
                                 </div>
                              </Card>
                           );
                        })}
                     </div>
                  </div>
               )}

               {/* Completed */}
               {completedCourses.length > 0 && (
                  <div>
                     <div className="flex items-center gap-2 mb-6">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <h2 className="text-xl font-bold text-foreground">Completed</h2>
                        <span className="text-sm text-muted-foreground">({completedCourses.length})</span>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {completedCourses.map((enrollment) => {
                           const course = courses.find(c => c.id === enrollment.course);
                           return (
                              <Card
                                 key={enrollment.name}
                                 className="overflow-hidden gap-0 hover:shadow-lg transition-all hover:-translate-y-0.5 duration-300 h-full bg-card border-border p-0"
                              >
                                 <div className="overflow-hidden bg-muted h-[180px] relative">
                                    <Image
                                       src={course?.image?.url || "/placeholder.png"}
                                       alt={course?.title || "Course"}
                                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                       height={180}
                                       width={400}
                                    />
                                    <div className="absolute top-2 right-2">
                                       <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                                          <CheckCircle2 className="w-3 h-3" />
                                          Completed
                                       </span>
                                    </div>
                                 </div>
                                 <div className="p-5">
                                    <h3 className="font-bold text-base text-foreground mb-1 line-clamp-2">
                                       {course?.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mb-1">
                                       {course?.batches?.docs?.find(batch => batch.title === enrollment.title)?.name ?? enrollment.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                       {course?.description}
                                    </p>
                                    <Link
                                       href={`/courses/${course?.slug}`}
                                       className="block w-full text-center px-4 py-2 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                                    >
                                       View Course
                                    </Link>
                                 </div>
                              </Card>
                           );
                        })}
                     </div>
                  </div>
               )}

               <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
                  <p className="text-foreground font-medium mb-1">Ready to learn more?</p>
                  <p className="text-sm text-muted-foreground mb-4">Browse our catalog and enroll in a new course</p>
                  <Link href="/courses">
                     <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        Browse More Courses
                     </Button>
                  </Link>
               </div>
            </div>
         )}
      </div>
   )
}
