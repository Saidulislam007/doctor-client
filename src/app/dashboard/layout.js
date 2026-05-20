"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, User, LayoutDashboard, ArrowLeft, HeartPulse } from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard Home", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Bookings", path: "/dashboard/my-bookings", icon: Calendar },
    { name: "My Profile", path: "/dashboard/my-profile", icon: User },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      
      {/* ================= DESKTOP SIDEBAR PANEL (PREMIUM WORKSPACE) ================= */}
      <aside className="w-64 bg-white border-r border-slate-200/80 hidden md:flex flex-col shrink-0 relative z-30">
        
        {/* Sidebar Brand Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-800">
              <HeartPulse className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-black text-base text-slate-900 tracking-tight leading-tight">Patient Portal</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">MedReserve ID</span>
            </div>
          </div>
          {/* Micro Status Indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
        
        {/* Navigation Section with Premium States */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-800 to-emerald-950 text-white shadow-lg shadow-emerald-900/10 scale-[1.02]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1"
                }`}
              >
                <Icon className={`h-4 w-4 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110 text-slate-400 group-hover:text-slate-600"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Bottom Action */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/40">
          <Link 
            href="/appointments" 
            className="flex items-center space-x-2.5 text-xs font-bold text-slate-500 hover:text-emerald-800 px-4 py-3 rounded-xl hover:bg-white border border-transparent hover:border-slate-100 transition-all shadow-none hover:shadow-sm group"
          >
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Doctors</span>
          </Link>
        </div>
      </aside>

      {/* ================= MOBILE RESPONSIVE BOTTOM NAVBAR (UX EXCELLENCE) ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-2 z-50 flex items-center justify-around shadow-lg">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center space-y-1 py-1.5 px-3 rounded-xl transition-all duration-200 ${
                isActive ? "text-emerald-800 scale-105 font-black" : "text-slate-400 font-bold"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] tracking-tight">{item.name.split(" ")[1] || item.name.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>

      {/* ================= MAIN DYNAMIC WORKSPACE AREA ================= */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 pb-24 md:pb-10 transition-all">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}