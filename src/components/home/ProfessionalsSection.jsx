"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ProfessionalsSection() {
  // কোন ট্যাবটি ওপেন থাকবে তার স্টেট (ডিফল্ট প্রথমটা ওপেন)
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    {
      id: 0,
      title: "Why Patients Trust Us",
      content: [
        "Trusted specialists providing holistic, effective care.",
        "Compassionate professionals guiding your wellness journey."
      ]
    },
    {
      id: 1,
      title: "Personalized Healing Programs",
      content: [
        "Tailored medical treatments built around your specific lifestyle.",
        "Continuous diagnostic monitoring for sustained physical recovery."
      ]
    },
    {
      id: 2,
      title: "100% Natural Wellness Methods",
      content: [
        "Evidence-based therapeutic exercises without synthetic over-reliance.",
        "Certified clinical integration with nature-centric recovery tracks."
      ]
    }
  ];

  return (
    <section className="w-full py-20 bg-[#edf5ed]/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Accordion & Texts (Occupies 5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#004d31] tracking-tight leading-tight">
                Experienced & Certified <br /> Medical Professionals
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Book your appointment today and receive trusted medical care from experienced professionals.
              </p>
            </div>

            {/* Interactive Accordion Cards */}
            <div className="space-y-3.5 pt-2">
              {tabs.map((tab, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div
                    key={tab.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
                      isActive
                        ? "bg-gradient-to-r from-[#8cc63f] to-[#22573e] text-white p-6 shadow-md relative"
                        : "bg-white text-slate-800 p-5 border border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    <h3 className={`text-base font-bold tracking-wide ${isActive ? "text-white" : "text-slate-800"}`}>
                      {tab.title}
                    </h3>

                    {/* Active State Features Content List */}
                    {isActive && (
                      <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-emerald-50/90 font-medium animate-[fadeIn_0.3s_ease-out] list-disc list-inside pl-1">
                        {tab.content.map((point, pIdx) => (
                          <li key={pIdx} className="leading-relaxed">{point}</li>
                        ))}
                        {/* Mockup Mouse Cursor Pointer Replica */}
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-90 hidden sm:block">
                          <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24">
                            <path d="M7 2l12 11.2-5.3.6 3.5 6.3-2.3 1.3-3.5-6.3-4.4 3.9z"/>
                          </svg>
                        </div>
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Book an Appointment Custom Button */}
            <div className="pt-4">
              <Link
                href="/appointments"
                className="group inline-flex items-center justify-between gap-3 bg-gradient-to-r from-[#1b4332] to-[#8cc63f] hover:from-[#143225] hover:to-[#7cb334] text-white font-bold pl-6 pr-2 py-2 rounded-full transition-all duration-300 ease-out shadow-md"
              >
                <span className="text-xs sm:text-sm tracking-wide">Book an Appointment</span>
                <div className="h-8 w-8 rounded-full bg-white text-slate-800 flex items-center justify-center group-hover:rotate-45 transition-all duration-300 shadow-sm shrink-0">
                  <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
                </div>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Nested Image Panels & Graph Widget (Occupies 7 Columns) */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
            
            {/* Main Container Image with Mockup Rounded Corners */}
            <div className="relative w-full max-w-[540px] h-[400px] sm:h-[500px] overflow-hidden rounded-[40px] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop"
                alt="Smiling Medical Professionals"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
            </div>

            {/* FLOAT INFOGRAPHIC BOARD (পেশেন্ট কার্ড এবং হেলথ গ্রাফ কম্বিনেশন) */}
            <div className="absolute -bottom-6 left-4 right-4 sm:left-10 sm:right-6 bg-white rounded-3xl p-4 shadow-2xl z-20 max-w-[460px] grid grid-cols-1 sm:grid-cols-12 gap-4 border border-slate-100 animate-[slideUp_0.6s_ease-out]">
              
              {/* Left Side: Inline Micro Patient Image */}
              <div className="sm:col-span-6 h-24 w-full overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&auto=format&fit=crop"
                  alt="Patient Recovery Activity"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Side: Rendered Pure CSS "Your Health Activity" Bar Chart */}
              <div className="sm:col-span-6 flex flex-col justify-between py-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Your Health Activity
                </span>
                
                {/* Simulated Graph Bars using Tailwind heights */}
                <div className="flex items-end justify-between h-12 pt-2 gap-1.5 px-1">
                  <div className="w-full bg-emerald-200/60 rounded-sm h-[40%]" />
                  <div className="w-full bg-emerald-600 rounded-sm h-[70%]" />
                  <div className="w-full bg-emerald-500 rounded-sm h-[55%]" />
                  <div className="w-full bg-emerald-700 rounded-sm h-[95%]" />
                  <div className="w-full bg-emerald-400 rounded-sm h-[35%]" />
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}