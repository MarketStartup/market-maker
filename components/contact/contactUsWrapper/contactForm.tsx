'use client'

import { useForm } from 'react-hook-form'
import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent
} from '@/components/ui/card'
import {
   Field,
   FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Send } from 'lucide-react'
import { useRouter } from "next/navigation"
import { createInquiryAction } from '@/actions/contact-actions'

type ContactFormValues = {
   fullName: string
   email: string
   subject: string
   message: string
}

export default function ContactForm() {
   const router = useRouter()
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset
   } = useForm<ContactFormValues>({
      mode: 'onBlur',
   })

   const onSubmit = async (data: ContactFormValues) => {
      console.log('Form Data:', data)
      const result = await createInquiryAction(data)
      if (result.status) {
         reset()
         router.push(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/thank-you`)
      } else {
         toast.error(result.message || 'Something went wrong. Please try again.')
      }
   }

   return (
      <div className="md:col-span-2">
         <Card className="border-border/50 shadow-lg">
            <CardHeader>
               <CardTitle className="text-2xl">Send us a Message</CardTitle>
               <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
               </CardDescription>
            </CardHeader>

            <CardContent>
               <form
                  className="space-y-6"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
               >
                  <div className="grid md:grid-cols-2 gap-4">
                     <Field>
                        <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                        <Input
                           id="fullName"
                           placeholder="John Doe"
                           {...register('fullName', {
                              required: 'Full name is required',
                           })}
                        />
                        {errors.fullName && (
                           <p className="text-sm text-destructive mt-1">
                              {errors.fullName.message}
                           </p>
                        )}
                     </Field>

                     <Field>
                        <FieldLabel htmlFor="email">Email Address</FieldLabel>
                        <Input
                           id="email"
                           type="email"
                           placeholder="john@example.com"
                           {...register('email', {
                              required: 'Email address is required',
                              pattern: {
                                 value: /^\S+@\S+\.\S+$/,
                                 message: 'Enter a valid email address',
                              },
                           })}
                        />
                        {errors.email && (
                           <p className="text-sm text-destructive mt-1">
                              {errors.email.message}
                           </p>
                        )}
                     </Field>
                  </div>

                  <Field>
                     <FieldLabel htmlFor="subject">Subject</FieldLabel>
                     <Input
                        id="subject"
                        placeholder="How can we help you?"
                        {...register('subject', {
                           required: 'Subject is required',
                        })}
                     />
                     {errors.subject && (
                        <p className="text-sm text-destructive mt-1">
                           {errors.subject.message}
                        </p>
                     )}
                  </Field>

                  <Field>
                     <FieldLabel htmlFor="message">Message</FieldLabel>
                     <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        className="min-h-[150px]"
                        {...register('message', {
                           required: 'Message is required',
                           minLength: {
                              value: 10,
                              message: 'Message must be at least 10 characters',
                           },
                        })}
                     />
                     {errors.message && (
                        <p className="text-sm text-destructive mt-1">
                           {errors.message.message}
                        </p>
                     )}
                  </Field>

                  <Button
                     type="submit"
                     className="w-full"
                     size="lg"
                     disabled={isSubmitting}
                  >
                     <Send className="mr-2 h-4 w-4" />
                     {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
               </form>
            </CardContent>
         </Card>
      </div>
   )
}
