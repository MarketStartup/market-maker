"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import heroImage from '@/public/assets/hero-learning.jpg';
// import HeroBadge from "@/components/ui/hero-badge";

const ease = [0.16, 1, 0.3, 1] as const;

interface HeroContentProps {
   title: string;
   titleHighlight?: string;
   description: string;
   primaryAction?: {
      href: string;
      text: string;
      icon?: React.ReactNode;
   };
   secondaryAction?: {
      href: string;
      text: string;
      icon?: React.ReactNode;
   };
}

interface HeroProps {
   pill?: {
      href?: string;
      text: string;
      icon?: React.ReactNode;
      endIcon?: React.ReactNode;
      variant?: "default" | "outline" | "ghost";
      size?: "sm" | "md" | "lg";
      className?: string;
   };
   content: HeroContentProps;
   preview?: React.ReactNode;
}

function HeroContent({
   title,
   titleHighlight,
   description,
   primaryAction,
   secondaryAction,
}: HeroContentProps) {
   return (
      <div className="flex flex-col space-y-4">
         <motion.h1
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
         >
            {title}{" "}
            {titleHighlight && (
               <span className="text-primary">{titleHighlight}</span>
            )}
         </motion.h1>
         <motion.p
            className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease }}
         >
            {description}
         </motion.p>
         <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease }}
         >
            {primaryAction && (
               <Link
                  href={primaryAction.href}
                  className={cn(
                     buttonVariants({ size: "lg" }),
                     "gap-2 w-full sm:w-auto justify-center"
                  )}
               >
                  {primaryAction.icon}
                  {primaryAction.text}
               </Link>
            )}
            {secondaryAction && (
               <Link
                  href={secondaryAction.href}
                  className={cn(
                     buttonVariants({ variant: "outline", size: "lg" }),
                     "gap-2 w-full sm:w-auto justify-center"
                  )}
               >
                  {secondaryAction.icon}
                  {secondaryAction.text}
               </Link>
            )}
         </motion.div>
      </div>
   );
}

const Hero = ({ content }: HeroProps) => {

   return (
      <div className="container relative overflow-hidden">
         <div className="flex flex-col lg:flex-row items-center py-24 px-4 md:px-8 lg:px-12">
            <div className="flex flex-col gap-4 w-full lg:max-w-2xl">
               {/* {pill && <HeroBadge {...pill} />} */}
               <HeroContent {...content} />
            </div>
            <div className="w-full lg:max-w-xl lg:pl-16 mt-12 lg:mt-0">
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="rounded-xl overflow-hidden shadow-2xl"
               >
                  <Image
                     src={heroImage}
                     alt="Professional learning environment"
                     className="w-full h-auto object-cover"
                  />
               </motion.div>
            </div>
         </div>
      </div>
   );
};

export { Hero };
