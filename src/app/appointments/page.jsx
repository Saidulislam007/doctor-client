"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Stethoscope, Clock, ShieldCheck, MapPin, ArrowUpRight } from "lucide-react";

export default function AppointmentsPage() {
  // ১০ জন ডাক্তারের ডামি ডেটাবেজ অ্যারে
  const initialDoctors = [
    {
      id: "doc-1",
      name: "Dr. Evelyn Vance",
      specialty: "Cardiologist",
      rating: 4.9,
      reviews: 142,
      experience: "12 years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
      location: "Dhaka Medical College",
      available: "Today",
    },
    {
      id: "doc-2",
      name: "Dr. Robert Chen",
      specialty: "Neurologist",
      rating: 4.7,
      reviews: 98,
      experience: "10 years",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
      location: "Apollo Hospitals",
      available: "Tomorrow",
    },
    {
      id: "doc-3",
      name: "Dr. Maria Noor",
      specialty: "Dermatologist",
      rating: 5.0,
      reviews: 210,
      experience: "8 years",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
      location: "Square Hospital",
      available: "Today",
    },
    {
      id: "doc-4",
      name: "Dr. Aris Thorne",
      specialty: "Pediatrician",
      rating: 4.6,
      reviews: 84,
      experience: "15 years",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
      location: "United Hospital",
      available: "Mon, May 25",
    },
    {
      id: "doc-5",
      name: "Dr. Sarah Jenkins",
      specialty: "Gynecologist",
      rating: 4.8,
      reviews: 165,
      experience: "11 years",
      image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=400&auto=format&fit=crop",
      location: "Labaid Specialized Hospital",
      available: "Today",
    },
    {
      id: "doc-6",
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      rating: 4.5,
      reviews: 73,
      experience: "14 years",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop",
      location: "Popular Consultation Center",
      available: "Wed, May 27",
    },
    {
      id: "doc-7",
      name: "Dr. Aliyah Rahman",
      specialty: "Psychiatrist",
      rating: 4.9,
      reviews: 112,
      experience: "9 years",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
      location: "National Institute of Mental Health",
      available: "Tomorrow",
    },
    {
      id: "doc-8",
      name: "Dr. David Kim",
      specialty: "Ophthalmologist",
      rating: 4.4,
      reviews: 55,
      experience: "7 years",
      image: "https://images.unsplash.com/photo-1637059824899-a441006a6875?q=80&w=400&auto=format&fit=crop",
      location: "Bangladesh Eye Hospital",
      available: "Today",
    },
    {
      id: "doc-9",
      name: "Dr. Johan Marley",
      specialty: "General Physician",
      rating: 4.7,
      reviews: 130,
      experience: "10 years",
      image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=400&auto=format&fit=crop",
      location: "Ibn Sina Medical College",
      available: "Thu, May 21",
    },
    {
      id: "doc-10",
      name: "Dr. Lisa Kudrow",
      specialty: "Endocrinologist",
      rating: 4.3,
      reviews: 42,
      experience: "6 years",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
      location: "BIRDEM General Hospital",
      available: "Fri, May 22",
    },
  ];

  // প্রফেশনাল সর্টিং লজিক: রেটিং অনুযায়ী ডেসেন্ডিং (৫.০ থেকে কমের দিকে) সিরিয়াল করা হলো
  const sortedDoctors = [...initialDoctors].sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Grid Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 mb-10 gap-4">
          <div className="space-y-2">
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
              key={doctor.id}
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
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wide">
                    {doctor.available}
                  </span>
                </div>
              </div>

              {/* Core Content Framework */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-5">
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md">
                      {doctor.specialty}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span className="text-sm font-black text-slate-800">{doctor.rating.toFixed(1)}</span>
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
                  
                  {/* ডাইনামিক আইডি দিয়ে ভিউ ডিটেইলস রাউট রিডাইরেকশন */}
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