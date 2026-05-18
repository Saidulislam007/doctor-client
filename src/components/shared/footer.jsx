"use client";

import Link from "next/link";
import { Stethoscope, MapPin, Phone, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // স্ক্রল টু টপ ফাংশনালিটি (মকআপের গ্রিন আপ-অ্যারো বাটনের জন্য)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // মকআপ স্টাইলের বর্ডারড ও ব্যাকগ্রাউন্ড-সেফ সোশ্যাল আইকন ম্যাট্রিক্স
  const socialLinks = [
    { 
      name: "Twitter", 
      href: "https://twitter.com", 
      icon: () => (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      )
    },
    { 
      name: "LinkedIn", 
      href: "https://linkedin.com", 
      icon: () => (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
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
      )
    },
    { 
      name: "Facebook", 
      href: "https://facebook.com", 
      icon: () => (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      )
    },
  ];

  return (
    <footer className="w-full bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-emerald-100/90 pt-10 pb-6 mt-auto border-t border-emerald-950">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Main Grid: pb-12 কমিয়ে pb-8 করা হয়েছে এবং গ্যাপ কমানো হয়েছে */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start pb-8 border-b border-emerald-800/40">
      
      {/* LEFT COLUMN: Contact Us Block (space-y-6 কমিয়ে space-y-4 করা হয়েছে) */}
      <div className="lg:col-span-5 space-y-4">
        <h3 className="text-xl font-bold text-white tracking-tight">Contact Us</h3>
        
        {/* space-y-4 কমিয়ে space-y-2.5 করা হয়েছে যাতে ভার্টিক্যাল হাইট কমে */}
        <div className="space-y-2.5 text-sm font-medium">
          {/* Address */}
          <div className="flex items-center space-x-3 text-emerald-200/90">
            <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>250 road -6 , NewYork, United State</span>
          </div>
          
          {/* Phone */}
          <div className="flex items-center space-x-3 text-emerald-200/90">
            <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
            <a href="tel:+013233834857" className="hover:text-white transition-colors">+013233834857</a>
          </div>
          
          {/* Email */}
          <div className="flex items-center space-x-3 text-emerald-200/90">
            <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
            <a href="mailto:example@gmail.com" className="hover:text-white transition-colors">example@gmail.com</a>
          </div>
        </div>

        {/* ইমেজের হাইট h-28 থেকে কমিয়ে h-20 করা হয়েছে যাতে ফুটারের উচ্চতা অনেক কমে আসে */}
        <div className="relative w-36 h-20 overflow-hidden rounded-xl border-4 border-emerald-800/40 shadow-md transform hover:scale-[1.02] transition-transform duration-300">
          <img 
            src="https://images.unsplash.com/photo-1582213726894-448e46924829?q=80&w=400&auto=format&fit=crop" 
            alt="MedReserve clinical team care" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* RIGHT COLUMN: Social Channels Block (space-y-6 কমানো হয়েছে) */}
      <div className="lg:col-span-7 space-y-4 lg:pl-12 flex flex-col h-full justify-between">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white tracking-tight">Our Social Channels</h3>
          <p className="text-emerald-200/70 text-sm max-w-md leading-relaxed">
            The latest insights, resources, expert opinions and company news delivered transparently.
          </p>
          
          {/* Custom Framed White-Box Social Media Row */}
          <div className="flex flex-wrap gap-3 pt-1">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-xl bg-white text-emerald-900 border border-emerald-700/20 hover:bg-emerald-50 active:scale-95 transition-all duration-200 shadow-sm"
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

    {/* BOTTOM SECTION: mt-8 কমিয়ে mt-5 করা হয়েছে */}
    <div className="mt-5 flex flex-col md:flex-row justify-between items-center gap-4">
      
      {/* Bottom Left: Legal Strings */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-200/60 order-2 md:order-1">
        <Link href="#" className="hover:text-white transition-colors">Terms & conditions</Link>
        <span>|</span>
        <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
        <span>|</span>
        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
        <span className="ml-2 text-[11px] text-emerald-300/40 font-normal">
          &copy; {currentYear} MedReserve Inc.
        </span>
      </div>

      {/* Bottom Right: Up-Arrow */}
      <div className="flex items-center space-x-4 order-1 md:order-2 w-full md:w-auto justify-between md:justify-end">
        {/* Dynamic Back to Top Trigger Button */}
        <button
          onClick={scrollToTop}
          className="p-2 bg-[#ccff33] text-emerald-950 hover:bg-[#b8e62d] rounded-full shadow-md active:scale-90 transition-all shrink-0"
          aria-label="Scroll back to header root"
        >
          <ArrowUp className="h-4 w-4 stroke-[3]" />
        </button>
      </div>

    </div>

  </div>
</footer>
  );
}