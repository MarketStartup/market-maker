"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import heroImage from '@/public/assets/hero-learning.jpg';
import { ArrowRight, ArrowRightLeft } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const HomeBanner = ({ props }: any) => {
   console.log({ props });

   return (
      <div className="bg-white relative overflow-hidden">
         <div className="container flex flex-col lg:flex-row items-center py-24">
            <div className="flex flex-col gap-4 w-full lg:max-w-2xl">
               {/* {pill && <HeroBadge {...pill} />} */}

               <div className="flex flex-col space-y-4">
                  <motion.h1
                     className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, ease }}
                  >
                     {props.title}
                     {/* {" "} */}
                     {/* {titleHighlight && (
                        <span className="text-primary">{titleHighlight}</span>
                     )} */}
                  </motion.h1>
                  <motion.p
                     className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1, duration: 0.8, ease }}
                  >
                     {props.subtitle}
                  </motion.p>
                  <motion.div
                     className="flex flex-col sm:flex-row gap-4 pt-4"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.2, duration: 0.8, ease }}
                  >
                     {props.primaryAction && (
                        <Link
                           href={props.primaryAction.href}
                           className={cn(
                              buttonVariants({ size: "lg" }),
                              "gap-2 w-full sm:w-auto justify-center"
                           )}
                        >
                           <ArrowRight />
                           {props.primaryAction.label}
                        </Link>
                     )}
                     {props.secondaryAction && (
                        <Link
                           href={props.secondaryAction.href}
                           className={cn(
                              buttonVariants({ variant: "outline", size: "lg" }),
                              "gap-2 w-full sm:w-auto justify-center"
                           )}
                        >
                           <ArrowRightLeft />
                           {props.secondaryAction.label}
                        </Link>
                     )}
                  </motion.div>
               </div>

            </div>
            <div className="w-full lg:pl-16 mt-12 lg:mt-0">
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="rounded-lg overflow-hidden shadow-2xl"
               >
                  <Image
                     src={props?.image?.url || heroImage}
                     alt="Professional learning environment"
                     className="w-full h-auto object-cover"
                     height={1000}
                     width={1000}
                  />
               </motion.div>
            </div>
         </div>
      </div>
   );
};

export default HomeBanner;
