"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Save, Image, Camera, Loader2, ShieldCheck } from "lucide-react";
import { useSession } from "@/lib/auth-client"; // Better-Auth সেশন হুক
import { toast } from "react-hot-toast";

export default function MyProfilePage() {
  useEffect(() => {
    // 🎯 এই লাইনের কারণে ব্রাউজার ট্যাব সরাসরি চেঞ্জ হয়ে যাবে ভাই!
    document.title = "My Profile | MedReserve"; 
  }, []);

  const { data: sessionData, isPending } = useSession(); // সেশন এবং সেশন লোডিং স্টেট ধরা হলো
  const [loading, setLoading] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(false);

  // প্রোফাইল স্টেট ফ্রেমওয়ার্ক
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bloodGroup: "O+",
    image: "",
  });

  // 🎯 ১. ডাটাবেজে আগে থেকে সেভ করা প্রোফাইল ডাটা ব্যাকএন্ড থেকে টেনে আনার হুক ভাই
  useEffect(() => {
    const loadDatabaseProfile = async () => {
      if (!sessionData?.user?.email) return;

      try {
        setFetchingProfile(true);
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://doctor-server-navy-one.vercel.app".trim();
        
        // সব ইউজারের লিস্ট থেকে কারেন্ট ইমেইলের ডাটা খোঁজা হচ্ছে ভাই
        const response = await fetch(`${apiBaseUrl}/users`);
        if (response.ok) {
          const allUsers = await response.json();
          const matchedUser = allUsers.find(u => u.email === sessionData.user.email);
          
          if (matchedUser) {
            // ডাটাবেজে ইউজার প্রোফাইল পাওয়া গেলে তা স্টেটে সিঙ্ক করা হলো ভাই
            setProfile({
              name: matchedUser.name || sessionData.user.name || "",
              email: matchedUser.email || sessionData.user.email || "",
              phone: matchedUser.phone || "",
              address: matchedUser.address || "",
              bloodGroup: matchedUser.bloodGroup || "O+",
              image: matchedUser.image || sessionData.user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150",
            });
            return;
          }
        }
      } catch (err) {
        console.error("❌ Error loading saved profile from DB:", err.message);
      } finally {
        setFetchingProfile(false);
      }

      // ডাটাবেজে ডাটা না থাকলে ডিফল্ট সেশন ডাটা সেট হবে ভাই
      setProfile((prev) => ({
        ...prev,
        name: sessionData.user.name || "Verified Patient",
        email: sessionData.user.email || "",
        image: sessionData.user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150",
      }));
    };

    loadDatabaseProfile();
  }, [sessionData]);

  // 🎯 ২. ফ্রন্টএন্ড থেকে ব্যাকএন্ড এপিআই-তে ইউজার ডাটা পাঠিয়ে UPDATE/PUT করার মেইন হ্যান্ডেলার
  const handleProfileUpdateSubmit = async (e) => {
    e.preventDefault();
    
    if (!profile.name || !profile.email || !profile.phone) {
      return toast.error("Required credential parameters cannot be left blank.");
    }

    setLoading(true);

    try {
      // 🎯 ফিক্সড: সেফ প্রোডাকশন ব্যাকএন্ড ইউআরএল মেকানিজম ভাই
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://doctor-server-navy-one.vercel.app".trim();
      
      const response = await fetch(`${apiBaseUrl}/users/${profile.email}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: sessionData?.user?.id, 
          name: profile.name,
          phone: profile.phone,
          address: profile.address,
          bloodGroup: profile.bloodGroup,
          image: profile.image,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();

      // 🎯 মঙ্গোডিবির আপসাইড রেসপন্স সিঙ্কিং (acknowledged অথবা modifiedCount যেকোনো একটা ট্রু হলেই সাকসেস ভাই)
      if (data.acknowledged || data.modifiedCount > 0 || data.upsertedCount > 0) {
        toast.success("Profile metrics synced and updated in database successfully! 🎉");
      } else {
        toast.error("No metrics were modified. Profile is already up to date.");
      }
    } catch (error) {
      console.error("❌ Profile Update Submit Error:", error.message);
      toast.error("Server connection failed. Profile could not be updated.");
    } finally {
      setLoading(false);
    }
  };

  // ⏳ সেশন বা প্রোফাইল ডাটা লোড হওয়ার গ্লসি স্পিনার স্ক্রিন ভাই
  if (isPending || fetchingProfile) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-transparent">
        <Loader2 className="h-8 w-8 text-emerald-800 animate-spin shrink-0" />
        <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-3">Syncing Authenticated Identity Parameters...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-8 text-left animate-[fadeIn_0.4s_ease-out] pb-10">
      
      {/* ================= HERO HEADING CARD ================= */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 p-6 sm:p-8 rounded-[32px] shadow-xl border border-slate-800 text-white group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-500/5 rounded-full blur-[40px] pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/15 backdrop-blur-md text-emerald-400 px-3.5 py-1.5 rounded-xl text-xs font-black tracking-wide border border-emerald-500/20 uppercase">
            <ShieldCheck className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Identity Profile Gateway</span>
          </div>
          
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Patient Personal Profile
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed max-w-xl">
              Manage, secure, and sync your live healthcare credentials and avatar metrics across the encrypted decentralized clinical core.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-slate-200/80 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* =============== USER IMAGE AVATAR SECTION =============== */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-5 border-b border-slate-100">
          <div className="relative h-24 w-24 rounded-2xl border-4 border-slate-100 shadow-md overflow-hidden bg-slate-50 shrink-0 group">
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
            <h3 className="font-black text-slate-900 text-xl leading-tight">{profile.name || "Verified Patient"}</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Live Profile Avatar Preview</p>
          </div>
        </div>

        {/* =============== PROFILE FORM SECTION =============== */}
        <form onSubmit={handleProfileUpdateSubmit} className="space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 ml-0.5">Full Name *</label>
              <div className="flex items-center space-x-2.5 border border-slate-200 focus-within:border-emerald-800 rounded-xl px-3 py-3 bg-slate-50 focus-within:bg-white transition-all">
                <User className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-0 p-0 text-sm focus:ring-0 text-slate-800 font-bold focus:outline-none"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 ml-0.5">Blood Group</label>
              <select
                className="w-full border border-slate-200 focus:border-emerald-800 focus:ring-0 rounded-xl px-3 py-3 bg-slate-50 text-sm font-bold text-slate-800 focus:outline-none cursor-pointer transition-all"
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
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 ml-0.5">Profile Image URL</label>
            <div className="flex items-center space-x-2.5 border border-slate-200 focus-within:border-emerald-800 rounded-xl px-3 py-3 bg-slate-50 focus-within:bg-white transition-all">
              <Image className="h-4 w-4 text-slate-400" />
              <input
                type="url"
                className="w-full bg-transparent border-0 p-0 text-sm focus:ring-0 text-slate-800 font-bold focus:outline-none placeholder-slate-400"
                placeholder="https://example.com/your-photo.jpg"
                value={profile.image}
                onChange={(e) => setProfile({ ...profile, image: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 ml-0.5">Email Address *</label>
            <div className="flex items-center space-x-2.5 border border-slate-200 rounded-xl px-3 py-3 bg-slate-100 text-slate-400">
              <Mail className="h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                disabled 
                className="w-full bg-transparent border-0 p-0 text-sm focus:ring-0 text-slate-500 font-bold focus:outline-none disabled:cursor-not-allowed"
                value={profile.email}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 ml-0.5">Contact Number *</label>
            <div className="flex items-center space-x-2.5 border border-slate-200 focus-within:border-emerald-800 rounded-xl px-3 py-3 bg-slate-50 focus-within:bg-white transition-all">
              <Phone className="h-4 w-4 text-slate-400" />
              <input
                type="tel"
                required
                className="w-full bg-transparent border-0 p-0 text-sm focus:ring-0 text-slate-800 font-bold focus:outline-none"
                placeholder="+8801XXXXXXXXX"
                value={profile.phone || ""}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 ml-0.5">Home Address</label>
            <div className="flex items-center space-x-2.5 border border-slate-200 focus-within:border-emerald-800 rounded-xl px-3 py-3 bg-slate-50 focus-within:bg-white transition-all">
              <MapPin className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                className="w-full bg-transparent border-0 p-0 text-sm focus:ring-0 text-slate-800 font-bold focus:outline-none"
                placeholder="Enter your permanent address"
                value={profile.address || ""}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              />
            </div>
          </div>

          {/* লোডিং এনিমেশন বাটন */}
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 py-3 px-6 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-black rounded-xl shadow-md transition-all active:scale-95 disabled:bg-slate-300 disabled:cursor-not-allowed mt-2"
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