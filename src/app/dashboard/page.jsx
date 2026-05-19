"use client";

import Link from "next/link";
import { Calendar, User, ShieldCheck } from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="space-y-6 max-w-4xl text-left">
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-3">
        <div className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Verified Account</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Welcome back! 👋
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Manage your upcoming medical consultations, historical healthcare logs, and update your patient credential record instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/dashboard/my-bookings" className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-emerald-600/30 shadow-sm transition-all flex items-center space-x-4 group">
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl group-hover:bg-emerald-800 group-hover:text-white transition-all">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">My Appointments</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">View, update, or cancel active slots</p>
          </div>
        </Link>

        <Link href="/dashboard/my-profile" className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-emerald-600/30 shadow-sm transition-all flex items-center space-x-4 group">
          <div className="p-3 bg-slate-50 text-slate-600 rounded-xl group-hover:bg-emerald-800 group-hover:text-white transition-all">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Personal Profile</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Edit credentials and medical contacts</p>
          </div>
        </Link>
      </div>
    </div>
  );
}