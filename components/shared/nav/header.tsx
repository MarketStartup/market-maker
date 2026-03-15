'use client'

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { GraduationCap, LayoutDashboard, LogIn, Menu, UserPlus, X } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function Header({ commonProps, headerProps }: { commonProps: any, headerProps: any }) {
   const { data: session, status: sessionStatus } = useSession();
   const pathname = usePathname();
   const [open, setOpen] = useState(false);

   const isActive = (path: string) => pathname === path;

   const user = session?.user;
   const initials = [user?.firstName?.[0], user?.lastName?.[0]].filter(Boolean).join('').toUpperCase() || 'U';
   const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ');

   const Logo = () => (
      commonProps?.logo?.url ? (
         <Image
            className="h-[50px] w-auto"
            src={commonProps.logo.url}
            alt={commonProps.logo.alt}
            height={100}
            width={100}
         />
      ) : (
         <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">Market Makers</span>
         </div>
      )
   );

   return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
               <Logo />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
               {headerProps.map((item: any) => (
                  <Link
                     key={`desktop-${item.id}`}
                     href={item.href}
                     className={`text-md font-medium transition-colors hover:text-primary ${isActive(item.href) ? 'text-primary' : 'text-foreground/60'}`}
                  >
                     {item.label}
                  </Link>
               ))}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-3">
               {sessionStatus === 'loading' ? (
                  <Skeleton className="h-9 w-[100px]" />
               ) : user ? (
                  <Link href="/dashboard">
                     <Button className="bg-primary text-primary-foreground hover:opacity-90">Dashboard</Button>
                  </Link>
               ) : (
                  <>
                     <Link href="/login">
                        <Button variant="ghost" size="sm">Login</Button>
                     </Link>
                     <Link href="/register">
                        <Button size="sm">Register</Button>
                     </Link>
                  </>
               )}
            </div>

            {/* Mobile Menu Trigger */}
            <Sheet open={open} onOpenChange={setOpen}>
               <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                     <Menu className="h-5 w-5" />
                  </Button>
               </SheetTrigger>

               <SheetContent side="right" className="w-[280px] p-0 flex flex-col" hideCloseButton>
                  {/* Sheet Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b">
                     <Link href="/" onClick={() => setOpen(false)}>
                        <Logo />
                     </Link>
                     <button
                        onClick={() => setOpen(false)}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                     >
                        <X className="h-5 w-5" />
                     </button>
                  </div>

                  {/* User info (when logged in) */}
                  {sessionStatus === 'loading' ? (
                     <div className="flex items-center gap-3 px-5 py-4 border-b">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-1.5">
                           <Skeleton className="h-3.5 w-28" />
                           <Skeleton className="h-3 w-36" />
                        </div>
                     </div>
                  ) : user ? (
                     <div className="flex items-center gap-3 px-5 py-4 border-b bg-muted/40">
                        <Avatar className="h-10 w-10 shrink-0 ring-2 ring-primary/20">
                           <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                              {initials}
                           </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                           <p className="text-sm font-semibold text-foreground truncate">{fullName}</p>
                           <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                     </div>
                  ) : null}

                  {/* Nav Links */}
                  <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                     {headerProps.map((item: any) => (
                        <Link
                           key={`mobile-${item.id}`}
                           href={item.href}
                           onClick={() => setOpen(false)}
                           className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                              isActive(item.href)
                                 ? 'bg-primary text-primary-foreground'
                                 : 'text-foreground hover:bg-muted'
                           }`}
                        >
                           {item.label}
                           {isActive(item.href) && (
                              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                           )}
                        </Link>
                     ))}
                  </nav>

                  {/* Auth Section */}
                  <div className="px-4 py-4 border-t space-y-2">
                     {sessionStatus === 'loading' ? (
                        <Skeleton className="h-9 w-full" />
                     ) : user ? (
                        <Link href="/dashboard" onClick={() => setOpen(false)}>
                           <Button className="w-full gap-2">
                              <LayoutDashboard className="h-4 w-4" />
                              Go to Dashboard
                           </Button>
                        </Link>
                     ) : (
                        <>
                           <Link href="/login" onClick={() => setOpen(false)}>
                              <Button variant="outline" className="w-full gap-2 mb-3">
                                 <LogIn className="h-4 w-4" />
                                 Login
                              </Button>
                           </Link>
                           <Link href="/register" onClick={() => setOpen(false)}>
                              <Button className="w-full gap-2">
                                 <UserPlus className="h-4 w-4" />
                                 Register
                              </Button>
                           </Link>
                        </>
                     )}
                  </div>
               </SheetContent>
            </Sheet>
         </div>
      </header>
   );
}
