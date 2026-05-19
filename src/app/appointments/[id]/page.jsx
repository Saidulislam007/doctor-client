"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Star, ArrowLeft, Calendar, Award, MapPin, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

// ১. এটিই আপনার মেইন ডিফল্ট এক্সপোর্ট রিঅ্যাক্ট কম্পোনেন্ট
export default function DoctorDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const doctorId = params.id; // ডাইনামিক আইডি ইউআরএল থেকে রিড করা হচ্ছে

    // ১০ জন ডাক্তারের সম্পূর্ণ ডেটাবেজ অ্যারে
    const doctorsDatabase = [
        {
            id: "doc-1",
            name: "Dr. Evelyn Vance",
            specialty: "Cardiologist",
            rating: 4.9,
            reviews: 142,
            experience: "12 years",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop",
            location: "Dhaka Medical College & Hospital",
            available: "Today (05:00 PM - 08:00 PM)",
            bio: "Dr. Evelyn Vance is a world-class cardiologist specializing in interventional cardiology and cardiovascular health treatments with over a decade of clinical excellence.",
            degrees: ["MBBS (Dhaka)", "FCPS (Cardiology)", "MD (USA)"],
        },
        {
            id: "doc-2",
            name: "Dr. Robert Chen",
            specialty: "Neurologist",
            rating: 4.7,
            reviews: 98,
            experience: "10 years",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop",
            location: "Apollo Hospitals, Dhaka",
            available: "Tomorrow (06:00 PM - 09:00 PM)",
            bio: "Dr. Robert Chen is a senior nerve and brain specialist expert in treating complex neurodegenerative disorders, chronic migraines, and spine health issues.",
            degrees: ["MBBS", "MD (Neurology)", "FRCP (Edinburgh)"],
        },
        {
            id: "doc-3",
            name: "Dr. Maria Noor",
            specialty: "Dermatologist",
            rating: 5.0,
            reviews: 210,
            experience: "8 years",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
            location: "Square Hospital, Panthapath",
            available: "Today (04:00 PM - 07:00 PM)",
            bio: "Dr. Maria Noor is an elite specialist in clinical dermatology, laser procedures, and advanced skin-aging therapeutic care protocols.",
            degrees: ["MBBS", "DDV (Austria)", "FCPS (Dermatology)"],
        },
        {
            id: "doc-4",
            name: "Dr. Aris Thorne",
            specialty: "Pediatrician",
            rating: 4.6,
            reviews: 84,
            experience: "15 years",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop",
            location: "United Hospital, Gulshan",
            available: "Mon, May 25 (10:00 AM - 01:00 PM)",
            bio: "Dr. Aris Thorne offers empathetic neonatology and child healthcare consulting, backed by 15+ years of institutional medicine leadership.",
            degrees: ["MBBS", "DCH", "MD (Pediatrics)"],
        },
        {
            id: "doc-5",
            name: "Dr. Sarah Jenkins",
            specialty: "Gynecologist",
            rating: 4.8,
            reviews: 165,
            experience: "11 years",
            image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=600&auto=format&fit=crop",
            location: "Labaid Specialized Hospital",
            available: "Today (03:00 PM - 06:00 PM)",
            bio: "Dr. Sarah Jenkins specializes in high-risk pregnancy management, maternal-fetal wellness, and laparoscopic gynecological surgeries.",
            degrees: ["MBBS", "MS (Gynae)", "FICOG"],
        },
        {
            id: "doc-6",
            name: "Dr. James Wilson",
            specialty: "Orthopedic Surgeon",
            rating: 4.5,
            reviews: 73,
            experience: "14 years",
            image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop",
            location: "Popular Consultation Center",
            available: "Wed, May 27 (05:30 PM - 08:30 PM)",
            bio: "Dr. James Wilson is widely recognized for revolutionary joint replacement techniques, bone fracture trauma reconstructions, and sports medicine injury recovery.",
            degrees: ["MBBS", "MS (Orthopedics)", "MCh (UK)"],
        },
        {
            id: "doc-7",
            name: "Dr. Aliyah Rahman",
            specialty: "Psychiatrist",
            rating: 4.9,
            reviews: 112,
            experience: "9 years",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=60&w=600&auto=format&fit=crop",
            location: "National Institute of Mental Health",
            available: "Tomorrow (04:00 PM - 07:00 PM)",
            bio: "Dr. Aliyah Rahman provides compassionate care in behavioral psychology, clinical anxiety therapy, depression management, and stress counseling.",
            degrees: ["MBBS", "MD (Psychiatry)", "MCPS"],
        },
        {
            id: "doc-8",
            name: "Dr. David Kim",
            specialty: "Ophthalmologist",
            rating: 4.4,
            reviews: 55,
            experience: "7 years",
            image: "https://images.unsplash.com/photo-1637059824899-a441006a6875?q=80&w=600&auto=format&fit=crop",
            location: "Bangladesh Eye Hospital",
            available: "Today (06:00 PM - 08:30 PM)",
            bio: "Dr. David Kim is an expert eye surgeon specialising in advanced phacoemulsification cataract surgeries, lasik vision corrections, and glaucoma controls.",
            degrees: ["MBBS", "DO", "FCPS (Ophthalmology)"],
        },
        {
            id: "doc-9",
            name: "Dr. Johan Marley",
            specialty: "General Physician",
            rating: 4.7,
            reviews: 130,
            experience: "10 years",
            image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=600&auto=format&fit=crop",
            location: "Ibn Sina Medical College",
            available: "Thu, May 21 (02:00 PM - 05:00 PM)",
            bio: "Dr. Johan Marley provides comprehensive preventive health screenings, chronic illness treatment blueprints, and primary family healthcare consultation.",
            degrees: ["MBBS", "BCS (Health)", "FCPS (Medicine)"],
        },
        {
            id: "doc-10",
            name: "Dr. Lisa Kudrow",
            specialty: "Endocrinologist",
            rating: 4.3,
            reviews: 42,
            experience: "6 years",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
            location: "BIRDEM General Hospital",
            available: "Fri, May 22 (04:00 PM - 07:00 PM)",
            bio: "Dr. Lisa Kudrow offers modern clinic-driven research treatments for hormonal imbalances, diabetic care optimization, and metabolic thyroid disorders.",
            degrees: ["MBBS", "DEM (Hormones)", "MD"],
        },
    ];

    // আইডির সাথে ডেটাবেজ থেকে ডাটা মেলানো হচ্ছে
    const doctor = doctorsDatabase.find((doc) => doc.id === doctorId);

    // ডিফেন্সিভ কন্ডিশন: যদি আইডি ভুল হয়
    if (!doctor) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
                <h2 className="text-2xl font-bold text-slate-800">Doctor Profile Not Found!</h2>
                <Link href="/appointments" className="mt-4 flex items-center space-x-2 text-emerald-800 font-bold hover:underline">
                    <ArrowLeft className="h-4 w-4" /> <span>Back to Doctors List</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/60 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                {/* Return Button */}
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center space-x-2 text-sm font-bold text-slate-500 hover:text-emerald-800 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm transition-all mb-8 active:scale-95"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Return to Listing</span>
                </button>

                {/* Profile Card Canvas */}
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row">
                    <div className="md:w-2/5 h-80 md:h-auto relative bg-slate-100 shrink-0">
                        <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top" />
                        <div className="absolute top-4 left-4 bg-emerald-800 text-white text-[10px] font-black px-2.5 py-1 rounded-md tracking-wider shadow-md">
                            VERIFIED PRACTITIONER
                        </div>
                    </div>

                    <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-6">
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                                    {doctor.specialty}
                                </span>
                                <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-lg">
                                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                    <span className="text-sm font-black text-slate-800">{doctor.rating.toFixed(1)}</span>
                                    <span className="text-xs text-slate-400 font-bold">({doctor.reviews} Reviews)</span>
                                </div>
                            </div>

                            <div>
                                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                    {doctor.name}
                                </h1>
                                <p className="text-xs font-bold text-slate-400 mt-1 flex items-center space-x-1">
                                    <Award className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                                    <span>{doctor.degrees.join(" • ")}</span>
                                </p>
                            </div>

                            <div className="pt-2">
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                    {doctor.bio}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <div className="flex items-start space-x-2 text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Chamber Clinic</p>
                                        <p className="text-slate-800 mt-0.5 leading-snug">{doctor.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2 text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <Calendar className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Next Availability</p>
                                        <p className="text-slate-800 mt-0.5 leading-snug">{doctor.available}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-center sm:text-left">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Consultation Fee</p>
                                <p className="text-xl font-black text-slate-900">৳১,০০০ <span className="text-xs font-medium text-slate-400">(Vat Incl.)</span></p>
                            </div>
                            <Link
                                href={`/appointments/${doctor.id}/book`}
                                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
                            >
                                <CheckCircle2 className="h-4 w-4" />
                                <span>Book Appointment Now</span>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}