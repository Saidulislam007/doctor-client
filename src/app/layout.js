import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navber";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MedReserve | Premier Doctor Appointment Booking",
  description: "Book appointments with top-rated certified medical specialists seamlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen text-slate-800`}>
        {/* React Hot Toast Global Configuration */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#334155",
              color: "#fff",
              borderRadius: "0.5rem",
            },
            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "#FFF",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#FFF",
              },
            },
          }}
        />
        
        <Navbar/>
        <main className="flex-grow max-w-9xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}