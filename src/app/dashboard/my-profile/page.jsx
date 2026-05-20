"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Save, Image, Camera, Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client"; // Better-Auth সেশন হুক
import { toast } from "react-hot-toast";

export default function MyProfilePage() {
  const { data: sessionData, isPending } = useSession(); // সেশন এবং সেশন লোডিং স্টেট ধরা হলো
  const [loading, setLoading] = useState(false);

  // প্রোফাইল স্টেট ফ্রেমওয়ার্ক (শুরুতে খালি থাকবে, সেশন থেকে ডাইনামিক ডাটা লোড হবে)
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bloodGroup: "O+",
    image: "",
  });

  // 🎯 ১. সেশন ডাটা লোড হওয়া মাত্রই হার্ডকোডেড ডাটা রিপ্লেস করে আসল ইউজারের ডাটা স্টেটে সিঙ্ক করার হুক
  useEffect(() => {
    if (sessionData?.user) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        name: sessionData.user.name || "Verified Patient",
        email: sessionData.user.email || "",
        image: sessionData.user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150", // backup avatar
      }));
    }
  }, [sessionData]);

  // 🎯 ২. ফ্রন্টএন্ড থেকে ব্যাকএন্ড এপিআই-তে ইউজার ডাটা পাঠিয়ে UPDATE/PUT করার মেইন হ্যান্ডেলার
  const handleProfileUpdateSubmit = async (e) => {
    e.preventDefault();
    
    // ভ্যালিডেশন সেফটি চেক
    if (!profile.name || !profile.email || !profile.phone) {
      return toast.error("Required credential parameters cannot be left blank.");
    }

    setLoading(true);

    try {
      // ⚡ আপনার নতুন ব্যাকএন্ড PUT এপিআই রাউটে ইউজারের ইউনিক ইমেইল পাঠিয়ে হিট করা হচ্ছে
      const response = await fetch(`http://localhost:5000/users/${profile.email}`, {
        method: "PUT", // POST পরিবর্তন করে PUT মেথড করা হলো রিয়েল-টাইম আপডেটের জন্য
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: sessionData?.user?.id, // সেশন আইডি ট্র্যাকিং
          name: profile.name,
          phone: profile.phone,
          address: profile.address,
          bloodGroup: profile.bloodGroup,
          image: profile.image,
        }),
      });

      const data = await response.json();

      // মঙ্গোডিবি থেকে updateOne সফল হলে (modifiedCount > 0 বা acknowledged ট্রু হলে)
      if (data.acknowledged || data.modifiedCount > 0) {
        toast.success("Profile metrics synced and updated in database successfully! 🎉");
      } else {
        toast.error("Failed to sync profile metrics with database.");
      }
    } catch (error) {
      console.error("❌ Profile Update Submit Error:", error.message);
      toast.error("Server connection failed. Please check backend port.");
    } finally {
      setProfile((prev) => ({ ...prev })); // UI স্টেট স্ট্যাবল রাখার জন্য
      setLoading(false);
    }
  };

  // ⏳ সেশন ডাটা ব্যাকএন্ড থেকে আসার পূর্ব মুহূর্ত পর্যন্ত প্রফেশনাল গ্লাস লোডার স্ক্রিন
  if (isPending) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-transparent">
        <Loader2 className="h-8 w-8 text-emerald-800 animate-spin shrink-0" />
        <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-3">Syncing Authenticated Identity Parameters...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6 text-left">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Patient Personal Profile</h1>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Manage and sync credential metrics</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* =============== USER IMAGE AVATAR SECTION =============== */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-4 border-b border-slate-100">
          <div className="relative h-24 w-24 rounded-full border-4 border-slate-100 shadow-md overflow-hidden bg-slate-50 shrink-0 group">
            {profile.image ? (
              <img 
                src={profile.image} 
                alt="Profile Avatar" 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-slate-400">
                <User className="h-10 w-10" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
              <Camera className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h3 className="font-bold text-slate-800 text-lg leading-tight">{profile.name}</h3>
            <p className="text-xs text-slate-400 font-medium">Profile Avatar Preview</p>
          </div>
        </div>

        {/* =============== PROFILE FORM SECTION =============== */}
        <form onSubmit={handleProfileUpdateSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Full Name *</label>
              <div className="flex items-center space-x-2 border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:bg-white focus-within:border-emerald-800 transition-all">
                <User className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-0 p-0 text-sm focus:ring-0 text-slate-800 font-semibold focus:outline-none"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Blood Group</label>
              <select
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-800 cursor-pointer"
                value={profile.bloodGroup}
                onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })}
              >
                <option value="A+">A+</option>
                <option value="O+">O+</option>
                <option value="B+">B+</option>
                <option value="AB+">AB+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Profile Image URL</label>
            <div className="flex items-center space-x-2 border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:bg-white focus-within:border-emerald-800 transition-all">
              <Image className="h-4 w-4 text-slate-400" />
              <input
                type="url"
                className="w-full bg-transparent border-0 p-0 text-sm focus:ring-0 text-slate-800 font-semibold focus:outline-none placeholder-slate-400"
                placeholder="https://example.com/your-photo.jpg"
                value={profile.image}
                onChange={(e) => setProfile({ ...profile, image: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Email Address *</label>
            <div className="flex items-center space-x-2 border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:bg-white focus-within:border-emerald-800 transition-all">
              <Mail className="h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                disabled // ইমেইল হলো প্রাইমারি কি ফিল্টার, তাই এটি চেঞ্জ করতে না দেওয়া সিকিউর প্র্যাকটিস ভাই
                className="w-full bg-transparent border-0 p-0 text-sm focus:ring-0 text-slate-400 font-semibold focus:outline-none disabled:cursor-not-allowed"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Contact Number *</label>
            <div className="flex items-center space-x-2 border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:bg-white focus-within:border-emerald-800 transition-all">
              <Phone className="h-4 w-4 text-slate-400" />
              <input
                type="tel"
                required
                className="w-full bg-transparent border-0 p-0 text-sm focus:ring-0 text-slate-800 font-semibold focus:outline-none"
                placeholder="+8801XXXXXXXXX"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Home Address</label>
            <div className="flex items-center space-x-2 border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:bg-white focus-within:border-emerald-800 transition-all">
              <MapPin className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                className="w-full bg-transparent border-0 p-0 text-sm focus:ring-0 text-slate-800 font-semibold focus:outline-none"
                placeholder="Enter your address"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              />
            </div>
          </div>

          {/* লোডিং এনিমেশন বাটন */}
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 py-3 px-6 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving Credentials...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Update Profile Data</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}