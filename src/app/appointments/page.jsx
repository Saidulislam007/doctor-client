"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Clock, ShieldCheck, MapPin, ArrowUpRight, Loader2 } from "lucide-react";

export default function AppointmentsPage() {
  // লাইভ স্টেট ম্যানেজমেন্ট ফ্রেমওয়ার্ক
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🎯 ব্যাকএন্ড এপিআই থেকে ডাক্তারদের ডাটা ফেচ করার হুক
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/doctors");
        
        if (!response.ok) {
          throw new Error("Failed to sync data stream from server");
        }
        
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        console.error("❌ Fetching doctors catalog error:", err.message);
        setError(err.message || "Something went wrong while loading doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // 📊 প্রফেশনাল সর্টিং লজিক: এপিআই থেকে আসা ডাটাকে রেটিং অনুযায়ী ডেসেন্ডিং সিরিয়াল করা হলো
  const sortedDoctors = [...doctors].sort((a, b) => Number(b.rating) - Number(a.rating));

  // ⏳ কন্ডিশন ১: ব্যাকএন্ড থেকে ডাটা আসার আগ পর্যন্ত প্রফেশনাল ফুল-স্ক্রিন লোডার
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/50 p-4">
        <Loader2 className="h-10 w-10 text-emerald-800 animate-spin shrink-0" />
        <p className="text-sm font-bold text-slate-500 mt-3 tracking-wide">Fetching Clinical Practitioners Database...</p>
      </div>
    );
  }

  // ❌ কন্ডিশন ২: ব্যাকএন্ড সার্ভার বন্ধ থাকলে বা ডাটা না আসলে এরর মেসেজ স্ক্রিন
  if (error || sortedDoctors.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/50 p-4 text-center">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Database Offline</h2>
        <p className="text-sm text-slate-500 font-medium mt-1 max-w-sm">
          {error || "No verified doctors found in the server at this moment."}
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-5 text-xs font-bold text-white bg-emerald-800 px-4 py-2.5 rounded-xl active:scale-95 transition-all shadow-md"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  // ✅ কন্ডিশন ৩: ডাটা সফলভাবে ফেচ হলে মূল UI রেন্ডার হবে
  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Grid Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 mb-10 gap-4">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Certified Top Specialists</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              All Appointments & Doctors
            </h1>
            <p className="text-sm text-slate-500 font-medium max-w-xl">
              Browse elite verified medical practitioners ranked dynamically by patient global metrics and satisfaction grades.
            </p>
          </div>
          <div className="text-xs font-bold text-slate-400 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm shrink-0">
            Total Available Practitioners: <span className="text-emerald-800 text-sm">{sortedDoctors.length}</span>
          </div>
        </div>

        {/* Responsive Grid System (3 Cards per row on Large Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDoctors.map((doctor, index) => (
            <div
              key={doctor.id || doctor._id} // মঙ্গোডিবির সেফটি কী হিসেবে অবজেক্ট আইডি বা কাস্টম আইডি ট্র্যাক করা হচ্ছে
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-600/20 active:scale-[0.995] transition-all duration-300 flex flex-col group"
            >
              
              {/* Card Image Area with Absolute Badges */}
              <div className="relative h-56 bg-slate-100 overflow-hidden shrink-0">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                
                {/* Ranking Badge */}
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-black px-2.5 py-1 rounded-lg tracking-wider">
                  RANK #{index + 1}
                </div>

                {/* Live Availability Badge */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-100 shadow-sm flex items-center space-x-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wide truncate max-w-[150px]">
                    {doctor.available}
                  </span>
                </div>
              </div>

              {/* Core Content Framework */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-5">
                
                <div className="space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md">
                      {doctor.specialty}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span className="text-sm font-black text-slate-800">{Number(doctor.rating).toFixed(1)}</span>
                      <span className="text-xs text-slate-400 font-medium">({doctor.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors tracking-tight">
                    {doctor.name}
                  </h3>

                  <div className="space-y-1.5 pt-1 text-slate-500 text-xs font-medium">
                    <div className="flex items-center space-x-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>Experience: <strong className="text-slate-700">{doctor.experience}</strong></span>
                    </div>
                    <div className="flex items-start space-x-1.5 line-clamp-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="truncate">{doctor.location}</span>
                    </div>
                  </div>
                </div>

                {/* Primary Actions Trigger Frame */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Consultation</p>
                    <p className="text-sm font-black text-slate-800">Free / Covered</p>
                  </div>
                  
                  {/* ডাইনামিক আইডি দিয়ে ভিউ ডিটেইলস রাউট রিডাইরেকশন */}
                  <Link
                    href={`/appointments/${doctor.id}`}
                    className="inline-flex items-center space-x-1 bg-slate-900 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-95 shadow-sm shadow-slate-200 group/btn"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover/btn:text-white transition-colors" />
                  </Link>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}