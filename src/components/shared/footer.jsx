"use client";

import Link from "next/link";
import { Stethoscope, MapPin, Phone, Mail, ArrowUp, Activity, ShieldCheck, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { 
      name: "Twitter", 
      href: "https://twitter.com", 
      icon: () => (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      )
    },
    { 
      name: "LinkedIn", 
      href: "https://linkedin.com", 
      icon: () => (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    { 
      name: "Instagram", 
      href: "https://instagram.com", 
      icon: () => (
        <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
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
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      )
    },
  ];

  return (
    <footer className="w-full bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-slate-300 pt-12 pb-6 mt-auto border-t border-slate-900 relative">
      {/* গ্লো টোন এফেক্টস */}
      <div className="absolute left-0 bottom-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= MAIN FOOTER BLOCKS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-10 border-b border-slate-800/60">
          
          {/* LEFT CONTAINER: কন্টাক্ট ইনফো কার্ড */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-2 text-emerald-400">
              <Stethoscope className="h-5 w-5 stroke-[2.5]" />
              <span className="font-black tracking-tight text-lg uppercase text-white">MedReserve</span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Your trusted partner in precision diagnostics and board-certified medical practitioner scheduling ecosystems.
            </p>

            <div className="space-y-3 text-sm font-semibold text-slate-300">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>250 road -6 , NewYork, United State</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href="tel:+013233834857" className="hover:text-emerald-400 transition-colors">+013233834857</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href="mailto:example@gmail.com" className="hover:text-emerald-400 transition-colors">example@gmail.com</a>
              </div>
            </div>
          </div>

          {/* RIGHT CONTAINER: সোশ্যাল এবং মকআপ স্টাইল ম্যাট্রিক্স */}
          <div className="lg:col-span-7 space-y-6 lg:pl-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <h3 className="text-lg font-black tracking-tight text-white uppercase text-[11px] bg-slate-900 border border-slate-800 px-3 py-1 rounded-md inline-block">
                Our Channels & Stats
              </h3>
              
              {/* 🎯 মকআপের আদলে ৩-কলাম ইনফো স্টাইল */}
              <div className="grid grid-cols-3 gap-4 bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl max-w-md text-left">
                <div>
                  <p className="text-white font-black text-sm">24/7</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">Operations</p>
                </div>
                <div>
                  <p className="text-white font-black text-sm">200+</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">Clinics</p>
                </div>
                <div>
                  <p className="text-amber-400 font-black text-sm">4.9 ★</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">Global Grade</p>
                </div>
              </div>

              {/* 🎯 মকআপের "Hard Level" এর আদলে পিঙ্ক প্রোগ্রেস বার ইন্টিগ্রেশন */}
              <div className="space-y-1.5 max-w-sm text-left">
                <div className="flex items-center justify-between text-[11px] font-bold tracking-tight text-slate-400">
                  <span className="uppercase">Server Triage Load</span>
                  <span className="text-emerald-400">Optimal 42%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-[2px]">
                  <div className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-[#ff477e] rounded-full w-[42%] transition-all duration-500" />
                </div>
              </div>
            </div>

            {/* সোশ্যাল আইকন ব্লক */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:text-white hover:bg-emerald-800 hover:border-emerald-700/30 active:scale-95 transition-all duration-200"
                    aria-label={item.name}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* ================= BOTTOM METRICS FOOTER ================= */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 pt-2">
          
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 order-2 md:order-1">
            <Link href="#" className="hover:text-slate-300 transition-colors">Terms & conditions</Link>
            <span>|</span>
            <Link href="#" className="hover:text-slate-300 transition-colors">Sitemap</Link>
            <span>|</span>
            <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <span className="ml-2 text-[11px] text-slate-600 font-normal">
              &copy; {currentYear} MedReserve Inc.
            </span>
          </div>

          {/* স্ক্রল আপ ট্রিগার */}
          <div className="flex items-center space-x-4 order-1 md:order-2 w-full md:w-auto justify-end">
            <button
              onClick={scrollToTop}
              className="p-2.5 bg-[#ccff33] text-slate-950 hover:bg-[#b8e62d] rounded-full shadow-lg active:scale-90 transition-all shrink-0"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-3.5 w-3.5 stroke-[3]" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}