"use client";

import { useState } from "react";
import { Plus, Minus, MessageSquare } from "lucide-react";

export default function FaqSection() {
  // কোন একর্ডিয়নটি ওপেন থাকবে তার স্টেট (ডিফল্টভাবে প্রথমটি ওপেন থাকবে, অর্থাৎ index 0)
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      question: "How do I book an immediate clinical appointment?",
      answer: "Our automated system allows real-time calendar access. Simply click 'Find Specialists' on the hero banner, select your desired clinical branch, and secure your automated appointment slot instantly."
    },
    {
      question: "Are your registered doctors board-certified?",
      answer: "Yes, every practitioner on MedReserve undergoes rigorous credential verification. All specialists are verified board-certified professionals complying directly with national health standards."
    },
    {
      question: "Which medical department is best for primary wellness?",
      answer: "For generalized checkups, we highly recommend our Primary Care or Internal Medicine consultants. They provide a comprehensive baseline assessment before mapping specialist paths if needed."
    },
    {
      question: "Is there any extra fee for online diagnostic consults?",
      answer: "Absolutely not. MedReserve offers transparent transactional structures. Your appointment booking incorporates full initial consultation protocols without any synthetic or hidden add-on costs."
    },
    {
      question: "What is the expected support window for urgent inquiries?",
      answer: "While critical conditions should utilize our 911/988 hotlines, our standard technical support desk and Direct Mail queue operate with an average feedback cycle under 15 minutes."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block matching target mockup typography */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-emerald-950 tracking-tight">
            Frequently Ask any Questions
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Rejuvenate with soothing therapies crafted to bring harmony, peace, and natural balance directly into your clinical onboarding experience.
          </p>
        </div>

        {/* Main Composition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: "Do you have more questions?" Dynamic Callout Box */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] rounded-3xl p-8 text-center text-white space-y-6 shadow-xl relative overflow-hidden group">
            {/* Ambient Background Blur Circle */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
            
            {/* Centered Message Icon Frame */}
            <div className="mx-auto h-16 w-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-inner">
              <MessageSquare className="h-8 w-8 text-emerald-300" />
            </div>

            {/* Typography Strings */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight">Do you have more questions?</h3>
              <p className="text-emerald-100/70 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                Have more questions? We're here to help with answers, guidance, and tips for your customized skincare and clinical needs.
              </p>
            </div>

            {/* Direct Mail Trigger Action Button */}
            <div className="pt-2">
              <a
                href="mailto:support@medreserve.com"
                className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 active:scale-[0.98] text-sm transition-all shadow-md"
              >
                Direct Mail
              </a>
            </div>
          </div>

          {/* RIGHT PANEL: Pure Responsive Accordion Matrix */}
          <div className="lg:col-span-8 space-y-3.5">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                    isOpen 
                      ? "bg-[#f4f7f1] border-emerald-200/60 shadow-sm" 
                      : "bg-[#f4f7f1]/50 border-slate-100 hover:bg-[#f4f7f1]"
                  }`}
                >
                  {/* Accordion Action Header Row */}
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200 focus:outline-none"
                  >
                    <span className="font-bold text-slate-800 text-base pr-4">
                      {item.question}
                    </span>
                    <span className="p-1.5 bg-white/80 rounded-xl border border-slate-200/40 text-slate-700 shadow-sm shrink-0">
                      {isOpen ? (
                        <Minus className="h-4 w-4 text-emerald-700 stroke-[2.5]" />
                      ) : (
                        <Plus className="h-4 w-4 text-slate-500 stroke-[2.5]" />
                      )}
                    </span>
                  </button>

                  {/* Smooth Sliding Height Content Node */}
                  <div
                    className={`transition-all duration-300 ease-in-out px-5 overflow-hidden ${
                      isOpen ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-200/40 pt-3">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}