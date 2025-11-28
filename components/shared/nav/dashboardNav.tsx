"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface NavItem {
   label: string;
   href: string;
}

const navItems: NavItem[] = [
   { label: "Dashboard", href: "/dashboard" },
   { label: "Profile", href: "/profile" },
   { label: "Billing", href: "/billing" },
];

export function DashboardNav() {
   const pathname = usePathname();

   return (
      <div className="flex flex-col space-y-3">
         {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
               <Link key={item.href} href={item.href}>
                  <Button
                     variant={isActive ? "default" : "outline"}
                     className="w-full justify-start"
                  >
                     {item.label}
                  </Button>
               </Link>
            );
         })}
      </div>
   );
}
