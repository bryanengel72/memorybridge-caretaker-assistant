
import React, { useState } from 'react';
import { PatientInfo } from '../types';

interface PatientProfileViewProps {
  patientInfo: PatientInfo;
  setPatientInfo: (info: PatientInfo) => void;
}

const PatientProfileView: React.FC<PatientProfileViewProps> = ({ patientInfo, setPatientInfo }) => {
  const [formData, setFormData] = useState<PatientInfo>(patientInfo);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPatientInfo(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all";
  const labelClass = "block text-[10px] font-black mono text-slate-400 uppercase mb-2 ml-1 tracking-widest";

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Clinical Registration</h2>
          <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-black mono">Primary Patient Demographics</p>
        </div>
        {isSaved && (
          <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black mono animate-in fade-in slide-in-from-right-4">
            RECORDS UPDATED
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-[48px] p-8 md:p-14 shadow-sm space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Identity Section */}
          <div className="space-y-6">
            <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mono border-b border-blue-50 pb-4 mb-8">Identity & Bio</h3>
            
            <div>
              <label className={labelClass}>Full Legal Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className={inputClass}
                placeholder="Patient Name"
              />
            </div>

            <div>
              <label className={labelClass}>Age</label>
              <input 
                type="number" 
                value={formData.age}
                onChange={e => setFormData({...formData, age: e.target.value})}
                className={inputClass}
                placeholder="75"
              />
            </div>

            <div>
              <label className={labelClass}>Primary Conditions</label>
              <textarea 
                rows={3}
                value={formData.conditions}
                onChange={e => setFormData({...formData, conditions: e.target.value})}
                className={`${inputClass} resize-none`}
                placeholder="Alzheimer's, Type 2 Diabetes..."
              />
            </div>
          </div>

          {/* Clinical Vitals Section */}
          <div className="space-y-6">
            <h3 className="text-sm font-black text-rose-600 uppercase tracking-widest mono border-b border-rose-50 pb-4 mb-8">Clinical Vitals</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Blood Type</label>
                <select 
                  value={formData.bloodType}
                  onChange={e => setFormData({...formData, bloodType: e.target.value})}
                  className={inputClass}
                >
                  <option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option>
                  <option>O+</option><option>O-</option>
                  <option>AB+</option><option>AB-</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>DNR Status</label>
                <select 
                  value={formData.dnrStatus}
                  onChange={e => setFormData({...formData, dnrStatus: e.target.value as any})}
                  className={inputClass}
                >
                  <option>Active</option>
                  <option>None</option>
                  <option>Consult Physician</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Severe Allergies</label>
              <input 
                type="text" 
                value={formData.allergies}
                onChange={e => setFormData({...formData, allergies: e.target.value})}
                className={inputClass}
                placeholder="Latex, Penicillin..."
              />
            </div>

            <div>
              <label className={labelClass}>Emergency Contact</label>
              <input 
                type="text" 
                value={formData.emergencyContact}
                onChange={e => setFormData({...formData, emergencyContact: e.target.value})}
                className={inputClass}
                placeholder="Name (Phone Number)"
              />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex justify-end">
          <button 
            type="submit"
            className="px-12 py-5 bg-slate-900 text-white rounded-[24px] font-black mono text-[11px] uppercase tracking-widest hover:bg-blue-600 shadow-xl hover:shadow-blue-600/20 transition-all active:scale-95"
          >
            Authorize & Save Bio
          </button>
        </div>
      </form>

      <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-200 flex items-start gap-6">
        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
          <i className="fas fa-lock text-lg"></i>
        </div>
        <div>
          <h4 className="text-xs font-black text-slate-800 uppercase mono tracking-widest mb-2">Institutional Data Security</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Patient demographic information is stored in local session state. This data is critical for providing the Intelligence Core with necessary physiological boundaries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileView;
