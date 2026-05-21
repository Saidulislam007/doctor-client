"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Clock, User, Phone, FileText, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function BookingCheckoutPage() {
  const params = useParams();
  const router = useRouter();
  
  // 🎯 ১. ইউআরএল থেকে মঙ্গোডিবির অরিজিনাল আইডি রিসিভ করা হলো ভাই
  const doctorId = params.id;

  // লাইভ ডাটা এবং লোডিং ম্যানেজমেন্ট স্টেটসমূহ
  const [doctor, setDoctor] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    appointmentDate: "",
    timeSlot: "",
    symptoms: "",
  });

  // 🎯 ২. ব্যাকএন্ড থেকে ডাক্তারের রিয়েল-টাইম ডাটা ফেচ করে আনার মাস্টার হুক ভাই
  useEffect(() => {
    const fetchDoctorForCheckout = async () => {
      if (!doctorId || doctorId === "undefined") return;

      try {
        setPageLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctors/${doctorId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include" // Better Auth সেশন কুকি পাস করার জন্য ভাই
        });

        if (!response.ok) {
          throw new Error("Unable to retrieve doctor parameters");
        }

        const data = await response.json();
        setDoctor(data);
        
        // ডাইনামিক ব্রাউজার ট্যাব টাইটেল
        document.title = `Checkout - Booking with ${data.name} | MedReserve`;
      } catch (err) {
        console.error("❌ Checkout profile sync error:", err.message);
        toast.error("Failed to load doctor summary for checkout");
      } finally {
        setPageLoading(false);
      }
    };

    fetchDoctorForCheckout();
  }, [doctorId]);

  // ডামি অ্যাভেইলেবল টাইম স্লট
  const availableSlots = [
    "05:00 PM - 05:30 PM",
    "05:30 PM - 06:00 PM",
    "06:30 PM - 07:00 PM",
    "07:00 PM - 07:30 PM"
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    
    if (!formData.patientName || !formData.patientPhone || !formData.appointmentDate || !formData.timeSlot) {
      return toast.error("Please fill in all required fields.");
    }

    setLoading(true);
    
    try {
      // 🎯 ৩. ব্যাকএন্ডে সাকসেসফুল অ্যাপয়েন্টমেন্ট পোস্ট কল ভাই
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          doctorId: doctorId,
          doctorName: doctor?.name, 
          specialty: doctor?.specialty,
          fee: doctor?.fee || 1000
        }),
      });

      const data = await response.json();

      if (data.acknowledged || data.insertedId) {
        toast.success(`Appointment with ${doctor?.name} successfully requested!`);
        router.push("/dashboard");
      } else {
        toast.error("Something went wrong while saving the appointment.");
      }

    } catch (error) {
      console.error("❌ Booking Error:", error);
      toast.error("Server-side connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ⏳ পেজ প্রথম লোড হওয়ার সময় প্রিমিয়াম স্পিনার স্ক্রিন ভাই
  if (pageLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/60 p-4">
        <Loader2 className="h-10 w-10 text-emerald-800 animate-spin shrink-0" />
        <p className="text-sm font-bold text-slate-500 mt-3 tracking-wide">Securing Checkout Ledger Environment...</p>
      </div>
    );
  }

  // ❌ আইডি ডাটাবেজে না মিললে সেফটি গেটওয়ে
  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Doctor Profile Untraceable</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">The practitioner node has expired or does not exist.</p>
        <button onClick={() => router.back()} className="mt-5 inline-flex items-center space-x-2 text-emerald-800 font-bold bg-white border border-slate-200 px-5 py-2.5 rounded-xl shadow-sm transition-all">
          <ArrowLeft className="h-4 w-4" /> <span>Return & Try Again</span>
        </button>
      </div>
    );
  }

  // ✅ ডাটা সফলভাবে সিঙ্ক হলে মেইন বুকিং ফর্ম রেন্ডার
  return (
    <div className="min-h-screen bg-slate-50/60 py-12">
      <div className="max-w-2xl mx-auto px-4">
        
        {/* Cancel Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center space-x-2 text-sm font-bold text-slate-500 hover:text-emerald-800 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm mb-6 transition-all active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Cancel & Go Back</span>
        </button>

        {/* Header Summary Box */}
        <div className="bg-emerald-950 text-white p-6 rounded-3xl shadow-md mb-6 flex items-center justify-between">
          <div>
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider">You are booking an appointment with</p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">{doctor.name}</h2>
            <p className="text-xs text-emerald-200/80 font-medium">{doctor.specialty} Specialist</p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-emerald-400 font-bold uppercase">Total Payable</p>
            <p className="text-xl font-black">৳{doctor.fee || 1000}</p>
          </div>
        </div>

        {/* Main Checkout Form Core */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-5">
            Patient & Schedule Information
          </h3>

          <form onSubmit={handleSubmitBooking} className="space-y-4">
            
            {/* Patient Name input */}
            <div className="relative border border-slate-300 focus-within:border-emerald-800 rounded-xl px-3 py-1.5 transition-colors group">
              <label className="block text-[11px] font-bold text-slate-500 group-focus-within:text-emerald-800 uppercase tracking-wider">Patient Full Name *</label>
              <div className="flex items-center space-x-2 mt-0.5">
                <User className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  name="patientName"
                  required
                  className="w-full bg-transparent p-0 border-0 text-slate-900 text-sm focus:ring-0 focus:outline-none placeholder-slate-400"
                  placeholder="e.g. Md. Saidul Islam"
                  value={formData.patientName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Patient Phone input */}
            <div className="relative border border-slate-300 focus-within:border-emerald-800 rounded-xl px-3 py-1.5 transition-colors group">
              <label className="block text-[11px] font-bold text-slate-500 group-focus-within:text-emerald-800 uppercase tracking-wider">Contact Number *</label>
              <div className="flex items-center space-x-2 mt-0.5">
                <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                <input
                  type="tel"
                  name="patientPhone"
                  required
                  className="w-full bg-transparent p-0 border-0 text-slate-900 text-sm focus:ring-0 focus:outline-none placeholder-slate-400"
                  placeholder="e.g. +88017XXXXXXXX"
                  value={formData.patientPhone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Two Column Grid for Date and Slots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Select Date */}
              <div className="relative border border-slate-300 focus-within:border-emerald-800 rounded-xl px-3 py-1.5 transition-colors group">
                <label className="block text-[11px] font-bold text-slate-500 group-focus-within:text-emerald-800 uppercase tracking-wider">Preferred Date *</label>
                <div className="flex items-center space-x-2 mt-0.5">
                  <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                  <input
                    type="date"
                    name="appointmentDate"
                    required
                    className="w-full bg-transparent p-0 border-0 text-slate-900 text-sm focus:ring-0 focus:outline-none text-slate-700"
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Select Time Slot */}
              <div className="relative border border-slate-300 focus-within:border-emerald-800 rounded-xl px-3 py-1.5 transition-colors group">
                <label className="block text-[11px] font-bold text-slate-500 group-focus-within:text-emerald-800 uppercase tracking-wider">Available Slots *</label>
                <div className="flex items-center space-x-2 mt-0.5">
                  <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                  <select
                    name="timeSlot"
                    required
                    className="w-full bg-transparent p-0 border-0 text-slate-900 text-sm focus:ring-0 focus:outline-none text-slate-700 cursor-pointer"
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a Slot</option>
                    {availableSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Symptoms Description Input */}
            <div className="relative border border-slate-300 focus-within:border-emerald-800 rounded-xl px-3 py-1.5 transition-colors group">
              <label className="block text-[11px] font-bold text-slate-500 group-focus-within:text-emerald-800 uppercase tracking-wider">Symptoms / Notes (Optional)</label>
              <div className="flex items-start space-x-2 mt-1">
                <FileText className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <textarea
                  name="symptoms"
                  rows="3"
                  className="w-full bg-transparent p-0 border-0 text-slate-900 text-sm focus:ring-0 focus:outline-none placeholder-slate-400 resize-none"
                  placeholder="Describe your medical condition briefly..."
                  value={formData.symptoms}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center space-x-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none transition-all duration-200 shadow-md mt-4"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <span>Confirm & Proceed to Booking</span>
                </>
              )}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}