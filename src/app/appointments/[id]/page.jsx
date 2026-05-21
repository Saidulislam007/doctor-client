"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ArrowLeft, Calendar, Award, MapPin, CheckCircle2, Loader2 } from "lucide-react";

export default function DoctorDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  // 🎯 ১. নেক্সট জেএস ইউআরএল থেকে আইডি সেফলি রিসিভ করা হলো ভাই
  const doctorId = params.id; 

  // 🎯 ২. রিয়্যাক্ট রুলস অনুযায়ী সব স্টেট হুক সবার ওপরে ডিক্লেয়ার করা হলো
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // 🎯 ব্রাউজার ট্যাবের নাম ডাইনামিকালি চেঞ্জ করার ম্যাজিক হুক ভাই!
  useEffect(() => {
    if (doctor && doctor.name) {
      // ডাক্তার ডাটা লোড হলে ট্যাবে ডাক্তারের নাম দেখাবে ভাই
      document.title = `${doctor.name} | MedReserve`;
    } else {
      // ডাটা লোড হওয়ার আগ পর্যন্ত বা এরর থাকলে ডিফল্ট নাম থাকবে
      document.title = "Doctor Details | MedReserve";
    }

    // 🎯 ক্লিনআপ ফাংশন: ইউজার যখন এই পেজ থেকে বের হয়ে যাবে, তখন টাইটেল আগের মতো হয়ে যাবে
    return () => {
      document.title = "MedReserve | Premier Doctor Appointment";
    };
  }, [doctor]); // doctor স্টেট চেঞ্জ হলেই এটি রান করবে ভাই

  // 🎯 ৩. লাইভ ব্যাকএন্ড থেকে নির্দিষ্ট ডাক্তারের ডাটা নিয়ে আসার সিঙ্কড হুক
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      // সুরক্ষার জন্য কন্ডিশনাল চেক (আইডি না আসা পর্যন্ত ফেচ কল টোটালি অফ থাকবে)
      if (!doctorId || doctorId === "undefined") return;

      try {
        setLoading(true);
        setError(null);
        
        // 🎯 কুকি থেকে অথেনটিকেশন টোকেন রিড করার জন্য পিওর জাভাস্ক্রিপ্ট হেল্পার লজিক ভাই
        const getCookie = (name) => {
          if (typeof window === "undefined") return "";
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(";").shift();
          return "";
        };
        
        // Better Auth টোকেন বা কাস্টম JWT কুকি থেকে চেক করা হচ্ছে ভাই
        const token = getCookie("token") || getCookie("better-auth.session_token");

        // 🎯 ফিক্সড: ডাবল ডোমেইনের ৪0৪ এরর চিরতরে দূর করার জন্য ডাইনামিক ও আল্ট্রা-সেফ ফলব্যাক ইউআরএল লজিক ভাই!
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://doctor-server-navy-one.vercel.app".trim();

        // ডাইনামিক সিঙ্গেল ডক্টর এন্ডপয়েন্টে হিট করা হলো ভাই
        const response = await fetch(`${apiBaseUrl}/doctors/${doctorId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}` // 🎯 ফিক্সড: এই চাবিকাঠিটি যুক্ত করায় এখন আর ৪০১ Unauthorized এরর আসবে না ভাই!
          },
          credentials: "include" // 🎯 Better Auth সেশন কুকি ব্যাকএন্ডে পাস করানোর মাস্টার কি!
        });
        
        if (!response.ok) {
          throw new Error("Doctor profile not found or server offline");
        }
        
        const data = await response.json();
        setDoctor(data);
      } catch (err) {
        console.error("❌ Fetching details error:", err.message);
        setError(err.message || "Something went wrong while loading doctor details");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]); // 🎯 doctorId চেঞ্চ হলেই কেবল এই হুকটি আবার রান করবে ভাই

  // ⏳ কন্ডিশন ১: ডাটা লোড হওয়ার সময় প্রফেশনাল স্পিনার লোডার স্ক্রিন
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/60 p-4">
        <Loader2 className="h-10 w-10 text-emerald-800 animate-spin shrink-0" />
        <p className="text-sm font-bold text-slate-500 mt-3 tracking-wide">Syncing Clinical Practitioner Profile...</p>
      </div>
    );
  }

  // ❌ কন্ডিশন ২: যদি আইডি ডাটাবেজে না মিলে বা ব্যাকএন্ড কানেকশন ফেল করে
  if (error || !doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Profile Sync Failed</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">{error || "Doctor Profile Not Found!"}</p>
        <Link href="/appointments" className="mt-5 inline-flex items-center space-x-2 text-emerald-800 font-bold bg-white border border-slate-200 px-5 py-2.5 rounded-xl shadow-sm hover:underline transition-all">
          <ArrowLeft className="h-4 w-4" /> <span>Back to Doctors List</span>
        </Link>
      </div>
    );
  }

  // ✅ কন্ডিশন ৩: ডাটা সফলভাবে চলে আসলে মূল পেজ রেন্ডার হবে ভাই
  return (
    <div className="min-h-screen bg-slate-50/60 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Return Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center space-x-2 text-sm font-bold text-slate-500 hover:text-emerald-800 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm transition-all mb-8 active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Listing</span>
        </button>

        {/* Profile Card Canvas */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row">
          <div className="md:w-2/5 h-80 md:h-auto relative bg-slate-100 shrink-0">
            <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top" />
            <div className="absolute top-4 left-4 bg-emerald-800 text-white text-[10px] font-black px-2.5 py-1 rounded-md tracking-wider shadow-md">
              VERIFIED PRACTITIONER
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                  {doctor.specialty}
                </span>
                <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-lg">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="text-sm font-black text-slate-800">{Number(doctor.rating).toFixed(1)}</span>
                  <span className="text-xs text-slate-400 font-bold">({doctor.reviews || 0} Reviews)</span>
                </div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {doctor.name}
                </h1>
                <p className="text-xs font-bold text-slate-400 mt-1 flex items-center space-x-1">
                  <Award className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                  <span>{Array.isArray(doctor.degrees) ? doctor.degrees.join(" • ") : doctor.degrees || "MBBS"}</span>
                </p>
              </div>

              <div className="pt-2">
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {doctor.bio || "No biography provided for this specialist."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start space-x-2 text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Chamber Clinic</p>
                    <p className="text-slate-800 mt-0.5 leading-snug">{doctor.location || "Khulna, Bangladesh"}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Calendar className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Next Availability</p>
                    <p className="text-slate-800 mt-0.5 leading-snug">{doctor.available || "Available Today"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Consultation Fee</p>
                <p className="text-xl font-black text-slate-900">৳১,০০০ <span className="text-xs font-medium text-slate-400">(Vat Incl.)</span></p>
              </div>
              <Link
                href={`/appointments/${doctor._id || doctor.id}/book`}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Book Appointment Now</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}