"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { Stethoscope, User, LogOut, Menu, X, Calendar, LayoutDashboard, Home } from "lucide-react";

export default function Navbar() {
  const { data: sessionData, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // সেফ সেশন অ্যাসাইনমেন্ট (লজিক অপরিবর্তিত)
  const session = sessionData?.user ? sessionData : null;

  // ফিক্সড লগআউট মেথড (লজিক অপরিবর্তিত)
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            router.push("/");
            window.location.reload();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Logout failed. Please try again.");
          }
        }
      });
    } catch (error) {
      toast.error("Failed to sign out. Please try again.");
    }
  };

  const isActive = (path) => pathname === path;

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "All Appointments", path: "/appointments", icon: Calendar },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    // 🎯 ফিক্সড: প্রফেশনাল গ্লসি ফ্রস্টেড গ্লাস এফেক্ট ব্যাকগ্রাউন্ড যুক্ত করা হলো
    <nav className="bg-white/40 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-50 shadow-sm w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* ================= LEFT: BRAND LOGO ================= */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2.5 font-black text-xl tracking-tight group">
              <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl group-hover:bg-emerald-800 group-hover:text-white transition-all duration-300">
                <Stethoscope className="h-5 w-5 stroke-[2.5]" />
              </div>
              <span className="bg-gradient-to-r from-emerald-900 to-emerald-950 bg-clip-text text-transparent group-hover:from-emerald-800 group-hover:to-emerald-900 transition-colors">
                MedReserve
              </span>
            </Link>
          </div>

          {/* ================= MIDDLE: CORE LINKS (DESKTOP UX) ================= */}
          <div className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 text-xs sm:text-sm font-extrabold rounded-xl transition-all duration-300 ${
                    active
                      ? "bg-emerald-50 text-emerald-900 shadow-sm border border-emerald-100/50"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`h-4 w-4 transition-transform ${active ? "text-emerald-800 scale-110" : "text-slate-400"}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* ================= RIGHT: AUTH STATES (PREMIUM DESIGNER LOOK) ================= */}
          <div className="hidden md:flex items-center space-x-4">
            {isPending ? (
              <div className="h-9 w-24 bg-slate-100 animate-pulse rounded-xl" />
            ) : session ? (
              <div className="flex items-center space-x-3.5">
                {/* User Profile Capsule */}
                <div className="flex items-center space-x-2.5 bg-slate-50 border border-slate-200/80 pl-2 pr-4 py-1.5 rounded-full shadow-inner hover:bg-slate-100/50 transition-colors max-w-[200px]">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="h-6 w-6 rounded-full object-cover ring-2 ring-white"
                    />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 ring-2 ring-white">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <span className="text-xs sm:text-sm font-black text-slate-700 truncate">
                    {session.user.name}
                  </span>
                </div>
                
                {/* Premium Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 px-3.5 py-2 border border-slate-200 text-xs font-black rounded-xl text-slate-600 bg-white hover:bg-rose-50 hover:text-rose-700 hover:border-rose-100 active:scale-95 transition-all shadow-sm"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-xs sm:text-sm font-black text-slate-500 hover:text-emerald-800 px-4 py-2 rounded-xl hover:bg-slate-50 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center px-4 py-2.5 border border-transparent text-xs font-black rounded-xl text-white bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 hover:to-emerald-950 transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-emerald-800 hover:bg-emerald-50 p-2 rounded-xl focus:outline-none transition-all"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE DRAWER NAVIGATION ================= */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 pt-2 pb-5 space-y-1.5 shadow-xl animate-[fadeIn_0.2s_ease-out]">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-extrabold transition-all ${
                  active
                    ? "bg-emerald-50 text-emerald-900 border border-emerald-100/50"
                    : "text-slate-600 hover:bg-slate-50 hover:text-emerald-900"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-emerald-800" : "text-slate-400"}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
          
          <div className="pt-4 border-t border-slate-100 mt-4">
            {isPending ? (
              <div className="h-10 bg-slate-100 animate-pulse rounded-xl w-full" />
            ) : session ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 px-4 py-1">
                  {session.user.image ? (
                    <img src={session.user.image} alt="" className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-100" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                  <span className="text-sm font-black text-slate-800">{session.user.name}</span>
                </div>
                <button
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-slate-200 text-sm font-black rounded-xl text-slate-600 bg-white hover:bg-rose-50 hover:text-rose-700 hover:border-rose-100 active:scale-95 transition-all shadow-sm"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout From Account</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 px-1">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center px-4 py-2.5 border border-slate-300 text-sm font-black rounded-xl text-slate-700 bg-white hover:bg-slate-50 active:scale-95 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-center px-4 py-2.5 border border-transparent text-sm font-black rounded-xl text-white bg-emerald-800 hover:bg-emerald-900 active:scale-95 transition-all shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}