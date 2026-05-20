"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ArrowLeft, Calendar, Award, MapPin, CheckCircle2, Loader2 } from "lucide-react";

export default function DoctorDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.id; // ডাইনামিক আইডি ইউআরএল থেকে রিড করা হচ্ছে

  // লাইভ ডাটা এবং লোডিং ম্যানেজমেন্ট স্টেট
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🎯 ব্যাকএন্ড এপিআই থেকে নির্দিষ্ট ডাক্তারের ডেটা ফেচ করার ইফেক্ট হুক
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        setLoading(true);
        // আপনার ব্যাকএন্ডের অল-ডক্টরস এপিআই কল করা হচ্ছে
        const response = await fetch("http://localhost:5000/doctors");
        
        if (!response.ok) {
          throw new Error("Failed to fetch doctors from server");
        }
        
        const doctorsData = await response.json();
        
        // এপিআই থেকে আসা সম্পূর্ণ ডাটাবেজ অ্যারে থেকে কাঙ্ক্ষিত আইডিটি খুঁজে বের করা হচ্ছে
        const foundDoctor = doctorsData.find((doc) => doc.id === doctorId);
        
        if (foundDoctor) {
          setDoctor(foundDoctor);
        } else {
          setError("Doctor profile not found in the database");
        }
      } catch (err) {
        console.error("❌ Fetching details error:", err.message);
        setError(err.message || "Something went wrong while loading doctor details");
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchDoctorDetails();
    }
  }, [doctorId]);

  // ⏳ কন্ডিশন ১: ডাটা লোড হওয়ার সময় প্রফেশনাল স্পিনার লোডার স্ক্রিন
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/60 p-4">
        <Loader2 className="h-10 w-10 text-emerald-800 animate-spin shrink-0" />
        <p className="text-sm font-bold text-slate-500 mt-3 tracking-wide">Syncing Clinical Practitioner Profile...</p>
      </div>
    );
  }

  // ❌ কন্ডিশন ২: যদি আইডি ভুল হয় বা ব্যাকএন্ড কানেকশন এরর আসে
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

  // ✅ কন্ডিশন ৩: ডাটা সফলভাবে চলে আসলে মূল পেজ রেন্ডার
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
                  <span className="text-xs text-slate-400 font-bold">({doctor.reviews} Reviews)</span>
                </div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {doctor.name}
                </h1>
                {/* অ্যারে মেথড সেফ করার জন্য কন্ডিশনাল চেকিং দেওয়া হয়েছে */}
                <p className="text-xs font-bold text-slate-400 mt-1 flex items-center space-x-1">
                  <Award className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                  <span>{Array.isArray(doctor.degrees) ? doctor.degrees.join(" • ") : doctor.degrees}</span>
                </p>
              </div>

              <div className="pt-2">
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {doctor.bio}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start space-x-2 text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Chamber Clinic</p>
                    <p className="text-slate-800 mt-0.5 leading-snug">{doctor.location}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Calendar className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Next Availability</p>
                    <p className="text-slate-800 mt-0.5 leading-snug">{doctor.available}</p>
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
                href={`/appointments/${doctor.id}/book`}
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