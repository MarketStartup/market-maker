import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ commonProps, footerProps }: { commonProps: any, footerProps: any }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            {commonProps?.logo?.url ?
              <Image className='h-[50px]'
                src={commonProps.logo.url}
                alt={commonProps.logo.alt}
                height={100}
                width={100}
              /> :
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Market Makers</span>
              </div>
            }
            <p className="text-gray-400 leading-relaxed mb-6">
              {commonProps.footerDescription}
            </p>
            {commonProps.socials &&
              <div className="flex gap-4">
                {commonProps.socials.map((social: { id: string; icon: { url: string, alt: string }; href: string }) => (
                  <a
                    key={social.id}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 hover:bg-[var(--color-primary)] rounded-full flex items-center justify-center transition-colors"
                  >
                    <Image
                      className="w-5 h-5"
                      src={social.icon.url}
                      alt={social.icon.alt}
                      height={100}
                      width={100}
                    />
                  </a>
                ))}
              </div>
            }
          </div>

          {footerProps.quickLinks &&
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {footerProps.quickLinks.map((item: { id: string; label: string; href: string }) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-[var(--color-primary)] transition-colors"
                    >
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
              {commonProps.emails &&
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                  <div>
                    {commonProps.emails.map((item: { id: string; email: string }) => (
                      <p key={item.id} className="text-gray-400">{item.email}</p>
                    ))}
                  </div>
                </div>
              }
              {commonProps.mobiles &&
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                  <div>
                    {commonProps.mobiles.map((item: { id: string; mobile: string }) => (
                      <p key={item.id} className="text-gray-400">{item.mobile}</p>
                    ))}
                  </div>
                </div>
              }
              {commonProps.address &&
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-400">{commonProps.address}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Market Makers. All rights reserved.
          </p>
          <nav className="flex flex-wrap text-sm gap-3 justify-center">
            {footerProps.policies.map((item: { id: string; label: string; href: string }) => (
              <Link
                key={item.id}
                href={item.href}
                className='hover:underline'
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
