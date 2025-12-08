'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, LogOut, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

export default function Header({ commonProps, headerProps }: { commonProps: any, headerProps: any }) {
   const { data: session, status: sessionStatus } = useSession();
   const pathname = usePathname();
   const [open, setOpen] = useState(false);

   const isActive = (path: string) => pathname === path;

   console.log({ commonProps })

   return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
         <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
               {commonProps?.logo?.url ?
                  <Image className='h-[50px]'
                     src={commonProps.logo.url}
                     alt={commonProps.logo.alt}
                     height={100}
                     width={100}
                  /> :
                  <>
                     <GraduationCap className="h-6 w-6 text-primary" />
                     <span className="text-xl font-bold text-primary">Market Makers</span>
                  </>
               }
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
               {headerProps.map((item: any) => (
                  <Link
                     key={`desktop-${item.id}`}
                     href={item.href}
                     className={`text-md font-medium transition-colors hover:text-primary ${isActive(item.href) ? 'text-primary' : 'text-foreground/60'
                        }`}
                  >
                     {item.label}
                  </Link>
               ))}
            </nav>

            <div className="flex items-center space-x-4">
               {/* Desktop Auth Buttons */}
               <div className="hidden md:flex items-center space-x-4">
                  {/* <ThemeToggle /> */}
                  {sessionStatus === 'loading' ? (
                     <Skeleton className='h-7 w-[100px]' />
                  ) : (
                     session && session.user ? (
                        <Link href="/dashboard">
                           <Button className="bg-primary text-primary-foreground hover:opacity-90">Dashboard</Button>
                        </Link>
                     ) : (
                        <>
                           <Link href="/login">
                              <Button variant="ghost" size="sm">
                                 Login
                              </Button>
                           </Link>
                           <Link href="/register">
                              <Button size="sm">Register</Button>
                           </Link>
                        </>
                     )
                  )}
               </div>

               {/* Mobile Menu */}
               <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                     <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                     </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                     <SheetHeader>
                        <SheetTitle className="flex items-center space-x-2">
                           <GraduationCap className="h-6 w-6 text-primary" />
                           <span>Market Makers</span>
                        </SheetTitle>
                     </SheetHeader>
                     <nav className="flex flex-col space-y-4 mt-8">
                        {headerProps.map((item: any) => (
                           <Link
                              key={`mobile-${item.id}`}
                              href={item.href}
                              className={`text-lg font-medium transition-colors hover:text-primary px-2 py-2 rounded-md ${isActive('/') ? 'text-primary bg-accent' : 'text-foreground'
                                 }`}
                           >
                              {item.label}
                           </Link>
                        ))}
                        {/* <Link href="/"
                           onClick={() => setOpen(false)}

                        >
                           Home
                        </Link>
                        <Link href="/courses"
                           onClick={() => setOpen(false)}
                           className={`text-lg font-medium transition-colors hover:text-primary px-2 py-2 rounded-md ${isActive('/courses') ? 'text-primary bg-accent' : 'text-foreground'
                              }`}
                        >
                           Courses
                        </Link> */}
                        {/* <Link href="/about"
                           onClick={() => setOpen(false)}
                           className={`text-lg font-medium transition-colors hover:text-primary px-2 py-2 rounded-md ${isActive('/about') ? 'text-primary bg-accent' : 'text-foreground'
                              }`}
                        >
                           About Us
                        </Link>
                        <Link href="/contact-us"
                           onClick={() => setOpen(false)}
                           className={`text-lg font-medium transition-colors hover:text-primary px-2 py-2 rounded-md ${isActive('/contact-us') ? 'text-primary bg-accent' : 'text-foreground'
                              }`}
                        >
                           Contact
                        </Link> */}

                        <div className="pt-4 border-t space-y-2">
                           {/* {user ? (
                    <>
                      <div className="text-sm text-muted-foreground px-2 py-2">
                        Welcome, {user.name}
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start" 
                        onClick={() => {
                          logout();
                          setOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : ( */}
                           <>
                              <Link href="/login" onClick={() => setOpen(false)} className="block">
                                 <Button variant="ghost" className="w-full">
                                    Login
                                 </Button>
                              </Link>
                              <Link href="/register" onClick={() => setOpen(false)} className="block">
                                 <Button className="w-full">Register</Button>
                              </Link>
                           </>
                           {/* )} */}
                        </div>
                     </nav>
                  </SheetContent>
               </Sheet>
            </div>
         </div>
      </header>
   );
};