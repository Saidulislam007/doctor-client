"use client";

import Image from "next/image";
import { Check, Star, ArrowRight } from "lucide-react";

export default function AboutSection() {
  const points = [
    "Therapist-Approved Healing Practices",
    "No Synthetic Products or Additives",
    "Free Consultation with Every Booking",
    "Evidence-Based Clinical Protocols"
  ];

  return (
    <section className="w-full py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE: Image Composition with Organic Shapes */}
          <div className="relative flex justify-center lg:justify-start">
            {/* Main Large Image */}
            <div className="relative z-10 w-[280px] h-[380px] sm:w-[350px] sm:h-[450px] overflow-hidden rounded-[60px] shadow-2xl border-8 border-white animate-[fadeIn_0.6s_ease-out]">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop"
                alt="Doctor consultation"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping Smaller Image */}
            <div className="absolute -bottom-10 -left-4 sm:-left-10 z-20 w-[180px] h-[220px] sm:w-[220px] sm:h-[280px] overflow-hidden rounded-[40px] shadow-2xl border-8 border-white hidden sm:block animate-[slideUp_0.8s_ease-out]">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop"
                alt="Patient care"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Background Decorative Element */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10" />
          </div>

          {/* RIGHT SIDE: Content Area */}
          <div className="space-y-8">
            
            {/* Customer Review Badge */}
            <div className="flex items-center space-x-4 bg-emerald-50 w-max px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white object-cover"
                    src={`https://i.pravatar.cc/150?u=${i + 20}`}
                    alt="user"
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center text-amber-500">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="ml-1 text-xs font-bold text-slate-800">5.0</span>
                </div>
                <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-tighter">Customer Reviews</p>
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 leading-[1.1] tracking-tight">
              We are a dedicated healthcare provider committed to delivering <span className="text-emerald-600">safe and accessible</span> services.
            </h2>

            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              Our experienced team of board-certified doctors, nurses, and clinical specialists work together to ensure every patient receives personalized attention and accurate treatment path through our modern scheduling ecosystem.
            </p>

            {/* Feature Points with Emerald Check Icons */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {points.map((point, index) => (
                <li key={index} className="flex items-center space-x-3 text-slate-700 font-medium text-sm sm:text-base group">
                  <div className="p-1 bg-emerald-100 rounded-full text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="group inline-flex items-center justify-center px-8 py-4 bg-emerald-700 text-white font-bold rounded-2xl hover:bg-emerald-800 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-emerald-100">
                Book an Appointment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}