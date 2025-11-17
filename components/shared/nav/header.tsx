'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export default function Header() {
   //   const { user, logout } = useAuth();
   const pathname = usePathname();
   const [open, setOpen] = useState(false);

   const isActive = (path: string) => pathname === path;

   return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
         <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
               <GraduationCap className="h-6 w-6 text-primary" />
               <span className="text-xl font-bold text-primary">Market Makers</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
               <Link href="/"
                  className={`text-md font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-foreground/60'
                     }`}
               >
                  Home
               </Link>
               <Link href="/courses"
                  className={`text-md font-medium transition-colors hover:text-primary ${isActive('/courses') ? 'text-primary' : 'text-foreground/60'
                     }`}
               >
                  Courses
               </Link>
               {/* {user && (
            <Link
              to="/enrolled"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/enrolled') ? 'text-primary' : 'text-foreground/60'
              }`}
            >
              My Courses
            </Link>
          )} */}
               <Link href="/about"
                  className={`text-md font-medium transition-colors hover:text-primary ${isActive('/about') ? 'text-primary' : 'text-foreground/60'
                     }`}
               >
                  About Us
               </Link>
               <Link href="/contact-us"
                  className={`text-md font-medium transition-colors hover:text-primary ${isActive('/contact-us') ? 'text-primary' : 'text-foreground/60'
                     }`}
               >
                  Contact
               </Link>
            </nav>

            <div className="flex items-center space-x-4">
               {/* Desktop Auth Buttons */}
               <div className="hidden md:flex items-center space-x-4">
                  {/* {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  Welcome, {user.name}
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : ( */}
                  <>
                     <Link href="/login">
                        <Button variant="ghost" size="sm">
                           Login
                        </Button>
                     </Link>
                     <Link href="/register">
                        <Button size="sm">Get Started</Button>
                     </Link>
                  </>
                  {/* )} */}
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
                        <Link href="/"
                           onClick={() => setOpen(false)}
                           className={`text-lg font-medium transition-colors hover:text-primary px-2 py-2 rounded-md ${isActive('/') ? 'text-primary bg-accent' : 'text-foreground'
                              }`}
                        >
                           Home
                        </Link>
                        <Link href="/courses"
                           onClick={() => setOpen(false)}
                           className={`text-lg font-medium transition-colors hover:text-primary px-2 py-2 rounded-md ${isActive('/courses') ? 'text-primary bg-accent' : 'text-foreground'
                              }`}
                        >
                           Courses
                        </Link>
                        {/* {user && (
                  <Link
                    to="/enrolled"
                    onClick={() => setOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-primary px-2 py-2 rounded-md ${
                      isActive('/enrolled') ? 'text-primary bg-accent' : 'text-foreground'
                    }`}
                  >
                    My Courses
                  </Link>
                )} */}
                        <Link href="/about"
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
                        </Link>

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
                                 <Button className="w-full">Get Started</Button>
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