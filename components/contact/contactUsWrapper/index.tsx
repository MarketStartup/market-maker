import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent
} from '@/components/ui/card'
import { Mail, Phone, MapPin } from 'lucide-react'
import { getCommonData } from '@/lib/api';
import ContactForm from './contactForm'

export default async function ContactFormWrapper() {
   const commonData = await getCommonData();

   return (
      <section className="py-16">
         <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
               {/* Contact Form */}
               <ContactForm />

               {/* Contact Information */}
               <div className="space-y-6">
                  <Card className="border-border/50 shadow-lg">
                     <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>
                           Reach out to us through any of these channels.
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        {commonData.emails &&
                           <div className="flex items-start gap-4">
                              <div className="p-3 rounded-lg bg-accent text-primary">
                                 <Mail className="h-5 w-5" />
                              </div>
                              <div>
                                 <h3 className="font-semibold mb-1">Email</h3>
                                 {commonData.emails.map((item: { id: string; email: string }) => (
                                    <p key={item.id} className="text-sm text-muted-foreground">
                                       support@learnhub.com
                                    </p>
                                 ))}
                              </div>
                           </div>
                        }

                        {commonData.mobiles &&
                           <div className="flex items-start gap-4">
                              <div className="p-3 rounded-lg bg-accent text-primary">
                                 <Phone className="h-5 w-5" />
                              </div>
                              <div>
                                 <h3 className="font-semibold mb-1">Phone</h3>
                                 {commonData.mobiles.map((item: { id: string; mobile: string }) => (
                                    <p key={item.id} className="text-sm text-muted-foreground">
                                       +1 (555) 123-4567
                                    </p>
                                 ))}
                              </div>
                           </div>
                        }
                        {commonData.address &&
                           <div className="flex items-start gap-4">
                              <div className="p-3 rounded-lg bg-accent text-primary">
                                 <MapPin className="h-5 w-5" />
                              </div>
                              <div>
                                 <h3 className="font-semibold mb-1">Address</h3>
                                 <p className="text-sm text-muted-foreground">
                                    {commonData.address}
                                 </p>
                              </div>
                           </div>
                        }
                     </CardContent>
                  </Card>

                  <Card className="border-border/50 shadow-lg">
                     <CardHeader>
                        <CardTitle>Contact Hours</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                           <span className="text-muted-foreground">Monday - Friday</span>
                           <span className="font-medium">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-muted-foreground">Saturday</span>
                           <span className="font-medium">10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-muted-foreground">Sunday</span>
                           <span className="font-medium">Closed</span>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </section>
   )
}
