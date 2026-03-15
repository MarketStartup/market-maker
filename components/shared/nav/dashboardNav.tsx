"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, CreditCard } from "lucide-react";

interface NavItem {
   label: string;
   href: string;
   icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
   { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
   { label: "Profile", href: "/profile", icon: User },
   { label: "Billing", href: "/billing", icon: CreditCard },
];

export function DashboardNav() {
   const pathname = usePathname();

   return (
      <nav className="flex flex-col space-y-1">
         {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
               <Link key={item.href} href={item.href}>
                  <div
                     className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                           ? "bg-primary text-primary-foreground"
                           : "text-muted-foreground hover:bg-muted hover:text-foreground"
                     }`}
                  >
                     <Icon className="w-4 h-4 shrink-0" />
                     {item.label}
                  </div>
               </Link>
            );
         })}
      </nav>
   );
}
