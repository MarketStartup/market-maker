import { User, CreditCard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookOpen, ArrowRight } from "lucide-react";

export default function page() {
   return (
      <div className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
         <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-md md:sticky md:top-26 h-max">
               <div className="flex flex-col">
                  {/* User Profile Section */}
                  <div className="border-b border-border/50 p-6">
                     <div className="flex flex-col items-center gap-3">
                        <Avatar className="h-20 w-20 border-2 border-primary/20 shadow-md">
                           <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-xl font-semibold text-primary-foreground">
                              U
                           </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                           <h3 className="font-semibold text-foreground">Demo</h3>
                           <p className="text-sm text-muted-foreground">demo@gmail.com</p>
                        </div>
                     </div>
                  </div>

                  {/* Navigation Menu */}
                  <nav className="space-y-1 p-4">
                     <Button
                        variant="default"
                        className="w-full justify-start gap-3 bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft"
                     >
                        <User className="h-4 w-4" />
                        Dashboard
                     </Button>

                     <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                     >
                        <User className="h-4 w-4" />
                        Profile
                     </Button>

                     <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                     >
                        <CreditCard className="h-4 w-4" />
                        Billing
                     </Button>
                  </nav>

                  {/* Logout Button */}
                  <div className="border-t border-border/50 p-4">
                     <Button
                        variant="destructive"
                        className="w-full justify-start gap-3 bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft"
                     >
                        <LogOut className="h-4 w-4" />
                        Logout
                     </Button>
                  </div>
               </div>
            </div>

            <main className="flex-1 overflow-auto">
               <div className="container mx-auto p-8 md:p-12">
                  {/* Header Section */}
                  <div className="mb-12">
                     <h1 className="mb-3 text-4xl font-semibold tracking-tight">Dashboard</h1>
                     <p className="text-lg text-muted-foreground">
                        Track your learning progress and continue where you left off
                     </p>
                  </div>

                  {/* Empty State */}
                  <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-border/50 bg-gradient-to-br from-card to-muted/30 shadow-soft backdrop-blur-sm">
                     <div className="mx-auto max-w-md text-center">
                        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent/80 shadow-medium">
                           <BookOpen className="h-8 w-8 text-accent-foreground" />
                        </div>

                        <h2 className="mb-3 text-2xl font-semibold">No courses yet</h2>
                        <p className="mb-8 text-muted-foreground">
                           Start learning by exploring our collection of courses
                        </p>

                        <Button
                           size="lg"
                           className="group bg-primary text-primary-foreground hover:bg-primary/90 shadow-medium transition-all hover:shadow-strong"
                        >
                           Explore Courses
                           <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                     </div>
                  </div>
               </div>
            </main>


         </div>
      </div>
   );
}
