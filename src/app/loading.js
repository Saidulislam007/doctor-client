// app/loading.js
import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50/50">
      <div className="relative flex items-center justify-center">
        
        <div className="absolute h-16 w-16 bg-emerald-500/10 rounded-full blur-md animate-pulse" />
        <Loader2 className="h-10 w-10 text-emerald-800 animate-spin relative z-10" />
      </div>
      <p className="text-xs text-slate-400 font-black tracking-widest uppercase mt-4 animate-pulse">
        Synchronizing MedReserve Engine...
      </p>
    </div>
  );
}