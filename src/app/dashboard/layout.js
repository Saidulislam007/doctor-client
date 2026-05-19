"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, User, LayoutDashboard, ArrowLeft } from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard Home", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Bookings", path: "/dashboard/my-bookings", icon: Calendar },
    { name: "My Profile", path: "/dashboard/my-profile", icon: User },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar Panel */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-100">
          <span className="font-black text-lg text-slate-800 tracking-tight">Patient Portal</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? "bg-emerald-800 text-white shadow-md shadow-emerald-800/10"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link href="/appointments" className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-emerald-800 px-4 py-2 rounded-lg transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Doctors</span>
          </Link>
        </div>
      </aside>

      {/* Main Dynamic Workspace Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
}