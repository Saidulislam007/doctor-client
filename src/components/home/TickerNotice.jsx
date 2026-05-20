"use client";

import {
  AlertCircle,
  Calendar,
  Sparkles,
  ShieldAlert,
  Award,
} from "lucide-react";

export default function TickerNotice() {
  const notices = [
    {
      text: "Emergency Critical Care Support: Active 24/7 via Helpline 911 / 988",
      icon: ShieldAlert,
    },
    {
      text: "New Specialists Boarded: Top-rated Pediatricians & Neuro-surgeons available this week",
      icon: Sparkles,
    },
    {
      text: "Clinical Advisory: Update your family medical profile history for swift emergency triage",
      icon: AlertCircle,
    },
    {
      text: "MedReserve Excellence: Proudly partnering with over 200+ certified national hospital networks",
      icon: Award,
    },
    {
      text: "Next Available Slots: Primary health virtual consults booking open for coming Saturday",
      icon: Calendar,
    },
  ];

  const doubleNotices = [...notices, ...notices];

  return (
    // 🎯 আপনার দেওয়া কাঙ্ক্ষিত ক্লাসগুলো (bg-white/40, backdrop-blur-sm, border-b) এখানে নিখুঁতভাবে ব্লাইন্ড করা হয়েছে
    <div className="w-full bg-white/20 backdrop-blur-sm border-b border-slate-200/80 mt-[-40px] py-3.5 overflow-hidden relative shadow-sm z-40 select-none">
      
      {/* ================= LIVE BADGE (MATCHING LIGHT GLASS UX) ================= */}
      <div className="absolute left-0 top-0 bottom-0 bg-white/90 backdrop-blur-sm px-5 flex items-center z-20 font-black text-[10px] uppercase tracking-widest border-r border-slate-200 text-slate-900 shadow-sm">
        <span className="relative flex h-2 w-2 mr-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
        </span>
        <span className="font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Live Updates</span>
      </div>

      {/* ================= TICKER SCROLLER CONTAINER ================= */}
      <div className="flex overflow-hidden pl-[145px]">
        <div className="flex min-w-max space-x-12 items-center whitespace-nowrap animate-ticker hover:[animation-play-state:paused] cursor-pointer">
          {doubleNotices.map((notice, index) => {
            const Icon = notice.icon;

            return (
              <div
                key={index}
                className="flex items-center space-x-3 text-xs sm:text-sm font-bold tracking-wide shrink-0 text-slate-800 transition-colors duration-200 hover:text-black"
              >
                {/* আইকন হোল্ডার মেকানিজম */}
                <div className="p-1.5 bg-emerald-800/10 rounded-xl text-emerald-800 shadow-sm border border-emerald-800/5">
                  <Icon className="h-3.5 w-3.5 shrink-0 stroke-[2.5]" />
                </div>

                {/* ক্লিয়ার ব্ল্যাক টেক্সট অপ্টিমাইজেশন */}
                <span className="text-slate-800 font-extrabold tracking-tight">{notice.text}</span>

                {/* গ্লাসি সেপারেটর নোড */}
                <span className="text-emerald-800/30 font-black px-1 select-none text-sm">
                  ✦
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= RIGHT FADE MASK OVERLAY (LIGHT MODE EDGE) ================= */}
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none z-10" />
    </div>
  );
}