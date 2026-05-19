"use client";

import { useState } from "react";
import { Calendar, Clock, User, Phone, Edit2, Trash2, X, Check } from "lucide-react";
import { toast } from "react-hot-toast";

export default function MyBookingsPage() {
  // Dummy bookings state management framework
  const [bookings, setBookings] = useState([
    {
      id: "b-1",
      doctorName: "Dr. Evelyn Vance",
      specialty: "Cardiologist",
      patientName: "Md. Saidul Islam",
      patientPhone: "+8801712345678",
      appointmentDate: "2026-05-25",
      timeSlot: "05:00 PM - 05:30 PM",
    },
    {
      id: "b-2",
      doctorName: "Dr. Maria Noor",
      specialty: "Dermatologist",
      patientName: "Md. Saidul Islam",
      patientPhone: "+8801712345678",
      appointmentDate: "2026-05-28",
      timeSlot: "04:00 PM - 04:30 PM",
    }
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // Delete Action Handler Function
  const handleDelete = (id, doctorName) => {
    if (confirm(`Are you sure you want to completely cancel appointment with ${doctorName}?`)) {
      setBookings(bookings.filter((b) => b.id !== id));
      toast.success("Appointment log deleted successfully.");
    }
  };

  // Open update popup modal setup
  const handleOpenUpdateModal = (booking) => {
    setEditingData({ ...booking });
    setIsEditModalOpen(true);
  };

  // Update Submit handler function
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    setBookings(bookings.map((b) => (b.id === editingData.id ? editingData : b)));
    setIsEditModalOpen(false);
    toast.success("Appointment schedule updated dynamically!");
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Active Appointments</h1>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Real-time scheduling panel</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-400 font-bold">
          No appointments found in your portal.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bookings.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-800/20 transition-all">
              <div className="space-y-3">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="font-bold text-slate-900 text-lg leading-tight">{item.doctorName}</h3>
                  <p className="text-xs font-bold text-emerald-800 mt-0.5">{item.specialty}</p>
                </div>
                <div className="space-y-1.5 text-xs text-slate-500 font-semibold">
                  <p className="flex items-center space-x-2"><User className="h-3.5 w-3.5 text-slate-400" /> <span>Patient: <strong className="text-slate-800">{item.patientName}</strong></span></p>
                  <p className="flex items-center space-x-2"><Phone className="h-3.5 w-3.5 text-slate-400" /> <span>Contact: {item.patientPhone}</span></p>
                  <p className="flex items-center space-x-2"><Calendar className="h-3.5 w-3.5 text-emerald-800" /> <span>Date: <span className="text-slate-800">{item.appointmentDate}</span></span></p>
                  <p className="flex items-center space-x-2"><Clock className="h-3.5 w-3.5 text-emerald-800" /> <span>Slot: <span className="text-slate-800">{item.timeSlot}</span></span></p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-50">
                <button onClick={() => handleOpenUpdateModal(item)} className="inline-flex items-center justify-center space-x-1.5 py-2 px-3 border border-slate-200 hover:border-emerald-800 text-xs font-bold text-slate-700 rounded-xl transition-all">
                  <Edit2 className="h-3.5 w-3.5 text-slate-400" /> <span>Update</span>
                </button>
                <button onClick={() => handleDelete(item.id, item.doctorName)} className="inline-flex items-center justify-center space-x-1.5 py-2 px-3 bg-rose-50 text-xs font-bold text-rose-700 rounded-xl hover:bg-rose-100 transition-all">
                  <Trash2 className="h-3.5 w-3.5" /> <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dynamic Pop-up Modal Code Architecture */}
      {isEditModalOpen && editingData && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900">Modify Appointment Information</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-1 text-slate-400 hover:bg-slate-200 rounded-lg"><X className="h-4 w-4" /></button>
            </div>
            <form onSubmit={handleUpdateSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Patient Name</label>
                <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold" value={editingData.patientName} onChange={(e) => setEditingData({ ...editingData, patientName: e.target.value })} />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Phone Number</label>
                <input type="tel" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold" value={editingData.patientPhone} onChange={(e) => setEditingData({ ...editingData, patientPhone: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Date</label>
                  <input type="date" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold" value={editingData.appointmentDate} onChange={(e) => setEditingData({ ...editingData, appointmentDate: e.target.value })} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Time Slot</label>
                  <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold cursor-pointer" value={editingData.timeSlot} onChange={(e) => setEditingData({ ...editingData, timeSlot: e.target.value })} >
                    <option value="05:00 PM - 05:30 PM">05:00 PM - 05:30 PM</option>
                    <option value="05:30 PM - 06:00 PM">05:30 PM - 06:00 PM</option>
                    <option value="06:30 PM - 07:00 PM">06:30 PM - 07:00 PM</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full flex items-center justify-center space-x-1.5 py-3 bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md hover:bg-emerald-900 mt-2">
                <Check className="h-4 w-4" /> <span>Save & Re-schedule</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}