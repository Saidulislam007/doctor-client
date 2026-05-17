"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { Stethoscope, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ১. ইমেইল ও পাসওয়ার্ড দিয়ে সাধারণ লগইন
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return toast.error("Please fill in all fields");
    }

    setLoading(true);
    try {
      await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackUrl: "/dashboard",
      }, {
        onSuccess: () => {
          toast.success("Welcome back! Login successful.");
          router.push("/dashboard");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Invalid credentials. Please try again.");
          setLoading(false);
        }
      });
    } catch (err) {
      toast.error("An unexpected error occurred.");
      setLoading(false);
    }
  };

  // ২. শুধুমাত্র একটি সোশ্যাল লগইন মেথড: Google Login
  const handleGoogleLogin = async () => {
    setSocialLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackUrl: "/dashboard",
      }, {
        onError: (ctx) => {
          toast.error(ctx.error.message || "Google authentication failed.");
          setSocialLoading(false);
        }
      });
    } catch (err) {
      toast.error("Social login initialization failed.");
      setSocialLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Container with Custom Tailwind Fade-in Animation */}
      <div className="max-w-md w-full space-y-7 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl transition-all duration-500 hover:shadow-2xl animate-[fadeIn_0.4s_ease-out]">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex p-3 bg-indigo-50 rounded-xl text-indigo-600 mb-3 animate-[bounce_2s_infinite]">
            <Stethoscope className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Login
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Access your secure patient portal and appointments
          </p>
        </div>

        {/* Social Login Button (Single Method: Google) */}
        <div className="mt-4">
          <button
            type="button"
            disabled={socialLoading || loading}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-300 rounded-xl bg-white hover:bg-slate-50 active:scale-[0.99] font-medium text-slate-700 text-sm transition-all duration-200 shadow-sm disabled:opacity-60"
          >
            {socialLoading ? (
              <Loader2 className="animate-spin h-5 w-5 text-slate-500" />
            ) : (
              <>
                {/* SVG Google Icon */}
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.43 1.49 15.62 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.854 11.57-11.77 0-.795-.085-1.4-.195-1.945H12.24z"/>
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>
        </div>

        {/* Divider line between Social & Credentials Form */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="absolute bg-white px-3 text-xs uppercase text-slate-400 font-medium tracking-wider">
            or use email
          </span>
        </div>

        {/* Credentials Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl bg-slate-50 placeholder-slate-400 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent focus:bg-white transition-all duration-200"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password Field with Forgot Password Option */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <Link href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl bg-slate-50 placeholder-slate-400 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent focus:bg-white transition-all duration-200"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading || socialLoading}
            className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none transition-all duration-200 shadow-md shadow-indigo-100"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5 text-white" />
            ) : (
              <>
                Login
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Link: Don’t have an account? Register */}
        <p className="text-center text-sm text-slate-600 pt-2">
          Don’t have an account?{" "}
          <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 underline underline-offset-4 transition-colors">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}