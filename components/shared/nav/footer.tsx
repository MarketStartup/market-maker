import Link from 'next/link';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer({ props }: { props: any }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Market Makers</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Empowering learners worldwide with high-quality, affordable online education and expert instruction.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-[var(--color-primary)] rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-[var(--color-primary)] rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-[var(--color-primary)] rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-[var(--color-primary)] rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {props.quickItems &&
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {props.quickItems.map((item: any) => (
                  <li key={item.id}>
                    <Link href={item.href} className="text-gray-400 hover:text-[var(--color-primary)] transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          }

          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">support@mm.com</p>
                  <p className="text-gray-400">info@mm.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                  <p className="text-gray-500 text-sm">Mon-Fri, 9am-6pm EST</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">123 Learning Street</p>
                  <p className="text-gray-400">San Francisco, CA 94102</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Market Makers. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className='hover:underline'>
              Privacy Policy
            </a>
            <a href="#" className='hover:underline'>
              Terms of Service
            </a>
            {/* <a href="#" className='hover:underline'>
              Cookie Settings
            </a> */}
          </nav>
        </div>
      </div>
    </footer>
  );
}
