"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { Stethoscope, User, Mail, Link2, Lock, AlertCircle, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "", // Photo URL
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");

  // পাসওয়ার্ড ভ্যালিডেশন রুলস চেকার
  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    return "";
  };

  // পাসওয়ার্ড ইনপুটের রিয়াল-টাইম চেঞ্জ হ্যান্ডেলার
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    
    if (newPassword) {
      setPasswordError(validatePassword(newPassword));
    } else {
      setPasswordError("");
    }
  };

  // ফর্ম সাবমিশন হ্যান্ডেলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("Please fill in all required fields");
    }

    const error = validatePassword(formData.password);
    if (error) {
      setPasswordError(error);
      return toast.error("Please fix the password errors before registering.");
    }

    setLoading(true);
    
    try {
      await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.image || undefined,
      }, {
        onSuccess: () => {
          toast.success("Registration successful! Please login.");
          
          // ১. ইউজারকে সাকসেসফুলি লগইন পেজে রিডাইরেক্ট করা হলো
          router.push("/login"); 
          
          // ২. নেভিগেশন বার এবং রুট স্টেটের ক্যাশ রিসেট করার জন্য রিফ্রেশ ট্রিকার
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Registration failed. Try a different email.");
          setLoading(false);
        }
      });
    } catch (err) {
      toast.error("An unexpected error occurred.");
      setLoading(false);
    }
  };

  // Google সোশ্যাল সাইনআপ মেথড
  const handleGoogleSignup = async () => {
    setSocialLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        // গুগল দিয়ে সাইন-আপ করার পর ইউজারকে সরাসরি হোম পেজে (/) বা ড্যাশবোর্ডে পাঠাতে পারেন
        callbackUrl: "/",
      }, {
        onSuccess: () => {
          toast.success("Google registration successful!");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Google signup failed.");
          setSocialLoading(false);
        }
      });
    } catch (err) {
      toast.error("Social signup initialization failed.");
      setSocialLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50">
      {/* Split Screen Container */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl animate-[fadeIn_0.4s_ease-out]">
        
        {/* Left Side: Fixed Content Medical Banner */}
        <div className="relative md:col-span-5 bg-emerald-950 min-h-[350px] md:min-h-[650px] flex flex-col justify-between p-8 text-white overflow-hidden group">
          <div 
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50 scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop')" 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-emerald-900/40" />

          {/* Logo & Platform Name */}
          <div className="relative z-10 flex items-center space-x-2">
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl">
              <Stethoscope className="h-6 w-6 text-emerald-400 stroke-[2.5]" />
            </div>
            <span className="font-bold text-xl tracking-tight">MedReserve</span>
          </div>

          {/* Quote Area */}
          <div className="relative z-10 space-y-4 mt-auto">
            <h3 className="text-xl md:text-2xl font-semibold leading-relaxed tracking-tight">
              “Seamless scheduling bridges the gap between critical symptoms and expert medical consultation.”
            </h3>
            <div>
              <p className="font-medium text-emerald-300 text-sm">Dr. Evelyn Vance</p>
              <p className="text-xs text-emerald-200/70">Lead Consultant & Medical Informatics Officer</p>
            </div>
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="md:col-span-7 flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16 bg-white">
          <div className="max-w-md w-full mx-auto space-y-6">
            
            {/* Header Content */}
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Welcome back to MedReserve
              </h2>
              <p className="text-sm text-slate-500 max-w-sm">
                Create your care account today and unlock instantaneous doctor bookings worldwide.
              </p>
            </div>

            {/* Social Oauth Container */}
            <div>
              <button
                type="button"
                disabled={socialLoading || loading}
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100/80 active:scale-[0.99] font-semibold text-slate-800 text-xs transition-all duration-200 disabled:opacity-60"
              >
                {socialLoading ? (
                  <Loader2 className="animate-spin h-4 w-4 text-slate-500" />
                ) : (
                  <>
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.43 1.49 15.62 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.854 11.57-11.77 0-.795-.085-1.4-.195-1.945H12.24z"/>
                    </svg>
                    <span>Sign up with Google</span>
                  </>
                )}
              </button>
            </div>

            {/* Custom Separator */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-100 w-full" />
              <span className="absolute bg-white px-4 text-[10px] uppercase text-slate-400 font-bold tracking-widest">
                OR REGISTER WITH EMAIL
              </span>
            </div>

            {/* Credentials Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-3.5">
                
                {/* Floating style Name input */}
                <div className="relative border border-slate-300 focus-within:border-emerald-800 rounded-xl px-3 py-1.5 transition-colors group">
                  <label className="block text-[11px] font-medium text-slate-500 group-focus-within:text-emerald-800 uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <User className="h-4 w-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      required
                      className="w-full bg-transparent p-0 border-0 text-slate-900 text-sm focus:ring-0 focus:outline-none placeholder-slate-400"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                {/* Floating style Email input */}
                <div className="relative border border-slate-300 focus-within:border-emerald-800 rounded-xl px-3 py-1.5 transition-colors group">
                  <label className="block text-[11px] font-medium text-slate-500 group-focus-within:text-emerald-800 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                    <input
                      type="emerald"
                      required
                      className="w-full bg-transparent p-0 border-0 text-slate-900 text-sm focus:ring-0 focus:outline-none placeholder-slate-400"
                      placeholder="alex.jordan@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Floating style Photo URL input */}
                <div className="relative border border-slate-300 focus-within:border-emerald-800 rounded-xl px-3 py-1.5 transition-colors group">
                  <label className="block text-[11px] font-medium text-slate-500 group-focus-within:text-emerald-800 uppercase tracking-wider">
                    Photo URL <span className="text-[10px] text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <Link2 className="h-4 w-4 text-slate-400 shrink-0" />
                    <input
                      type="url"
                      className="w-full bg-transparent p-0 border-0 text-slate-900 text-sm focus:ring-0 focus:outline-none placeholder-slate-400"
                      placeholder="https://example.com/photo.jpg"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>
                </div>

                {/* Floating style Password input with in-form validation error */}
                <div className={`relative border rounded-xl px-3 py-1.5 transition-colors group ${
                  passwordError ? "border-red-400 focus-within:border-red-500" : "border-slate-300 focus-within:border-emerald-800"
                }`}>
                  <label className={`block text-[11px] font-medium uppercase tracking-wider ${
                    passwordError ? "text-red-500" : "text-slate-500 group-focus-within:text-emerald-800"
                  }`}>
                    Password
                  </label>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <Lock className="h-4 w-4 text-slate-400 shrink-0" />
                    <input
                      type="password"
                      required
                      className="w-full bg-transparent p-0 border-0 text-slate-900 text-sm focus:ring-0 focus:outline-none placeholder-slate-400 tracking-wide"
                      placeholder="••••••••••••"
                      value={formData.password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>

                {/* Real-time Validation Error Node */}
                {passwordError && (
                  <div className="mt-1 flex items-start gap-1.5 text-xs text-red-600 animate-[fadeIn_0.2s_ease-out] px-1">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span className="font-medium">{passwordError}</span>
                  </div>
                )}

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || socialLoading}
                className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none transition-all duration-200 shadow-md shadow-emerald-100 mt-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                ) : (
                  "Sign up"
                )}
              </button>
            </form>

            {/* Redirect Footer Link */}
            <p className="text-center text-xs text-slate-500 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-emerald-800 hover:text-emerald-700 transition-colors">
                Login
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}