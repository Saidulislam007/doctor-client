"use client";

import { useState, useEffect, useRef } from "react"; 
import Link from "next/link";
import { Star, ShieldCheck, ArrowRight, MapPin, Clock, Loader2, Sparkles } from "lucide-react";

export default function TopDoctorsSection() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // স্ক্রল অ্যানিমেশন ট্র্যাকিং স্টেট এবং রেফারেন্স
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // 🎯 পিওর জাভাস্ক্রিপ্ট হেল্পার ফাংশন: ব্রাউজার কুকি থেকে টোকেন রিড করার জন্য
  const getCookie = (name) => {
    if (typeof window === "undefined") return "";
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return "";
  };

  // 🎯 ব্যাকএন্ড এপিআই থেকে ডাক্তারদের ডেটা নিয়ে আসার হুক
  useEffect(() => {
    const fetchTopDoctors = async () => {
      try {
        setLoading(true);
        
        // Better Auth টোকেন বা কাস্টম JWT টোকেন কুকি থেকে নেওয়া হচ্ছে ভাই
        const token = getCookie("token") || getCookie("better-auth.session_token");

        // 🎯 ফিক্সড কম্বাইন্ড ফেচ কনফিগারেশন
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctors`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}` // ব্যাকএন্ড যদি হেডার চেক করে তবে এটি লাগবে
          },
          credentials: "include" // 🎯 অত্যন্ত জরুরি: কুকি এপ্রোচ ব্যাকএন্ডে পাস করার জন্য
        });

        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
        } else {
          console.error("❌ Server responded with an error status:", response.status);
        }
      } catch (err) {
        console.error("❌ Failed to fetch top doctors:", err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopDoctors();
  }, []);

  // ইন্টারসেকশন observer হুক ইন্টিগ্রেশন
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.02 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  // রেটিং অনুযায়ী সর্বোচ্চ থেকে সর্বনিম্ন সর্ট করে প্রথম ৩ জন ফিল্টার
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

  if (topRatedDoctors.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-14 bg-gradient-to-b from-slate-50/60 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-black tracking-wide border border-emerald-100 uppercase animate-[pulse_3s_infinite]">
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

        {/* ================= 📱💻 DOCTORS UNIVERSAL GRID LAYOUT ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-md sm:max-w-none mx-auto">
          {topRatedDoctors.map((doctor, index) => (
            <div
              key={doctor.id || doctor._id}
              className={`bg-white border border-slate-100 p-4 rounded-[32px] shadow-md hover:shadow-2xl active:scale-[0.99] md:hover:-top-2 top-0 flex flex-col group relative transition-all duration-500 ${
                isVisible ? "animate-slideInUp opacity-100" : "opacity-0 translate-y-[60px]"
              }`}
              style={{
                animationDelay: isVisible ? `${index * 150}ms` : "0ms",
              }}
            >
              
              {/* ================= 📸 TOP COMPONENT: ইমেজ বক্স ================= */}
              <div className="w-full h-72 sm:h-64 lg:h-72 bg-[#b2b9be]/30 rounded-[24px] overflow-hidden shrink-0 relative flex items-center justify-center p-2 shadow-inner">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-800 font-extrabold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                  Top Rated
                </span>

                <Link
                  href={`/appointments/${doctor.id || doctor._id}`}
                  className="absolute bottom-4 right-4 bg-white hover:bg-emerald-800 hover:text-white text-slate-900 font-bold text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center space-x-1.5 transition-all duration-300 z-20 group/btn"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                </Link>
              </div>

              {/* ================= 📝 BOTTOM COMPONENT: ইনফরমেশন এরিয়া ================= */}
              <div className="p-4 flex flex-col flex-grow text-left mt-2">
                <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-emerald-800 transition-colors duration-300">
                  {doctor.name}
                </h3>
                
                <p className="text-xs font-bold text-slate-400 mt-1 flex items-center tracking-wide uppercase">
                  <MapPin className="h-3 w-3 mr-1 text-slate-300 shrink-0" />
                  {doctor.specialty} • {doctor.location?.split(",")[0] || "Dhaka"}
                </p>

                {/* ৩-কলাম গ্রিড ডাটা স্টাইল প্যানেল */}
                <div className="grid grid-cols-3 gap-2 border-t border-slate-100/80 pt-4 mt-5 text-center">
                  <div className="flex flex-col items-center justify-center border-r border-slate-100 last:border-0">
                    <span className="text-slate-800 font-black text-sm">{doctor.experience?.split(" ")[0] || "0"}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">Years Exp</span>
                  </div>

                  <div className="flex flex-col items-center justify-center border-r border-slate-100 last:border-0">
                    <span className="text-slate-800 font-black text-sm">৳১,০০০</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">Fees</span>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <span className="text-amber-500 font-black text-sm flex items-center justify-center gap-0.5">
                      {Number(doctor.rating).toFixed(1)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">Rating</span>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Catalog CTA Link */}
        <div className="text-center mt-14">
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