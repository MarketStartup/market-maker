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
} from "@/components/ui/field"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

export default function ContactForm() {
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
               // onSubmit={handleSubmit}
               >
                  <div className="grid md:grid-cols-2 gap-4">
                     <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input
                           id="name"
                           name="name"
                           placeholder="John Doe"
                           // value={formData.name}
                           // onChange={handleChange}
                           required
                        />
                     </Field>
                     <Field>
                        <FieldLabel htmlFor="email">Email Address</FieldLabel>
                        <Input
                           id="email"
                           name="email"
                           type="email"
                           placeholder="john@example.com"
                           // value={formData.email}
                           // onChange={handleChange}
                           required
                        />
                     </Field>
                  </div>

                  <Field>
                     <FieldLabel htmlFor="subject">Subject</FieldLabel>
                     <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help you?"
                        // value={formData.subject}
                        // onChange={handleChange}
                        required
                     />
                  </Field>

                  <Field>
                     <FieldLabel htmlFor="message">Message</FieldLabel>
                     <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        // value={formData.message}
                        // onChange={handleChange}
                        className="min-h-[150px]"
                        required
                     />
                  </Field>

                  <Button type="submit" className="w-full" size="lg">
                     <Send className="mr-2 h-4 w-4" />
                     Send Message
                  </Button>
               </form>
            </CardContent>
         </Card>
      </div>
   )
}
