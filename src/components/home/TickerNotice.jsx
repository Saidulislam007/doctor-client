"use client";

import { AlertCircle, Calendar, Sparkles, ShieldAlert, Award } from "lucide-react";

export default function TickerNotice() {
  const notices = [
    { text: "Emergency Critical Care Support: Active 24/7 via Helpline 911 / 988", icon: ShieldAlert },
    { text: "New Specialists Boarded: Top-rated Pediatricians & Neuro-surgeons available this week", icon: Sparkles },
    { text: "Clinical Advisory: Update your family medical profile history for swift emergency triage", icon: AlertCircle },
    { text: "MedReserve Excellence: Proudly partnering with over 200+ certified national hospital networks", icon: Award },
    { text: "Next Available Slots: Primary health virtual consults booking open for coming Saturday", icon: Calendar },
  ];

  // লুপে কোনো গ্যাপ বা সাদা অংশ না রেখে নিরবচ্ছিন্ন স্ক্রলিং এর জন্য ডাবল রেন্ডার ট্রিক
  const doubleNotices = [...notices, ...notices];

  return (
    <div className="w-full bg-emerald-900 mt-[-40px] text-emerald-100 py-3 border-y border-emerald-950 overflow-hidden relative shadow-inner">
      {/* বামপাশে স্ট্যাটিক "LIVE UPDATES" ব্যাজ যা টিকারটিকে প্রিমিয়াম লুক দেয় */}
      <div className="absolute left-0 top-0 bottom-0 bg-emerald-950 px-4 flex items-center z-20 font-bold text-xs uppercase tracking-widest border-r border-emerald-800 text-white shadow-md">
        <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping mr-2" />
        Live Updates
      </div>

      {/* Main Ticker Container using Hardware Accelerated CSS Animation */}
      <div className="flex w-max pl-[130px]">
        <div className="flex space-x-16 items-center whitespace-nowrap animate-[ticker-infinite_25s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
          {doubleNotices.map((notice, index) => {
            const Icon = notice.icon;
            return (
              <div key={index} className="flex items-center space-x-2.5 text-sm font-medium tracking-wide">
                <Icon className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{notice.text}</span>
                <span className="text-emerald-700 font-extrabold mx-4">|</span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* ডানদিকের ফেড ইফেক্ট শ্যাডো */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-emerald-900 to-transparent pointer-events-none z-10" />
    </div>
  );
}