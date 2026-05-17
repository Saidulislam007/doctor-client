import Link from "next/link";
import { Stethoscope, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // থার্ড-পার্টি ভার্সন এরর এড়াতে সব সোশ্যাল আইকন কাস্টম SVG দিয়ে ফিক্সড করা হলো
  const socialLinks = [
    { 
      name: "Facebook", 
      href: "https://facebook.com", 
      icon: () => (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ), 
      color: "hover:text-blue-600" 
    },
    { 
      name: "Twitter", 
      href: "https://twitter.com", 
      icon: () => (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ), 
      color: "hover:text-sky-500" 
    },
    { 
      name: "LinkedIn", 
      href: "https://linkedin.com", 
      icon: () => (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ), 
      color: "hover:text-blue-700" 
    },
    { 
      name: "Instagram", 
      href: "https://instagram.com", 
      icon: () => (
        <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ), 
      color: "hover:text-pink-600" 
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 xl:col-span-1">
            <Link href="/" className="flex items-center space-x-2 text-white font-bold text-xl">
              <Stethoscope className="h-6 w-6 text-indigo-400" />
              <span>MedReserve</span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Connecting patients with leading healthcare professionals. Empowering your wellness through simplified, direct scheduling with verified clinical practitioners.
            </p>
          </div>

          {/* Quick Informational Links */}
          <div className="mt-8 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Services</h3>
                <ul className="mt-4 space-y-2">
                  <li><span className="text-sm hover:text-white transition-colors cursor-pointer">Primary Care</span></li>
                  <li><span className="text-sm hover:text-white transition-colors cursor-pointer">Specialist Consults</span></li>
                  <li><span className="text-sm hover:text-white transition-colors cursor-pointer">Telehealth Portal</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Support</h3>
                <ul className="mt-4 space-y-2">
                  <li><span className="text-sm hover:text-white transition-colors cursor-pointer">Help Center</span></li>
                  <li><span className="text-sm hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
                  <li><span className="text-sm hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
                </ul>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="flex flex-col space-y-4 items-end justify-start">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider self-start md:self-end">
                Follow Our Practice
              </h3>
              <div className="flex space-x-5 self-start md:self-end">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-slate-400 transition-colors duration-200 ${item.color}`}
                      aria-label={item.name}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {currentYear} MedReserve Inc. All rights reserved. Hospital and Clinic partners adhere to national health guidelines.</p>
          <p className="mt-2 md:mt-0 font-medium text-slate-400">Emergency Care Hotlines: 911 / 988</p>
        </div>
      </div>
    </footer>
  );
}