
import React, { useState } from 'react';
import { DoctorVisit } from '../types';

interface ClinicalRecordsViewProps {
  visits: DoctorVisit[];
  onAddVisit: (visit: Omit<DoctorVisit, 'id'>) => void;
}

const ClinicalRecordsView: React.FC<ClinicalRecordsViewProps> = ({ visits, onAddVisit }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    physician: '',
    specialty: '',
    notes: '',
    recommendations: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddVisit(formData);
    setFormData({ date: '', physician: '', specialty: '', notes: '', recommendations: '' });
    setIsAdding(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 px-1">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Physician Engagement History</h2>
          <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-black mono">CLINICAL OBSERVATIONS & CONSULTATIONS</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="px-6 py-4 bg-slate-900 text-white rounded-2xl font-black mono text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-900/10"
        >
          <i className={`fas ${isAdding ? 'fa-times' : 'fa-plus'}`}></i>
          {isAdding ? 'Cancel Entry' : 'Log Visit'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white border border-blue-100 rounded-[40px] p-8 md:p-12 shadow-xl animate-in slide-in-from-top-4 duration-500">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black mono text-slate-400 uppercase mb-2">Visit Date</label>
                <input 
                  required
                  type="date" 
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black mono text-slate-400 uppercase mb-2">Physician Name</label>
                <input 
                  required
                  placeholder="e.g. Dr. Aris Vance"
                  value={formData.physician}
                  onChange={e => setFormData({...formData, physician: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black mono text-slate-400 uppercase mb-2">Specialty</label>
                <input 
                  required
                  placeholder="e.g. Neurologist"
                  value={formData.specialty}
                  onChange={e => setFormData({...formData, specialty: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black mono text-slate-400 uppercase mb-2">General Notes</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Behavioral changes, physical symptoms..."
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:border-blue-500 transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black mono text-slate-400 uppercase mb-2">Physician Recommendations</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Dosage changes, new exercises..."
                  value={formData.recommendations}
                  onChange={e => setFormData({...formData, recommendations: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:border-blue-500 transition-all resize-none"
                />
              </div>
              <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-black mono text-[10px] uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all">
                Validate & Save Entry
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {visits.map((visit) => (
          <div key={visit.id} className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col lg:flex-row items-stretch">
              <div className="lg:w-72 bg-slate-50 border-r border-slate-200 p-8 flex flex-col justify-center">
                <p className="text-sm font-black text-slate-900 mono">{visit.date}</p>
                <h4 className="text-base font-bold text-blue-600 mt-2">{visit.physician}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase mono tracking-widest mt-1">{visit.specialty}</p>
              </div>
              <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h5 className="text-[10px] font-black text-slate-400 uppercase mono tracking-[0.2em] mb-3 flex items-center gap-2">
                    <i className="fas fa-notes-medical text-blue-500"></i>
                    Session Observations
                  </h5>
                  <p className="text-sm text-slate-600 leading-relaxed italic">"{visit.notes}"</p>
                </div>
                <div>
                  <h5 className="text-[10px] font-black text-slate-400 uppercase mono tracking-[0.2em] mb-3 flex items-center gap-2">
                    <i className="fas fa-stethoscope text-emerald-500"></i>
                    Actionable Directives
                  </h5>
                  <p className="text-sm text-slate-700 font-bold leading-relaxed">{visit.recommendations}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 p-8 rounded-[40px] flex items-start gap-6">
        <div className="w-12 h-12 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
          <i className="fas fa-shield-check"></i>
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-800 uppercase mono tracking-widest mb-2">HIPAA Compliance Guidance</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Ensure you avoid entering full government IDs or extremely specific residential addresses in the notes field. MemoryBridge uses session-based AI context to minimize risk, but caretaker discretion is advised when logging clinical data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClinicalRecordsView;
