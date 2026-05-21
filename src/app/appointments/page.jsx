"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Clock, ShieldCheck, MapPin, ArrowRight, Loader2, Heart, Activity, Search, X } from "lucide-react";

export default function AppointmentsPage() {
  // লাইভ স্টেট ম্যানেজমেন্ট ফ্রেমওয়ার্ক
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 🎯 পিওর জাভাস্ক্রিপ্ট হেল্পার ফাংশন: ব্রাউজার কুকি থেকে টোকেন রিড করার জন্য
  const getCookie = (name) => {
    if (typeof window === "undefined") return "";
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return "";
  };

  // 🎯 ব্যাকএন্ড এপিআই থেকে ডাক্তারদের ডাটা ফেচ করার হুক
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        
        // Better Auth টোকেন বা আপনার কাস্টম JWT টোকেন কুকি থেকে নেওয়া হচ্ছে ভাই
        const token = getCookie("token") || getCookie("better-auth.session_token");

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctors`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}` // 🎯 ফিক্সড: এখন আর cookieStore এরর আসবে না ভাই
          },
        });
        
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

  // 🎯 ব্রাউজার ট্যাব টাইটেল চেঞ্জ হুক
  useEffect(() => {
    document.title = "Appointments | MedReserve"; 
  }, []);

  // 📊 প্রফেশনাল ফিল্টারিং এবং সর্টিং লজিক
  const filteredAndSortedDoctors = [...doctors]
    .filter((doctor) => {
      const query = searchQuery.toLowerCase().trim();
      return (
        doctor.name?.toLowerCase().includes(query) ||
        doctor.specialty?.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => Number(b.rating) - Number(a.rating));

  // ⏳ কন্ডিশন ১: ব্যাকএন্ড থেকে ডাটা আসার আগ পর্যন্ত প্রফেশনাল লোডার
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/50 p-4">
        <Loader2 className="h-10 w-10 text-emerald-800 animate-spin shrink-0" />
        <p className="text-sm font-bold text-slate-500 mt-3 tracking-wide">Fetching Clinical Practitioners Database...</p>
      </div>
    );
  }

  // ❌ কন্ডিশন ২: ব্যাকএন্ড সার্ভার বন্ধ থাকলে বা এপিআই একদম ফাঁকা ডাটা দিলে এরর মেসেজ স্ক্রিন
  if (error || doctors.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
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
        
        {/* ================= 🎯 FIXED TOP HEADER: ডার্ক লাক্সারি ব্যানার ================= */}
        <div className="w-full bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/30 rounded-[32px] p-6 sm:p-10 text-left relative overflow-hidden shadow-xl mb-12 border border-slate-800/60">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none z-0" />
          
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-black tracking-wider border border-emerald-500/20 uppercase">
              <ShieldCheck className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Verified Accounts Portal</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-center gap-3">
              All Appointments! <span className="animate-[wiggle_1s_ease-in-out_infinite] origin-bottom-right inline-block">👋</span>
            </h1>
            
            <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
              Manage your upcoming medical consultations, historical healthcare logs, and update your patient credential record instantly through our secure gateway. Browse elite practitioners ranked dynamically by patient satisfaction grades.
            </p>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-800/60 mt-6">
              <div className="flex items-center space-x-2 text-slate-300 font-bold text-xs bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800">
                <Heart className="h-4 w-4 text-emerald-500 animate-pulse" />
                <span>Live Care Sync</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300 font-bold text-xs bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800">
                <Activity className="h-4 w-4 text-emerald-500" />
                <span>Total Registered: {doctors.length} Specialists</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 🔍 LIVE SEARCH UTILITY FRAMEWORK ================= */}
        <div className="w-full max-w-xl mx-auto mb-10 relative group">
          <div className="absolute inset-0 bg-emerald-800/10 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-all duration-300 pointer-events-none" />
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-slate-400 group-focus-within:text-emerald-800 transition-colors pointer-events-none" />
            <input
              type="text"
              placeholder="Search doctors by name or specialty (e.g. Gynecologist)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 font-medium shadow-sm outline-none focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
                aria-label="Clear search input"
              >
                <X className="h-4 w-4 stroke-[2.5]" />
              </button>
            )}
          </div>
          
          {searchQuery && (
            <p className="text-left text-xs font-bold text-slate-400 mt-2.5 pl-1 uppercase tracking-wide">
              Found <span className="text-emerald-800 font-black">{filteredAndSortedDoctors.length}</span> results matching your query
            </p>
          )}
        </div>

        {/* ================= 📱💻 ALL DEVICES UNIVERSAL GRID SYSTEM ================= */}
        {/* 🎯 ফিক্সড কন্ডিশন: সার্চ রেজাল্ট ট্র্যাকিং এখন filteredAndSortedDoctors-এর ওপর বেস করে হবে ভাই */}
        {filteredAndSortedDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-md sm:max-w-none mx-auto">
            {filteredAndSortedDoctors.map((doctor, index) => (
              <div
                key={doctor.id || doctor._id}
                className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-md hover:shadow-2xl active:scale-[0.995] md:hover:-top-2 top-0 flex flex-col group relative transition-all duration-500"
              >
                
                {/* TOP COMPONENT: ইমেজ বক্স */}
                <div className="w-full h-72 sm:h-64 lg:h-72 bg-[#b2b9be]/30 rounded-[24px] overflow-hidden shrink-0 relative flex items-center justify-center p-2 shadow-inner">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-800 font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                    RANK #{index + 1}
                  </span>

                  <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm flex items-center space-x-1.5 z-20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[9px] font-black text-white uppercase tracking-wide truncate max-w-[110px]">
                      {doctor.available?.split(" ")[0] || "Today"}
                    </span>
                  </div>

                  <Link
                    href={`/appointments/${doctor.id || doctor._id}`}
                    className="absolute bottom-4 right-4 bg-white hover:bg-emerald-800 hover:text-white text-slate-900 font-bold text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center space-x-1.5 transition-all duration-300 z-20 group/btn"
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                  </Link>
                </div>

                {/* BOTTOM COMPONENT: ইনফরমেটিভ এরিয়া */}
                <div className="p-4 flex flex-col flex-grow text-left mt-2 justify-between">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-emerald-800 transition-colors duration-300">
                      {doctor.name}
                    </h3>
                    <p className="text-xs font-bold text-slate-400 mt-1 flex items-center tracking-wide uppercase">
                      <MapPin className="h-3 w-3 mr-1 text-slate-300 shrink-0" />
                      {doctor.specialty} • {doctor.location?.split(",")[0] || "Dhaka"}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t border-slate-100/80 pt-4 mt-5 text-center">
                    <div className="flex flex-col items-center justify-center border-r border-slate-100 last:border-0">
                      <span className="text-slate-800 font-black text-sm">{doctor.experience?.split(" ")[0] || "0"}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">Years Exp</span>
                    </div>
                    <div className="flex flex-col items-center justify-center border-r border-slate-100 last:border-0 px-1">
                      <span className="text-emerald-800 font-black text-xs sm:text-sm truncate max-w-full">Covered</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">Consult</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-amber-500 font-black text-sm flex items-center justify-center gap-0.5">
                        {Number(doctor.rating).toFixed(1)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">Rating ({doctor.reviews || 0})</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* 🔍 সার্চ রেজাল্ট না মিললে এই আল্ট্রা-স্লীক ব্লকিং এরিয়া শো হবে */
          <div className="w-full py-16 text-center bg-white border border-slate-100 rounded-[32px] shadow-sm max-w-xl mx-auto">
            <p className="text-base font-black text-slate-800 tracking-tight">No Practitioners Found</p>
            <p className="text-xs text-slate-400 font-semibold mt-1 max-w-xs mx-auto">
              We couldn't find any verified specialists matching "{searchQuery}". Try checking for typos or searching a different field.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl active:scale-95 transition-all"
            >
              Clear Search Filter
            </button>
          </div>
        )}

      </div>
    </div>
  );
}