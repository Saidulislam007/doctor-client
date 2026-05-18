"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { Stethoscope, Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 lg:p-8 ">
      {/* Split Screen Container (Image Left, Form Right) */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl animate-[fadeIn_0.4s_ease-out]">
        
        {/* Left Side: Premium Medical Banner with Animated Pulse Overlay */}
        <div className="relative md:col-span-5 bg-indigo-950 min-h-[350px] md:min-h-[600px] flex flex-col justify-between p-8 text-white overflow-hidden group">
          {/* Background Image Layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50 scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop')" 
            }}
          />
          {/* Subtle Dynamic Animated Medical Network Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/40 to-indigo-900/40 animate-[pulse_6s_infinite_alternate]" />

          {/* Logo & Platform Name */}
          <div className="relative z-10 flex items-center space-x-2">
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl">
              <Stethoscope className="h-6 w-6 text-indigo-400 stroke-[2.5]" />
            </div>
            <span className="font-bold text-xl tracking-tight">MedReserve</span>
          </div>

          {/* Medical Testimonial / Quote Area */}
          <div className="relative z-10 space-y-4 mt-auto">
            <h3 className="text-xl md:text-2xl font-semibold leading-relaxed tracking-tight">
              “Empowering healthcare providers with the digital infrastructure to prioritize patient recovery.”
            </h3>
            <div>
              <p className="font-medium text-indigo-300 text-sm">Dr. Aris Thorne</p>
              <p className="text-xs text-indigo-200/70">Chief Medical Director & Technical Consultant</p>
            </div>
          </div>
        </div>

        {/* Right Side: Identity Core Login Form */}
        <div className="md:col-span-7 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-white">
          <div className="max-w-md w-full mx-auto space-y-7">
            
            {/* Header Content */}
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Welcome back to MedReserve
              </h2>
              <p className="text-sm text-slate-500 max-w-sm">
                Access your premium clinical dashboard effortlessly with our certified gateway.
              </p>
            </div>

            {/* Core Form Component */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-4">
                
                {/* Outlined Custom Floating Label Email Input */}
                <div className="relative border border-slate-300 focus-within:border-indigo-600 rounded-xl px-3 py-1.5 transition-colors group">
                  <label className="block text-[11px] font-medium text-slate-500 group-focus-within:text-indigo-600 uppercase tracking-wider">
                    Email
                  </label>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                    <input
                      type="email"
                      required
                      className="w-full bg-transparent p-0 border-0 text-slate-900 text-sm focus:ring-0 focus:outline-none placeholder-slate-400"
                      placeholder="alex.jordan@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Outlined Custom Floating Label Password Input */}
                <div className="relative border border-slate-300 focus-within:border-indigo-600 rounded-xl px-3 py-1.5 transition-colors group">
                  <label className="block text-[11px] font-medium text-slate-500 group-focus-within:text-indigo-600 uppercase tracking-wider">
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
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-start">
                <Link 
                  href="#" 
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Remember Sign In Toggle (Matches uploaded wireframe mockup) */}
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-xs font-medium text-slate-600">Remember sign in details</span>
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    rememberMe ? "bg-indigo-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      rememberMe ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={loading || socialLoading}
                className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none transition-all duration-200 shadow-md shadow-indigo-100"
              >
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                ) : (
                  "Log in"
                )}
              </button>
            </form>

            {/* Custom Aesthetic Separator Line */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-100 w-full" />
              <span className="absolute bg-white px-4 text-[10px] uppercase text-slate-400 font-bold tracking-widest">
                OR
              </span>
            </div>

            {/* Social Oauth Container (Google Only Method) */}
            <div>
              <button
                type="button"
                disabled={socialLoading || loading}
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100/80 active:scale-[0.99] font-semibold text-slate-800 text-xs transition-all duration-200 disabled:opacity-60"
              >
                {socialLoading ? (
                  <Loader2 className="animate-spin h-4 w-4 text-slate-500" />
                ) : (
                  <>
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.43 1.49 15.62 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.854 11.57-11.77 0-.795-.085-1.4-.195-1.945H12.24z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </div>

            {/* Sign Up Redirect Link */}
            <p className="text-center text-xs text-slate-500 font-medium">
              Don't have an account?{" "}
              <Link href="/register" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                Sign up
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}