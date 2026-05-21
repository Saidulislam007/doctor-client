"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import AnimatedRating from "./AnimatedRating.jsx";

export default function TestimonialSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
  }, []);

  const testimonials = [
    {
      id: 1,
      type: "text-only",
      quote: "After years of struggling with chronic issues, I finally changed my routine. This care plan was transformative. My health feels more stable, and every day looks brighter.",
      name: "Robert",
      role: "Patient",
      rating: 5.0, 
      gridSpan: "md:col-span-3"
    },
    {
      id: 2,
      type: "with-image",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
      quote: "After years of dry, clinical experiences, I finally found real relief. This gentle, structured formula was incredible. I connect better, recover faster, and feel confident in my care every day.",
      name: "Alex Martin",
      role: "Health Enthusiast",
      rating: 5.0,
      gridSpan: "md:col-span-6"
    },
    {
      id: 3,
      type: "text-only",
      quote: "Years of ongoing health issues improved instantly with this holistic treatment setup. My body feels stronger, more resilient, and stays comfortably balanced from morning to night.",
      name: "Johan Marley",
      role: "Student",
      rating: 4.8, 
      gridSpan: "md:col-span-3"
    },
    {
      id: 4,
      type: "text-only",
      quote: "This portal surprised me from the very first week. The response time improved, scheduling friction reduced, and my consultation flow started looking smoother, fresher, and faster.",
      name: "Leah Martinez",
      role: "Care Recipient",
      rating: 5.0,
      gridSpan: "md:col-span-3"
    },
    {
      id: 5,
      type: "text-only",
      quote: "I've never used anything this lightweight yet effective. It calms medical anxiety instantly, keeps data tracking locked in, and gives my family a soft, comfortable layer of security.",
      name: "Ariana Collins",
      role: "Wellness Consultant",
      rating: 4.9,
      gridSpan: "md:col-span-3"
    },
    {
      id: 6,
      type: "with-image",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
      quote: "After years of searching for right advice, I finally found real relief. This diagnostic formula was incredible. I hydrate better, follow suggestions naturally, and feel confide in my skin every day.",
      name: "Maria Noor",
      role: "Therapy Patient",
      rating: 5.0,
      gridSpan: "md:col-span-6"
    }
  ];

  return (
    <section ref={sectionRef} className="w-full py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-emerald-950 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-medium">
            Rejuvenate with soothing therapies crafted to bring harmony, peace
          </p>
        </div>

        {/* Testimonials 12-Column Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className={`${item.gridSpan} bg-[#f4f7f1]/60 border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:bg-[#f4f7f1] active:scale-[0.99] transition-all duration-700 ${
                isVisible ? "animate-slideInUp opacity-100" : "opacity-0 translate-y-[90px]"
              }`}
              style={{
                animationDelay: isVisible ? `${index * 250}ms` : "0ms",
              }}
            >
              {/* Content Conditional Layout */}
              {item.type === "with-image" ? (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  
                  {/* ================= 📸 IMAGE CONTAINER (SLIGHTLY EXPANDED FOR MOBILE) ================= */}
                  {/* 🎯 ফিক্সড: মোবাইলের জন্য সামান্য বাড়িয়ে h-36 w-36 করা হয়েছে, বড় স্ক্রিনে sm:h-48 sm:w-44 এ কনভার্ট হবে */}
                  <div className="sm:col-span-4 h-36 w-36 sm:h-48 sm:w-44 overflow-hidden rounded-2xl shadow-sm shrink-0 bg-slate-100/50 mx-auto sm:mx-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover object-top" 
                    />
                  </div>
                  
                  {/* Right Side Quote Context */}
                  <div className="sm:col-span-8 space-y-4 text-left w-full">
                    <span className="text-4xl font-serif text-slate-800 leading-none block select-none">“</span>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium line-clamp-4">
                      {item.quote}
                    </p>
                    <div className="border-t border-slate-200/50 pt-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{item.name}</h4>
                        <p className="text-xs font-semibold text-slate-400 mt-0.5">{item.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-slate-400">Grade</p>
                        <div className="flex items-center justify-end text-sm font-bold text-slate-800 mt-0.5">
                          <AnimatedRating targetValue={item.rating} />
                          <div className="flex text-amber-500 ml-1">
                            {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Text Only Standard Card Template
                <div className="space-y-4 flex flex-col justify-between h-full text-left">
                  <div className="space-y-2">
                    <span className="text-4xl font-serif text-slate-800 leading-none block select-none">“</span>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium line-clamp-5">
                      {item.quote}
                    </p>
                  </div>
                  <div className="border-t border-slate-200/50 pt-4 flex justify-between items-center mt-auto">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{item.name}</h4>
                      <p className="text-xs font-semibold text-slate-400 mt-0.5">{item.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-slate-400">Grade</p>
                      <div className="flex items-center justify-end text-sm font-bold text-slate-800 mt-0.5">
                        <AnimatedRating targetValue={item.rating} />
                        <div className="flex text-amber-500 ml-1">
                          {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}