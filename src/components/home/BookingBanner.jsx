"use client";

import Link from "next/navigation"; // Next.js রাউটিং এর সঠিক ইম্পোর্ট
import LinkComponent from "next/link"; // ডাইনামিক ইম্পোর্ট প্রিভেন্ট নেমিং ক্ল্যাশ
import { ArrowUpRight } from "lucide-react";

export default function BookingBanner() {
  return (
    <div className="w-full bg-slate-50 py-12">
      {/* মকআপের মতো ফুল-স্ক্রিন চওড়া এজ-টু-এজ ফ্রেম (No bounds) */}
      <div 
        className="w-full min-h-[440px] bg-cover bg-center relative flex items-center px-6 sm:px-12 lg:px-20 overflow-hidden"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1600&auto=format&fit=crop')" 
        }}
      >
        {/* ইমেজের ওপরের স্মুথ ডার্ক ওভারলে মাস্ক - যা টেক্সটকে স্পষ্টভাবে ফুটিয়ে তোলে */}
        <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] z-10" />

        {/* কন্টেন্ট অ্যাকাউন্ট ব্লক */}
        <div className="relative z-20 max-w-3xl space-y-5 text-white animate-[fadeIn_0.5s_ease-out]">
          
          {/* Top Pill Status Badge */}
          <div className="flex items-center space-x-2 text-white/90">
            <span className="h-2 w-2 rounded-full bg-white" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-90">
              Start Growing Today
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] drop-shadow-md text-left">
            Your Health and Wellness <br className="hidden sm:inline" /> 
            Just in the Right Place
          </h1>

          {/* Subtext description */}
          <p className="text-white/80 text-sm sm:text-base font-medium max-w-md tracking-wide drop-shadow-sm text-left">
            Smart tools to save more, invest smarter, and stay in control
          </p>

          {/* ফিক্সড: group ক্লাস অ্যাড করা হয়েছে অ্যারো অ্যানিমেশন ট্রিকার করার জন্য */}
          <div className="pt-4 text-left">
            <LinkComponent
              // ইউজারকে ডক্টর চয়েস এবং বুকিং উইজার্ডে নিয়ে যাওয়ার সঠিক রাউট লিংক
              href="/appointments"
              className="group inline-flex items-center justify-between gap-4 bg-gradient-to-r from-[#1b4332] to-[#8cc63f] hover:from-[#143225] hover:to-[#7cb334] text-white font-bold pl-8 pr-3 py-3 rounded-full transition-all duration-300 ease-out shadow-lg hover:shadow-xl hover:shadow-emerald-950/20 active:scale-[0.98]"
            >
              <span className="text-sm sm:text-base tracking-wide">Book an Appointment</span>
              
              {/* ফিক্সড: group-hover ক্লাস যুক্ত করায় এখন বাটনে মাউস নিলেই অ্যারোটি চমৎকারভাবে রোটেট হবে */}
              <div className="h-10 w-10 rounded-full bg-white text-emerald-950 flex items-center justify-center group-hover:rotate-45 transition-all duration-300 shadow-sm shrink-0">
                <ArrowUpRight className="h-5 w-5 stroke-[2.5]" />
              </div>
            </LinkComponent>
          </div>

        </div>

        {/* ডানদিকের ফেড আউট শ্যাডো মাস্ক */}
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}