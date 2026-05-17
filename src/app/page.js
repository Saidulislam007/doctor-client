import Link from "next/link";
import { Calendar, ShieldCheck, Clock, Users } from "lucide-react";

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
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-3xl text-white overflow-hidden shadow-xl">
        <div className="max-w-4xl mx-auto text-center px-6 py-16 sm:py-20 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Your Health, Our Priority. <br />
            <span className="text-indigo-200">Book Top Doctors Online.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-indigo-100 max-w-2xl mx-auto">
            Skip the waiting room. Connect with certified medical practitioners and specialists for personalized healthcare and seamless clinical appointments.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/appointments"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-medium rounded-xl text-indigo-700 bg-white hover:bg-indigo-50 transition-colors shadow-md"
            >
              <Calendar className="mr-2 h-5 w-5 text-indigo-600" />
              Find a Doctor & Book
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 border border-indigo-300 text-base font-medium rounded-xl text-white bg-indigo-600/30 hover:bg-indigo-600/50 transition-colors"
            >
              Create Patient Account
            </Link>
          </div>
        </div>
      </section>

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
    </div>
  );
}