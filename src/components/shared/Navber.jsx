"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { Stethoscope, User, LogOut, Menu, X, Calendar, LayoutDashboard, Home } from "lucide-react";

export default function Navbar() {
  
  const { data: sessionData, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // এপিআই এরর বা ইনিশিয়াল নাল কন্ডিশন হ্যান্ডেল করার জন্য সেফ সেশন অ্যাসাইনমেন্ট
  const session = sessionData?.user ? sessionData : null;

  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            router.push("/");
            router.refresh();
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
            <Link href="/" className="flex items-center space-x-2 text-indigo-600 font-bold text-xl tracking-tight">
              <Stethoscope className="h-7 w-7 stroke-[2.5] text-emerald-800" />
              <span className="text-emerald-800">MedReserve</span>
            </Link>
          </div>

          {/* Middle: Core Links (Desktop) */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`flex items-center space-x-1.5 px-1 py-2 text-sm font-medium border-b-2 transition-colors ${
                    isActive(link.path)
                      ? "border-emerald-800 text-emerald-800"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-emerald-800">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right: Profile / Auth States (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isPending ? (
              // এটি শুধুমাত্র বাটনের জায়গায় লোডিং এনিমেশন দেখাবে, পুরো নেববার হাইড করবে না
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
                  <span className="text-sm font-medium text-slate-700 truncate max-w-[120px]">
                    {session.user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="bg-emerald-800">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-800 hover:bg-emerald-700 transition-colors shadow-sm"
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
              className="text-slate-500 hover:text-slate-700 p-2 rounded-md focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6 text-emerald-800" /> : <Menu className="h-6 w-6 text-emerald-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-indigo-50 text-emerald-800"
                    : "text-emerald-800 hover:bg-emerald-600 hover:text-slate-900"
                }`}
              >
                <Icon className="h-5 w-5 text-emerald-800" />
                <span>{link.name}</span>
              </Link>
            );
          })}
          
          <div className="pt-4 border-t border-slate-100 mt-4">
            {isPending ? (
              <div className="h-10 bg-slate-100 animate-pulse rounded-md w-full" />
            ) : session ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 px-3">
                  {session.user.image ? (
                    <img src={session.user.image} alt="" className="h-8 w-8 rounded-full" />
                  ) : (
                    <User className="h-5 w-5 text-slate-500" />
                  )}
                  <span className="text-base font-medium text-slate-800">{session.user.name}</span>
                </div>
                <button
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 border border-slate-300 text-base font-medium rounded-md text-emerald-800 bg-white hover:bg-slate-50"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 px-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center px-4 py-2 border border-slate-300 text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-emerald-800 hover:bg-emerald-700"
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