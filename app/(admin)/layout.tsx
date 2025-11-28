import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/shared/nav/dashboardNav";
import { handleSignOut } from "@/actions/auth-actions";
import { LogOut } from "lucide-react";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const session = await auth();

   if (!session)
      redirect('/login');

   return (
      <main className="flex-1">
         <div className="container py-9">
            <div className="grid gap-8 md:grid-cols-[260px_minmax(0,1fr)]">
               {/* Card-style "sidebar" */}
               <aside className="md:sticky md:top-26 h-max">
                  <Card className="shadow-sm">
                     <CardContent className="flex flex-col space-y-3 p-4">
                        <div className="flex flex-col items-center space-x-3 pb-3 border-b">
                           <Avatar className="h-18 w-18 mb-4">
                              <AvatarImage src="/avatar-placeholder.png" alt="User" />
                              <AvatarFallback>U</AvatarFallback>
                           </Avatar>
                           <p className="font-bold">{session.user?.firstName}</p>
                           <p className="text-md text-muted-foreground">
                              {session.user?.email}
                           </p>
                        </div>

                        <DashboardNav />

                        <form action={handleSignOut} className="w-full">
                           <button className="flex w-full items-center px-2 py-1.5 hover:cursor-pointer">
                              <LogOut color="red" className="mr-2 size-4" />
                              Log out
                           </button>
                        </form>

                        {/* <Button
                           variant='destructive'
                           className="w-full justify-start"
                           onClick={() => handleSignOut()}
                        >
                           Logout
                        </Button> */}
                     </CardContent>
                  </Card>
               </aside>

               {/* Page content */}
               <section className="min-h-[400px] lg:ml-3">
                  {children}
               </section>
            </div>
         </div>
      </main >
   );
}
