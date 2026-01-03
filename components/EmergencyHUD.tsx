
import React, { useState } from 'react';
import { Medication, DoctorVisit, PatientInfo } from '../types';

interface EmergencyHUDProps {
  medications: Medication[];
  visits: DoctorVisit[];
  patientInfo: PatientInfo;
}

const EmergencyHUD: React.FC<EmergencyHUDProps> = ({ medications, visits, patientInfo }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'protocol' | 'pharma'>('info');

  const primaryContact = visits[0]?.physician || "Dr. Aris Vance";

  return (
    <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-20">
      {/* HEADER ALERTS */}
      <div className="bg-rose-600 p-8 rounded-[40px] text-white shadow-2xl shadow-rose-600/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-3xl animate-pulse">
              <i className="fas fa-triangle-exclamation"></i>
            </div>
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight">Crisis Protocol Active</h2>
              <p className="text-rose-100 text-xs font-black mono tracking-[0.3em] uppercase">Emergency Response HUD</p>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = "tel:911"}
            className="w-full md:w-auto px-8 py-4 bg-white text-rose-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-rose-50 transition-all shadow-xl active:scale-95"
          >
            Dispatch 911
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
      </div>

      {/* EMERGENCY NAVIGATION */}
      <div className="flex p-1.5 bg-white border border-slate-200 rounded-[28px] shadow-sm">
        {[
          { id: 'info', icon: 'fa-id-card', label: 'Responder ID' },
          { id: 'protocol', icon: 'fa-shield-halved', label: 'Behavioral SOP' },
          { id: 'pharma', icon: 'fa-pills', label: 'Med Log' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-4 rounded-2xl flex flex-col items-center gap-2 transition-all duration-300 ${
              activeTab === tab.id ? 'bg-rose-50 text-rose-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <i className={`fas ${tab.icon} text-lg`}></i>
            <span className="text-[9px] font-black uppercase tracking-widest mono">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div className="min-h-[400px]">
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-8">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mono">Critical Patient Data</h3>
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Blood Type</p>
                  <p className="text-2xl font-black text-slate-900">{patientInfo.bloodType}</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">DNR Status</p>
                  <p className="text-2xl font-black text-slate-900">{patientInfo.dnrStatus}</p>
                </div>
                <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100">
                  <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1">Severe Allergies</p>
                  <p className="text-xl font-bold text-rose-900">{patientInfo.allergies || 'NONE KNOWN'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-8">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mono">Responder Actions</h3>
              <div className="space-y-4">
                <a href={`tel:${patientInfo.emergencyContact}`} className="flex items-center justify-between p-6 bg-blue-600 text-white rounded-3xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
                  <div className="flex items-center gap-4">
                    <i className="fas fa-user-doctor text-xl"></i>
                    <div>
                      <p className="text-[10px] font-black opacity-80 uppercase">Emergency Contact</p>
                      <p className="font-bold">{patientInfo.emergencyContact}</p>
                    </div>
                  </div>
                  <i className="fas fa-phone"></i>
                </a>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Diagnosis</p>
                  <p className="text-sm font-bold text-slate-700 leading-relaxed">{patientInfo.conditions}</p>
                </div>
                <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Responder Note</p>
                   <p className="text-sm font-bold text-emerald-900">Patient: {patientInfo.name}, Age {patientInfo.age}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'protocol' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            {[
              { title: "Severe Agitation / Aggression", steps: ["Reduce environmental stimulus (TV off, lights low)", "Maintain 6-foot clearance", "Offer familiar soft object", "Speak in monotone, low frequency", "Check for physical pain or full bladder"] },
              { title: "Wandering / Exit Seeking", steps: ["Do not block the exit physically (escalates fear)", "Walk with the patient, then gently pivot", "Redirect with a high-value snack or activity", "Verify perimeter door chimes are active"] },
              { title: "Respiratory / Chest Pain", steps: ["Sit patient upright", "Loosen neck clothing", "Verify pulse and O2 if available", "Prepare med list for EMT arrival"] }
            ].map((p, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-black">
                    {idx + 1}
                  </div>
                  <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">{p.title}</h4>
                </div>
                <ul className="space-y-4">
                  {p.steps.map((s, si) => (
                    <li key={si} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                      <p className="text-slate-600 font-medium text-sm">{s}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'pharma' && (
          <div className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-200 shadow-sm animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mono mb-10">24-Hour Pharmacological Load</h3>
            <div className="space-y-4">
              {medications.map((med, i) => (
                <div key={i} className={`p-6 rounded-3xl border flex items-center justify-between ${med.status === 'taken' ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${med.status === 'taken' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                      <i className="fas fa-pills"></i>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{med.name} - {med.dosage}</p>
                      <p className="text-[10px] font-black mono text-slate-500 uppercase tracking-widest">{med.frequency} • Scheduled {med.scheduledTime}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${med.status === 'taken' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                    {med.status}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 p-8 bg-slate-900 text-white rounded-[32px] flex items-center gap-6">
              <i className="fas fa-circle-info text-2xl text-blue-400"></i>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Paramedics: This log represents the last 24 hours of administration. Patient is currently diagnosed with: {patientInfo.conditions}.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyHUD;
