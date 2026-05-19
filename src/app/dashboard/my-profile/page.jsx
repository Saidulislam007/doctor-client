"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Save, Image, Camera } from "lucide-react";
import { useSession } from "@/lib/auth-client"; // Better-Auth সেশন ইম্পোর্ট করা হলো
import { toast } from "react-hot-toast";

export default function MyProfilePage() {
  const { data: sessionData } = useSession();

  // সেশনে যদি ইমেজ থাকে সেটা ইনিশিয়াল ভ্যালু হিসেবে সেট হবে
  const [profile, setProfile] = useState({
    name: "Md. Saidul Islam",
    email: "saidul.dev@example.com",
    phone: "+8801712345678",
    address: "Khulna, Bangladesh",
    bloodGroup: "O+",
    image: sessionData?.user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150", // ব্যাকআপ ডামি ইমেজ
  });

  const handleProfileUpdateSubmit = (e) => {
    e.preventDefault();
    if (!profile.name || !profile.email || !profile.phone) {
      return toast.error("Required credential parameters cannot be left blank.");
    }
    // ব্যাকএন্ড এপিআই কানেকশনের জন্য সিমুলেশন টোস্ট
    toast.success("Profile records with avatar updated successfully!");
  };

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

          {/* ফিক্সড: প্রোফাইল পিকচার বা ইমেজের ইউআরএল পরিবর্তন করার নতুন ইনপুট ফিল্ড */}
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
                className="w-full bg-transparent border-0 p-0 text-sm focus:ring-0 text-slate-800 font-semibold focus:outline-none"
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
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 py-3 px-6 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-md transition-all pt-3 active:scale-95"
          >
            <Save className="h-4 w-4" />
            <span>Update Profile Data</span>
          </button>

        </form>
      </div>
    </div>
  );
}