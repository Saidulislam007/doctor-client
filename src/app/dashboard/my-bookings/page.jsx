"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, User, Phone, Edit2, Trash2, X, Check, Loader2, HeartPulse, Activity } from "lucide-react";
import { toast } from "react-hot-toast";

export default function MyBookingsPage() {
  useEffect(() => {
    // 🎯 এই লাইনের কারণে ব্রাউজার ট্যাব সরাসরি চেঞ্জ হয়ে যাবে ভাই!
    document.title = "My Bookings | MedReserve"; 
  }, []);

  // লাইভ স্টেট ম্যানেজমেন্ট ফ্রেমওয়ার্ক
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // 🎯 ১. ডাটাবেজ থেকে সব অ্যাপয়েন্টমেন্ট ফেচ করে নিয়ে আসার হুক (ফিক্সড ইউআরএল মেকানিজম ভাই)
  const fetchBookings = async () => {
    try {
      setLoading(true);
      
      // 🎯 সেফ প্রোডাকশন ব্যাকএন্ড ইউআরএল ফলব্যাক ভাই
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://doctor-server-navy-one.vercel.app".trim();
      const response = await fetch(`${apiBaseUrl}/appointments`);
      
      if (!response.ok) {
        throw new Error("Failed to load appointments from server");
      }
      
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.error("❌ Fetching bookings error:", err.message);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 🎯 ২. আসল ব্যাকএন্ড ডিলিট রিকোয়েস্ট পাইপলাইন ফাংশন ভাই (ফিক্সড ইউআরএল মেকানিজম ভাই)
  const executeDeletePipeline = async (id) => {
    const loadingToast = toast.loading("Processing cancellation logs...");
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://doctor-server-navy-one.vercel.app".trim();
      const response = await fetch(`${apiBaseUrl}/appointments/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.deletedCount > 0) {
        setBookings(bookings.filter((b) => (b._id || b.id) !== id));
        toast.success("Appointment log deleted successfully from database. 🎉", { id: loadingToast });
      } else {
        toast.error("Failed to delete. Appointment not found in database.", { id: loadingToast });
      }
    } catch (err) {
      console.error("❌ Front-end Delete Error:", err.message);
      toast.error("Failed to connect with server for deletion.", { id: loadingToast });
    }
  };

  // 🗑️ ৩. লাইভ ডিলিট অ্যাকশন হ্যান্ডেলার (🎯 ব্রাউজার পপ-আপ মুক্ত প্রিমিয়াম টোস্ট কনফার্মেশন ইমপ্লিমেন্টেশন ভাই!)
  const handleDelete = (id, doctorName) => {
    toast((t) => (
      <div className="flex flex-col space-y-3 p-1 text-left">
        <p className="text-xs font-bold text-slate-800 leading-relaxed">
          Are you sure you want to completely cancel appointment with <span className="text-emerald-800 font-black">{doctorName}</span>?
        </p>
        
        {/* টোস্টের ভেতরের কাস্টম অ্যাকশন বাটন প্যানেল */}
        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-black rounded-lg transition-all active:scale-95"
          >
            No, Keep it
          </button>
          <button
            type="button"
            onClick={async () => {
              toast.dismiss(t.id); // কনফার্মেশন টোস্টটি বন্ধ করবে ভাই
              await executeDeletePipeline(id); // আপনার অরিজিনাল এপিআই ডিলিট লজিক ট্রিগার করবে
            }}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-black rounded-lg shadow-sm transition-all active:scale-95"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 6000, // ৬ সেকেন্ড পর্যন্ত স্ক্রিনে ভাসবে
      position: "top-center",
      style: {
        background: "#ffffff",
        color: "#334155",
        borderRadius: "20px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        padding: "12px",
        maxWidth: "350px"
      }
    });
  };

  // আপডেট পপ-আপ মোডাল সেটআপ
  const handleOpenUpdateModal = (booking) => {
    setEditingData({ ...booking });
    setIsEditModalOpen(true);
  };

  // 🔄 ৪. লাইভ আপডেট সাবমিট হ্যান্ডেলার (ফিক্সড ইউআরএল মেকানিজম ভাই)
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const targetId = editingData._id || editingData.id;

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://doctor-server-navy-one.vercel.app".trim();
      const response = await fetch(`${apiBaseUrl}/appointments/${targetId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName: editingData.patientName,
          patientPhone: editingData.patientPhone,
          appointmentDate: editingData.appointmentDate,
          timeSlot: editingData.timeSlot,
        }),
      });

      const data = await response.json();

      if (data.modifiedCount > 0 || data.acknowledged) {
        setBookings(bookings.map((b) => ((b._id || b.id) === targetId ? editingData : b)));
        setIsEditModalOpen(false);
        toast.success("Appointment schedule updated dynamically inside MongoDB! 🚀");
      } else {
        toast.error("No changes made to the appointment slots.");
      }
    } catch (err) {
      console.error("❌ Front-end Update Error:", err.message);
      toast.error("Failed to sync updated information with server.");
    }
  };

  // ⏳ কন্ডিশন ১: প্রফেশনাল গ্লসি লোডার
  if (loading) {
    return (
      <div className="w-full min-h-[55vh] flex flex-col items-center justify-center bg-transparent">
        <div className="p-4 bg-emerald-50 rounded-full text-emerald-800 animate-pulse mb-3">
          <Loader2 className="h-8 w-8 animate-spin shrink-0" />
        </div>
        <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Syncing Active Care Schedules...</p>
      </div>
    );
  }

  // ❌ কন্ডিশন ২: ডাটাবেজ খালি থাকলে প্রিমিয়াম এম্পটি স্টেট
  if (error || bookings.length === 0) {
    return (
      <div className="bg-white border border-slate-100 rounded-[32px] p-16 text-center max-w-xl mx-auto shadow-sm space-y-4 my-10 animate-[fadeIn_0.3s_ease-out]">
        <div className="mx-auto w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center border border-slate-100">
          <Activity className="h-8 w-8 stroke-[1.5]" />
        </div>
        <div className="space-y-1">
          <h3 className="text-slate-800 font-black text-lg">No Appointments Found</h3>
          <p className="text-sm text-slate-400 font-medium max-w-xs mx-auto">Your medical scheduling history is currently empty. Book a consultation to see active slots.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 text-left animate-[fadeIn_0.4s_ease-out] pb-10">
      
      {/* ================= HERO HEADING CARD ================= */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 p-6 sm:p-8 rounded-[32px] shadow-xl border border-slate-800 text-white group mb-8">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-500/5 rounded-full blur-[40px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/15 backdrop-blur-md text-emerald-400 px-3.5 py-1.5 rounded-xl text-xs font-black tracking-wide border border-emerald-500/20 uppercase">
              <HeartPulse className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Clinical Consultation Deck</span>
            </div>
            
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                My Active Appointments
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xl leading-relaxed">
                Review and manage your real-time scheduled consultation sessions, secure active slots, or adjust timelines instantly.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2.5 bg-slate-900/40 backdrop-blur-sm px-4 py-3 rounded-2xl border border-slate-800/80 shrink-0 self-start sm:self-center shadow-inner group-hover:border-emerald-800/30 transition-all duration-300">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl animate-pulse">
              <HeartPulse className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none">Status</span>
              <span className="text-xs font-black text-slate-200 mt-1">{bookings.length} Slots Locked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Cards Container Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {bookings.map((item) => (
          <div key={item._id || item.id} className="bg-white border border-slate-200/60 rounded-[28px] p-6 shadow-sm flex flex-col justify-between space-y-5 hover:shadow-xl hover:border-emerald-800/10 transition-all duration-300 relative group top-0 hover:-top-1">
            
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-start">
                <div className="space-y-0.5">
                  <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-emerald-800 transition-colors">{item.doctorName || "Verified Doctor"}</h3>
                  <p className="text-xs font-extrabold text-emerald-800 uppercase tracking-wide">{item.specialty || "General Specialist"}</p>
                </div>
                <span className="flex items-center space-x-1.5 bg-emerald-50 text-[10px] font-black text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-100/50">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span>Active</span>
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-500 font-semibold bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100">
                <p className="flex items-center space-x-2.5"><User className="h-4 w-4 text-slate-400 shrink-0" /> <span>Patient: <strong className="text-slate-800 font-extrabold">{item.patientName}</strong></span></p>
                <p className="flex items-center space-x-2.5"><Phone className="h-4 w-4 text-slate-400 shrink-0" /> <span>Contact: <span className="text-slate-700">{item.patientPhone}</span></span></p>
                <p className="flex items-center space-x-2.5"><Calendar className="h-4 w-4 text-emerald-800 shrink-0" /> <span>Date: <span className="text-slate-900 font-bold">{item.appointmentDate}</span></span></p>
                <p className="flex items-center space-x-2.5"><Clock className="h-4 w-4 text-emerald-800 shrink-0" /> <span>Slot: <span className="text-slate-900 font-bold">{item.timeSlot}</span></span></p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button 
                type="button"
                onClick={() => handleOpenUpdateModal(item)} 
                className="inline-flex items-center justify-center space-x-2 py-2.5 px-4 bg-white border border-slate-200 hover:border-emerald-800 rounded-xl text-xs font-black text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <Edit2 className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-800 transition-colors" /> 
                <span>Reschedule</span>
              </button>
              <button 
                type="button"
                onClick={() => handleDelete(item._id || item.id, item.doctorName)} 
                className="inline-flex items-center justify-center space-x-2 py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-xs font-black text-rose-700 rounded-xl shadow-sm transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <Trash2 className="h-3.5 w-3.5" /> 
                <span>Cancel</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* ================= DYNAMIC MODAL COMPONENT ================= */}
      {isEditModalOpen && editingData && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-[32px] w-full max-w-md border border-slate-200/80 shadow-2xl overflow-hidden animate-[scaleUp_0.3s_ease-out]">
            
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center space-x-2 text-slate-800">
                <Activity className="h-4 w-4 text-emerald-800" />
                <h3 className="font-black text-sm text-slate-900">Modify Consultation Schedule</h3>
              </div>
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-xl transition-all"><X className="h-4 w-4" /></button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4">
              <div className="space-y-3.5">
                <div className="text-left">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 ml-0.5">Patient Name</label>
                  <input type="text" required className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-emerald-800 focus:ring-0 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none transition-all" value={editingData.patientName} onChange={(e) => setEditingData({ ...editingData, patientName: e.target.value })} />
                </div>
                
                <div className="text-left">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 ml-0.5">Phone Number</label>
                  <input type="tel" required className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-emerald-800 focus:ring-0 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:outline-none transition-all" value={editingData.patientPhone} onChange={(e) => setEditingData({ ...editingData, patientPhone: e.target.value })} />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 ml-0.5">Consultation Date</label>
                    <input type="date" required className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-800 focus:ring-0 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none cursor-pointer transition-all" value={editingData.appointmentDate} onChange={(e) => setEditingData({ ...editingData, appointmentDate: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 ml-0.5">Preferred Time Slot</label>
                    <select required className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-800 focus:ring-0 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none cursor-pointer transition-all" value={editingData.timeSlot} onChange={(e) => setEditingData({ ...editingData, timeSlot: e.target.value })} >
                      <option value="05:00 PM - 05:30 PM">05:00 PM - 05:30 PM</option>
                      <option value="05:30 PM - 06:00 PM">05:30 PM - 06:00 PM</option>
                      <option value="06:30 PM - 07:00 PM">06:30 PM - 07:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full flex items-center justify-center space-x-2 py-3 bg-emerald-800 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-950/10 hover:bg-emerald-900 active:scale-95 transition-all mt-4">
                <Check className="h-4 w-4 stroke-[2.5]" /> 
                <span>Save & Confirm Re-schedule</span>
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}