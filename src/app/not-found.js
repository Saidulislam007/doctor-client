"use client";

import Link from "next/link";
import { ArrowLeft, ShieldAlert, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    // 🎯 ফিক্সড: মেইন লেআউটের নেভবারের সাথে সামঞ্জস্য রেখে হাইট এবং মার্জিন ব্যালেন্স করা হয়েছে ভাই
    <div className="w-full min-h-[calc(100vh-80px)] bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ড গ্লো লাক্সারি ইফেক্টস */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-800/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        
        {/* 🚨 আইকন ও নম্বর এরিয়া */}
        <div className="relative flex flex-col items-center justify-center">
          {/* গ্লোয়িং অ্যালার্ট ব্যাজ */}
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-black tracking-widest border border-emerald-500/20 uppercase mb-4 animate-pulse">
            <ShieldAlert className="h-4 w-4 stroke-[2.5]" />
            <span>Route Out of Bounds</span>
          </div>

          {/* বড় 404 টেক্সট গ্রাডিয়েন্ট */}
          <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 leading-none select-none drop-shadow-md">
            404
          </h1>
        </div>

        {/* 📝 মেসেজ প্যানেল */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Clinical Link Broken
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed max-w-sm mx-auto">
            The medical directory route you are attempting to synchronize does not exist or has been shifted permanently to another secure node.
          </p>
        </div>

        {/* 📊 কুইক হেল্প স্ট্যাটাস বক্স */}
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl text-left max-w-xs mx-auto space-y-1.5 shadow-inner">
          <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
            <Search className="h-3.5 w-3.5 text-emerald-500" />
            <span>Triage Suggestions</span>
          </div>
          <p className="text-slate-500 text-[11px] font-medium leading-normal">
            Verify the sub-directory spelling or return to the central console root to sync available specialists.
          </p>
        </div>

        {/* 🎯 অ্যাকশন অ্যাক্টিভিটি বাটন গ্রুপ */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xs sm:max-w-none mx-auto pt-2">
          {/* হোমপেজে যাওয়ার বাটন */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#ccff33] hover:bg-[#b8e62d] text-slate-950 text-xs font-black px-5 py-3.5 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-950/20"
          >
            <Home className="h-4 w-4 stroke-[2.5]" />
            <span>Central Console</span>
          </Link>

          {/* আগের পেজে ফেরত যাওয়ার বাটন */}
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold px-5 py-3.5 rounded-xl border border-slate-800 transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </div>

        {/* ফুটার ওয়াটারমার্ক */}
        <p className="text-[10px] text-slate-600 font-medium tracking-wider uppercase pt-4 select-none">
          MedReserve System Diagnostic Logs v1.0.2
        </p>

      </div>
    </div>
  );
}