'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Award, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConfirmPayment() {
   return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
         <div className="max-w-md w-full space-y-8">
            <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ type: "spring", stiffness: 200, damping: 15 }}
               className="text-center"
            >
               <div className="relative inline-block">
                  <motion.div
                     animate={{
                        scale: [1, 1.2, 1],
                     }}
                     transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                     }}
                     className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                  />
                  <CheckCircle className="h-32 w-32 text-primary relative z-10 mx-auto" />
               </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-center space-y-6"
            >
               <h1 className="text-4xl font-bold">
                  Congratulations! 🎉
               </h1>

               <div className="space-y-4">
                  <p className="text-muted-foreground text-lg">
                     You've successfully enrolled in
                  </p>
                  <p className="font-semibold text-2xl text-foreground">
                     Course Title
                  </p>

                  <div className="bg-muted rounded-lg p-6 space-y-2">
                     <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Award className="h-5 w-5" />
                        <span>Payment Confirmed: $100</span>
                     </div>
                  </div>

                  <p className="text-muted-foreground">
                     Start learning now and unlock your potential!
                  </p>
               </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="space-y-4"
            >
               <Link href='/enrolled'>
                  <Button asChild className="w-full">
                     <a>
                        Go to My Courses
                        <ArrowRight className="ml-2 h-4 w-4" />
                     </a>
                  </Button>
               </Link>
               {/* <Button
                  onClick={() => navigate('/courses')}
                  variant="outline"
                  className="w-full"
                  size="lg"
               >
                  Browse More Courses
               </Button> */}
            </motion.div>
         </div>
      </div>
   );
};
