import Link from "next/link";
import { Calendar, ShieldCheck, Clock, Users } from "lucide-react";
import HeroBanner from "@/components/home/HeroBanner";
import TickerNotice from "@/components/home/TickerNotice";
import AboutSection from "@/components/home/AboutSection";
import FaqSection from "@/components/home/FaqSection";
import BookingBanner from "@/components/home/BookingBanner";
import TestimonialSection from "@/components/home/TestimonialSection";
import ProfessionalsSection from "@/components/home/ProfessionalsSection";
import StatsSection from "@/components/home/StatsSection";

export default function Home() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Specialists",
      description: "Access a network of board-certified medical professionals and experienced doctors.",
    },
    {
      icon: Clock,
      title: "Real-time Scheduling",
      description: "View live availability and book your medical appointments instantly without waiting.",
    },
    {
      icon: Users,
      title: "Patient-Centric Care",
      description: "Your health is our priority. Get personalized consultations tailored to your needs.",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <HeroBanner></HeroBanner>
      <TickerNotice></TickerNotice>

      <StatsSection></StatsSection>

    <AboutSection>  </AboutSection>
      {/* Features/Value Proposition Section */}
      <section className="max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Why Choose MedReserve?</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            We provide a secure, efficient, and user-friendly platform designed to streamline your medical consultations.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center text-center space-y-4"
              >
                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>
      <ProfessionalsSection></ProfessionalsSection>
      <TestimonialSection></TestimonialSection>
      <BookingBanner></BookingBanner>
      <FaqSection></FaqSection>
    </div>
  );
}