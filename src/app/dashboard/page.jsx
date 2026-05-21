"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Calendar, User, ShieldCheck, ArrowRight, Activity, HeartPulse } from "lucide-react";

export default function DashboardHome() {
  useEffect(() => {
    // 🎯 এই লাইনের কারণে ব্রাউজার ট্যাব সরাসরি চেঞ্জ হয়ে যাবে ভাই!
    document.title = "Dashboard | MedReserve"; 
  }, []);
  return (
    <div className="space-y-8 max-w-4xl text-left animate-[fadeIn_0.4s_ease-out]">
      
      {/* ================= HERO WELCOME CARD (PREMIUM GLOSSY LOOK) ================= */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 p-6 sm:p-10 rounded-[32px] shadow-xl border border-slate-800 text-white group">
        {/* Background Subtle Geometric Glow Patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-500/5 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/15 backdrop-blur-md text-emerald-400 px-3.5 py-1.5 rounded-xl text-xs font-black tracking-wide border border-emerald-500/20 uppercase">
            <ShieldCheck className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Verified Account</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Welcome back! 👋
            </h1>
            <p className="text-sm text-slate-400 font-medium max-w-xl leading-relaxed">
              Manage your upcoming medical consultations, historical healthcare logs, and update your patient credential record instantly through our secure gateway.
            </p>
          </div>

          {/* Quick Stats Micro-Widgets inside Welcome Card */}
          <div className="pt-4 border-t border-slate-800/60 grid grid-cols-2 gap-4 max-w-md">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                <HeartPulse className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-slate-300">Live Care Sync</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-teal-500/10 rounded-lg text-teal-400">
                <Activity className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-slate-300">Encrypted Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= QUICK NAVIGATION ACTION CARDS ================= */}
      <div className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
          Quick Access Panel
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          {/* CARD 1: APPOINTMENTS */}
          <Link 
            href="/dashboard/my-bookings" 
            className="p-6 bg-white border border-slate-200/80 rounded-[24px] hover:border-emerald-800/20 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 flex items-center justify-between group hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="flex items-center space-x-5 relative z-10">
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl group-hover:bg-emerald-800 group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-sm shadow-emerald-100">
                <Calendar className="h-6 w-6 stroke-[2]" />
              </div>
              <div className="text-left">
                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-900 transition-colors">
                  My Appointments
                </h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5 max-w-[180px] sm:max-w-none">
                  View, update, or cancel active consultation slots
                </p>
              </div>
            </div>
            <div className="p-1.5 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-800 transition-all duration-300 group-hover:translate-x-1 shrink-0">
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </div>
          </Link>

          {/* CARD 2: PROFILE */}
          <Link 
            href="/dashboard/my-profile" 
            className="p-6 bg-white border border-slate-200/80 rounded-[24px] hover:border-emerald-800/20 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 flex items-center justify-between group hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="flex items-center space-x-5 relative z-10">
              <div className="p-4 bg-slate-50 text-slate-600 rounded-2xl group-hover:bg-emerald-800 group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-sm">
                <User className="h-6 w-6 stroke-[2]" />
              </div>
              <div className="text-left">
                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-800 transition-colors">
                  Personal Profile
                </h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5 max-w-[180px] sm:max-w-none">
                  Edit credentials, vitals and medical contacts
                </p>
              </div>
            </div>
            <div className="p-1.5 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-800 transition-all duration-300 group-hover:translate-x-1 shrink-0">
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
}