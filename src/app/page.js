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
import TopDoctorsSection from "@/components/home/TopDoctorsSection";

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
      

      <StatsSection></StatsSection>

    <AboutSection>  </AboutSection>
      {/* Features/Value Proposition Section */}
      <TopDoctorsSection></TopDoctorsSection>
      <ProfessionalsSection></ProfessionalsSection>
      <TestimonialSection></TestimonialSection>
      <BookingBanner></BookingBanner>
      <FaqSection></FaqSection>
    </div>
  );
}