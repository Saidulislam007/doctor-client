"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { Stethoscope, User, Mail, Link2, Lock, UserPlus, Loader2, AlertCircle } from "lucide-react";

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

  // পাসওয়ার্ড ভ্যালিডেশন রুলস চেকার
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
    return ""; // কোনো এরর না থাকলে খালি স্ট্রিং রিটার্ন করবে
  };

  // পাসওয়ার্ড ইনপুটের রিয়েল-টাইম চেঞ্জ হ্যান্ডেলার
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    
    // টাইপ করার সাথে সাথে ইন-ফর্ম ভ্যালিডেশন এরর আপডেট হবে
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

    // ফাইনাল পাসওয়ার্ড ভ্যালিডেশন চেক (সাবমিট প্রিভেন্ট করার জন্য)
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
        image: formData.image || undefined, // Photo URL (ঐচ্ছিক)
      }, {
        onSuccess: () => {
          toast.success("Registration successful! Please login.");
          // সফল হলে সরাসরি Login পেজে রিডাইরেক্ট করবে
          router.push("/login"); 
        },
        onError: (ctx) => {
          // ফেইল হলে টোস্ট নোটিফিকেশনে এরর মেসেজ দেখাবে
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
        callbackUrl: "/dashboard", // সোশ্যাল সাইনআপ ডিরেক্ট সেশন তৈরি করে তাই এটি ড্যাশবোর্ডে যাবে
      }, {
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
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Container with Custom Tailwind Slide-up Animation */}
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl transition-all duration-500 hover:shadow-2xl animate-[slideUp_0.4s_ease-out]">
        
        {/* Title & Header */}
        <div className="text-center">
          <div className="inline-flex p-3 bg-indigo-50 rounded-xl text-indigo-600 mb-3 animate-[bounce_2s_infinite]">
            <Stethoscope className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Register
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Create your account to start booking appointments
          </p>
        </div>

        {/* Social Signup Button (Single Method: Google) */}
        <div>
          <button
            type="button"
            disabled={socialLoading || loading}
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-300 rounded-xl bg-white hover:bg-slate-50 active:scale-[0.99] font-medium text-slate-700 text-sm transition-all duration-200 shadow-sm disabled:opacity-60"
          >
            {socialLoading ? (
              <Loader2 className="animate-spin h-5 w-5 text-slate-500" />
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.43 1.49 15.62 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.854 11.57-11.77 0-.795-.085-1.4-.195-1.945H12.24z"/>
                </svg>
                <span>Sign up with Google</span>
              </>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="absolute bg-white px-3 text-xs uppercase text-slate-400 font-medium tracking-wider">
            or use credentials
          </span>
        </div>

        {/* Main Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-3.5">
            
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl bg-slate-50 placeholder-slate-400 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent focus:bg-white transition-all duration-200"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

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

            {/* Photo URL Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Photo URL <span className="text-xs text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Link2 className="h-5 w-5" />
                </div>
                <input
                  type="url"
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl bg-slate-50 placeholder-slate-400 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent focus:bg-white transition-all duration-200"
                  placeholder="https://example.com/photo.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl bg-slate-50 placeholder-slate-400 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${
                    passwordError 
                      ? "border-red-400 focus:ring-red-500 focus:border-transparent" 
                      : "border-slate-300 focus:ring-indigo-600 focus:border-transparent"
                  }`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handlePasswordChange}
                />
              </div>
              
              {/* If invalid: Show error inside form */}
              {passwordError && (
                <div className="mt-1.5 flex items-start gap-1.5 text-xs text-red-600 animate-[fadeIn_0.2s_ease-out]">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{passwordError}</span>
                </div>
              )}
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading || socialLoading}
            className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none transition-all duration-200 shadow-md shadow-indigo-100 mt-2"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5 text-white" />
            ) : (
              <>
                Register Account
                <UserPlus className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Link: “Already have an account? Login” */}
        <p className="text-center text-sm text-slate-600 pt-1">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 underline underline-offset-4 transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}