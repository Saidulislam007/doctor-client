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

// 🎯 আপগ্রেডেড প্রো-লেভেল মেটাডাটা ফ্রেমওয়ার্ক (SEO, Keywords & Open Graph সিঙ্ক করা হয়েছে ভাই)
export const metadata = {
  title: {
    default: "MedReserve | Premier Doctor Appointment Booking",
    template: "%s | MedReserve" // এর ফলে সাব-পেজগুলোতে "All Appointments | MedReserve" এভাবে দেখাবে
  },
  description: "Book appointments with top-rated certified medical specialists seamlessly. Access a network of board-certified medical professionals instantly.",
  keywords: ["Medical Booking", "Doctors Appointment", "Verified Clinicians", "MedReserve", "Dhaka Doctors", "Healthcare Portal"],
  authors: [{ name: "Md. Saidul Islam" }],
  creator: "Md. Saidul Islam",
  
  // Open Graph (সোশ্যাল মিডিয়ায় লিংক শেয়ারিং প্রিভিউ কার্ডের জন্য)
  openGraph: {
    title: "MedReserve | Premier Doctor Appointment Booking",
    description: "Book appointments with top-rated certified medical specialists seamlessly.",
    url: "https://medreserve.com",
    siteName: "MedReserve",
    images: [
      {
        url: "https://medreserve.com/og-image.jpg", // আপনার প্রোজেক্টের মেইন কভার/ব্যানার ইমেজের ইউআরএল
        width: 1200,
        height: 630,
        alt: "MedReserve Premium Diagnostics & Booking Portal Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter Meta Tags
  twitter: {
    card: "summary_large_image",
    title: "MedReserve | Medical Booking Portal",
    description: "Book verified clinicians and track health logs securely.",
    images: ["https://medreserve.com/og-image.jpg"],
  },
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