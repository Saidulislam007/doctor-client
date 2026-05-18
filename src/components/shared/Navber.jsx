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

  // এপিআই এরর বা ইনিশিয়াল নাল কন্ডিশন হ্যান্ডেল করার জন্য সেফ সেশন অ্যাসাইনমেন্ট
  const session = sessionData?.user ? sessionData : null;

  // ফিক্সড লগআউট মেথড (Next.js ক্যাশ ফ্লাশ করার জন্য উইন্ডো রিলোড যুক্ত করা হয়েছে)
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            
            // ১. প্রথমে ইউজারকে হোম পেজে পুশ করা হচ্ছে
            router.push("/");
            
            // ২. Next.js ক্লায়েন্ট-সাইড সেশন ক্যাশ সম্পূর্ণ পরিষ্কার করতে হার্ড রিলোড দেওয়া হলো
            // এর ফলে নেভিগেশন বার তাৎক্ষণিকভাবে রিসেট হয়ে আবার Login/Register বাটন ফিরিয়ে আনবে
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
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Left: Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2 font-bold text-xl tracking-tight">
              <Stethoscope className="h-7 w-7 stroke-[2.5] text-emerald-800" />
              <span className="text-emerald-800">MedReserve</span>
            </Link>
          </div>

          {/* Middle: Core Links (Desktop) */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`flex items-center space-x-1.5 px-1 py-2 text-sm font-semibold border-b-2 transition-colors ${
                    active
                      ? "border-emerald-800 text-emerald-800"
                      : "border-transparent text-slate-500 hover:text-emerald-800 hover:border-emerald-700/40"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? "text-emerald-800" : "text-slate-400"}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right: Profile / Auth States (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isPending ? (
              <div className="h-9 w-24 bg-slate-100 animate-pulse rounded-md" />
            ) : session ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-slate-500" />
                  )}
                  <span className="text-sm font-semibold text-slate-700 truncate max-w-[120px]">
                    {session.user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 px-3.5 py-2 border border-slate-300 text-sm font-bold rounded-xl text-slate-700 bg-white hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
                >
                  <LogOut className="h-4 w-4 text-slate-500" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-sm font-bold text-slate-600 hover:text-emerald-800 px-3 py-2 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-xl text-white bg-emerald-800 hover:bg-emerald-900 transition-all shadow-md active:scale-95"
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
              className="text-emerald-800 hover:bg-slate-50 p-2 rounded-xl focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-inner animate-[fadeIn_0.2s_ease-out]">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-base font-bold transition-colors ${
                  active
                    ? "bg-emerald-50 text-emerald-900"
                    : "text-slate-600 hover:bg-emerald-50/50 hover:text-emerald-900"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "text-emerald-800" : "text-slate-400"}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
          
          <div className="pt-4 border-t border-slate-100 mt-4">
            {isPending ? (
              <div className="h-10 bg-slate-100 animate-pulse rounded-xl w-full" />
            ) : session ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 px-3 py-1">
                  {session.user.image ? (
                    <img src={session.user.image} alt="" className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <User className="h-5 w-5 text-slate-500" />
                  )}
                  <span className="text-base font-bold text-slate-800">{session.user.name}</span>
                </div>
                <button
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 border border-slate-300 text-base font-bold rounded-xl text-slate-700 bg-white hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
                >
                  <LogOut className="h-5 w-5 text-slate-400" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 px-1">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center px-4 py-2.5 border border-slate-300 text-base font-bold rounded-xl text-slate-700 bg-white hover:bg-slate-50 active:scale-95 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-center px-4 py-2.5 border border-transparent text-base font-bold rounded-xl text-white bg-emerald-800 hover:bg-emerald-900 active:scale-95 transition-all shadow-md"
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