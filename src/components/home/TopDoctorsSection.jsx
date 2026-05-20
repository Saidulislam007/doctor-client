"use client";

import { useState, useEffect, useRef } from "react"; // 🎯 useRef যুক্ত করা হলো
import Link from "next/link";
import { Star, ShieldCheck, ArrowRight, MapPin, Clock, Loader2 } from "lucide-react";

export default function TopDoctorsSection() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎯 স্ক্রল অ্যানিমেশন ট্র্যাকিং স্টেট এবং রেফারেন্স
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // ব্যাকএন্ড এপিআই থেকে ডাক্তারদের ডেটা নিয়ে আসার হুক
  useEffect(() => {
    const fetchTopDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/doctors");
        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
        }
      } catch (err) {
        console.error("❌ Failed to fetch top doctors:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTopDoctors();
  }, []);

  // 🎯 টেস্টোমনিয়াল পেজের মতো ইন্টারসেকশন অবজারভার হুক ইন্টিগ্রেশন
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 } // সেকশনটির মাত্র ৫% স্ক্রিনে আসলেই কার্ড অ্যানিমেশন শুরু হবে
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [loading]); // লোডিং শেষ হওয়ার পর অবজারভারকে ট্রিক করা সেফ প্র্যাকটিস

  // ১. রেটিং অনুযায়ী সর্বোচ্চ থেকে সর্বনিম্ন (Descending Order) সর্ট করে প্রথম ৩ জন ফিল্টার
  const topRatedDoctors = [...doctors]
    .sort((a, b) => Number(b.rating) - Number(a.rating))
    .slice(0, 3);

  // ডাটা আসার পূর্ব মুহূর্ত পর্যন্ত প্রফেশনাল স্পিনার লোডার
  if (loading) {
    return (
      <div className="w-full py-24 flex flex-col items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 text-emerald-800 animate-spin" />
        <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-3">Sourcing Top Clinicians...</p>
      </div>
    );
  }

  // ডাটাবেজে কোনো ডক্টর না থাকলে সেকশনটি রেন্ডার হবে না
  if (topRatedDoctors.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full py-24 bg-gradient-to-b from-slate-50/50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-black tracking-wide border border-emerald-100 uppercase">
            <ShieldCheck className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Elite Practitioners</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Meet Our <span className="text-emerald-800">Top Rated</span> Doctors
          </h2>
          
          <p className="text-slate-500 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
            Consult with our most trusted, highly recommended medical specialists recognized for outstanding clinical performance and patient satisfaction.
          </p>
        </div>

        {/* ================= DOCTORS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topRatedDoctors.map((doctor, index) => (
            <div
              key={doctor.id || doctor._id}
              // 🎯 ফিক্সড: টেস্টোমনিয়াল সেকশনের মতো নিচ থেকে ৯৯পিক্সেল ওপরে ওঠার অ্যানিমেশন এবং অপাসিটি ট্রানজিশন ম্যাপ করা হলো
              className={`bg-white border border-slate-200/80 rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl hover:border-emerald-800/10 flex flex-col group relative top-0 hover:-top-3 transition-all duration-750 ${
                isVisible ? "animate-slideInUp opacity-100" : "opacity-0 translate-y-[90px]"
              }`}
              style={{
                // 🎯 ফিক্সড: একটার পর আরেকটা ডক্টর কার্ড আসার মাঝখানের গ্যাপ ২৫০ms মেইনটেইন করা হলো
                animationDelay: isVisible ? `${index * 250}ms` : "0ms",
              }}
            >
              
              {/* Image Container with Zoom Animation */}
              <div className="relative h-64 bg-slate-50 overflow-hidden shrink-0">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                
                {/* আপনার আপডেট করা কাঙ্ক্ষিত রেটিং স্কোরসহ ডাইনামিক ব্যাজ */}
                <div className="absolute top-4 left-4 bg-emerald-800/95 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-xl tracking-wider shadow-md flex items-center space-x-1.5">
                  <span className="text-amber-400 font-extrabold text-xs">★ {Number(doctor.rating).toFixed(1)}</span>
                  <span className="text-white/40 font-normal">|</span>
                  <span>TOP RATED #{index + 1}</span>
                </div>

                {/* Availability Badge */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 shadow-sm flex items-center space-x-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-wide">
                    {doctor.available?.split(" ")[0] || "Today"}
                  </span>
                </div>
              </div>

              {/* Card Context Content Area */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-6">
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-50 border border-emerald-100/50 px-2.5 py-0.5 rounded-md">
                      {doctor.specialty}
                    </span>
                    <div className="flex items-center space-x-1 bg-amber-50/50 px-2 py-0.5 rounded-lg border border-amber-100/30">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      <span className="text-xs font-black text-slate-800">{Number(doctor.rating).toFixed(1)}</span>
                      <span className="text-[10px] text-slate-400 font-bold">({doctor.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors duration-300 tracking-tight">
                    {doctor.name}
                  </h3>

                  <div className="space-y-2 pt-1 text-slate-500 text-xs font-semibold">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>Experience: <strong className="text-slate-700">{doctor.experience}</strong></span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="truncate text-slate-500">{doctor.location}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Section with Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Fee Tier</p>
                    <p className="text-base font-black text-slate-800">৳১,০০০</p>
                  </div>
                  
                  <Link
                    href={`/appointments/${doctor.id || doctor._id}`}
                    className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 active:scale-95 shadow-sm shadow-slate-100 group/btn"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                  </Link>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Catalog CTA Link */}
        <div className="text-center mt-12">
          <Link 
            href="/appointments" 
            className="inline-flex items-center space-x-1 text-sm font-bold text-slate-600 hover:text-emerald-800 transition-colors group"
          >
            <span>See Full Doctors Catalog</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}