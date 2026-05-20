"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Stethoscope, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import TickerNotice from "./TickerNotice";

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Long Term Patient Relationships",
      subtitle: "BEST IN CLASS",
      featureTitle: "Clinical Support",
      featureDesc: "Access to verified national board-certified medical experts and top-tier clinical diagnostics.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop",
      badge: "Top Rated Care"
    },
    {
      id: 2,
      title: "Precision & Regenerative Health Portal",
      subtitle: "INDUSTRY LEADING",
      featureTitle: "Modern Medical Practices",
      featureDesc: "Leveraging state-of-the-art telehealth ecosystems and evidence-based personalized therapies.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
      badge: "Advanced Tech"
    },
    {
      id: 3,
      title: "Empowering Complete Wellness Direct to You",
      subtitle: "PATIENT CENTRIC",
      featureTitle: "24/7 Digital Operations",
      featureDesc: "Over 2 decades of cumulative healthcare operational excellence directly into your smartphone.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
      badge: "Instant Booking"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    // মেইন প্যারেন্ট কন্টেইনার সম্পূর্ণ w-full এবং কোনো প্যাডিং/মার্জিন নেই
    <div className="w-full bg-[#f4f7f1] border-b border-slate-200">
      
      {/* গ্রিড লেআউট একদম বর্ডার ছাড়া স্ক্রিনের শেষ প্রান্ত পর্যন্ত কাজ করবে */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 bg-[#f4f7f1] min-h-[550px] relative">
        
        {/* LEFT COMPONENT: টেক্সট কন্টেন্ট এরিয়া */}
        <div className="md:col-span-7 p-8 sm:p-12 lg:p-16 xl:p-24 flex flex-col justify-between bg-[#f4f7f1] relative z-10">
          
          {/* Top Brand Marker */}
          <div className="flex items-center space-x-2 text-emerald-800">
            <div className="p-2 bg-emerald-900/10 rounded-xl">
              <Stethoscope className="h-5 w-5 stroke-[2.5]" />
            </div>
            <span className="font-bold text-lg tracking-tight uppercase">MedReserve</span>
          </div>

          {/* Dynamic Content Transition Box */}
          <div className="my-8 space-y-6 transition-all duration-700 ease-in-out transform">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/60 px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              {slides[currentSlide].subtitle}
            </span>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
              {slides[currentSlide].title}
            </h1>

            {/* Feature Description */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-emerald-800 rounded-lg text-white mt-1 shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">
                    {slides[currentSlide].featureTitle}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed mt-0.5">
                    {slides[currentSlide].featureDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Static Institutional Facts Area */}
            <div className="border-t border-slate-200/80 pt-4 space-y-2 text-xs font-semibold text-emerald-800">
              <p className="flex items-center gap-2">
                <span className="text-lg text-emerald-600 font-bold">+</span> Largest Certified Network of Practitioner Clinics
              </p>
              <p className="flex items-center gap-2">
                <span className="text-lg text-emerald-600 font-bold">+</span> Complete security matrix encrypted client history
              </p>
            </div>
          </div>

          {/* Action buttons footer */}
          <div className="flex items-center space-x-4 pt-4">
            <Link
              href="/appointments"
              className="inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-sm font-bold rounded-xl text-white bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] transition-all duration-200 shadow-md"
            >
              Find Specialists
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <span className="text-xs font-bold text-slate-400 hidden sm:inline">
              URL: MEDRESERVEHEALTH.COM
            </span>
          </div>
        </div>

        {/* RIGHT COMPONENT: ইমেজ কারোসেল বা স্লাইডার */}
        <div className="md:col-span-5 min-h-[350px] md:min-h-full relative bg-slate-900 overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-105 pointer-events-none"
              }`}
            >
              {/* Overlay mask */}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#f4f7f1] via-transparent to-black/10 z-10" />
              
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover"
              />

              {/* Float Badge */}
              <span className="absolute top-6 right-6 z-20 bg-emerald-800 text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md">
                {slide.badge}
              </span>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-6 right-6 z-20 flex space-x-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "w-6 bg-emerald-800" : "w-2.5 bg-slate-300/70 hover:bg-slate-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
      <TickerNotice />
    </div>
  );
}