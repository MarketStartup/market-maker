import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/shared/nav/dashboardNav";
import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/logoutButton";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const session = await auth();

   if (!session)
      redirect('/login');

   const user = session.user;
   const initials = [user?.firstName?.[0], user?.lastName?.[0]].filter(Boolean).join('').toUpperCase() || 'U';
   const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'User';

   return (
      <main className="flex-1">
         <div className="container py-9">
            <div className="grid gap-8 md:grid-cols-[260px_minmax(0,1fr)]">
               {/* Sidebar */}
               <aside className="md:sticky md:top-26 h-max">
                  <Card className="shadow-sm overflow-hidden py-0">
                     {/* Profile header */}
                     <div className="bg-gradient-to-br from-primary/10 to-primary/5 px-4 pt-6 pb-4 border-b border-border">
                        <div className="flex flex-col items-center text-center">
                           <Avatar className="h-16 w-16 mb-3 ring-2 ring-primary/20 ring-offset-2">
                              <AvatarImage src="/avatar-placeholder.png" alt={fullName} />
                              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
                                 {initials}
                              </AvatarFallback>
                           </Avatar>
                           <p className="font-bold text-foreground">{fullName}</p>
                           {user?.email && (
                              <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-full px-2">
                                 {user.email}
                              </p>
                           )}
                        </div>
                     </div>

                     <CardContent className="flex flex-col space-y-4 p-4">
                        <DashboardNav />
                        <div className="pt-2 border-t border-border">
                           <LogoutButton />
                        </div>
                     </CardContent>
                  </Card>
               </aside>

               {/* Page content */}
               <section className="min-h-[400px] lg:ml-3">
                  {children}
               </section>
            </div>
         </div>
      </main>
   );
}
