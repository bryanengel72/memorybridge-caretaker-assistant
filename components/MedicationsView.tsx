
import React, { useState } from 'react';
import { Medication } from '../types';

interface MedicationsViewProps {
  medications: Medication[];
  onUpdateStatus: (id: string, status: 'taken' | 'pending' | 'missed') => void;
  onAddMedication: (med: Omit<Medication, 'id'>) => void;
}

const MedicationsView: React.FC<MedicationsViewProps> = ({ medications, onUpdateStatus, onAddMedication }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    scheduledTime: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMedication({ ...formData, status: 'pending' });
    setFormData({ name: '', dosage: '', frequency: '', scheduledTime: '', notes: '' });
    setIsAdding(false);
  };

  const missedCount = medications.filter(m => m.status === 'missed').length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 lg:space-y-10 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 px-1">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-800 tracking-tight">Pharmacy Hub</h2>
          <p className="text-slate-500 text-[10px] mt-1 uppercase tracking-widest font-black mono">ADHERENCE TRACKING</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="w-full sm:w-auto px-6 py-3.5 lg:py-4 bg-slate-900 text-white rounded-2xl font-black mono text-[10px] uppercase tracking-widest hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-900/10"
        >
          <i className={`fas ${isAdding ? 'fa-times' : 'fa-plus'} text-xs`}></i>
          {isAdding ? 'Cancel' : 'Add Medication'}
        </button>
      </div>

      {missedCount > 0 && (
        <div className="bg-rose-50 border border-rose-100 p-4 lg:p-6 rounded-[24px] lg:rounded-[32px] flex items-center gap-4 lg:gap-6 animate-pulse">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-rose-500 text-white rounded-xl lg:rounded-2xl flex-shrink-0 flex items-center justify-center text-lg shadow-lg shadow-rose-500/30">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div>
            <h4 className="text-rose-600 font-black text-[10px] lg:text-sm uppercase tracking-widest leading-none mb-1">Warning</h4>
            <p className="text-rose-700 text-[11px] lg:text-xs font-bold leading-tight">{missedCount} dose(s) missed. Review protocol.</p>
          </div>
        </div>
      )}

      {isAdding && (
        <div className="bg-white border border-blue-100 rounded-[32px] lg:rounded-[40px] p-6 lg:p-12 shadow-xl animate-in slide-in-from-top-4 duration-500">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-4 lg:space-y-6">
              <div>
                <label className="block text-[10px] font-black mono text-slate-400 uppercase mb-2">Medication Name</label>
                <input 
                  required
                  placeholder="e.g. Donepezil"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black mono text-slate-400 uppercase mb-2">Dosage</label>
                  <input 
                    required
                    placeholder="10mg"
                    value={formData.dosage}
                    onChange={e => setFormData({...formData, dosage: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black mono text-slate-400 uppercase mb-2">Scheduled</label>
                  <input 
                    required
                    placeholder="08:00 AM"
                    value={formData.scheduledTime}
                    onChange={e => setFormData({...formData, scheduledTime: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black mono text-slate-400 uppercase mb-2">Frequency</label>
                <input 
                  required
                  placeholder="e.g. Twice daily"
                  value={formData.frequency}
                  onChange={e => setFormData({...formData, frequency: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            <div className="space-y-4 lg:space-y-6">
              <div>
                <label className="block text-[10px] font-black mono text-slate-400 uppercase mb-2">Internal Notes</label>
                <textarea 
                  rows={3}
                  placeholder="Take with food..."
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-blue-500 transition-all resize-none"
                />
              </div>
              <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-black mono text-[10px] uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
                Authorize Entry
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {medications.map((med) => (
          <div key={med.id} className={`bg-white border p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] shadow-sm transition-all duration-300 relative overflow-hidden flex flex-col ${
            med.status === 'missed' ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200'
          }`}>
            <div className="flex justify-between items-start mb-6">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl flex items-center justify-center text-lg transition-all ${
                med.status === 'taken' ? 'bg-emerald-500 text-white' : 
                med.status === 'missed' ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                <i className={`fas ${med.status === 'taken' ? 'fa-check' : med.status === 'missed' ? 'fa-pills' : 'fa-hourglass-start'} text-sm lg:text-base`}></i>
              </div>
              <span className="text-[9px] lg:text-[10px] font-black mono text-slate-400 tracking-widest uppercase">{med.scheduledTime}</span>
            </div>

            <h3 className="text-lg lg:text-xl font-bold text-slate-800 mb-1 truncate">{med.name}</h3>
            <p className="text-blue-600 font-black text-[9px] lg:text-[10px] mono uppercase tracking-widest mb-4">{med.dosage} • {med.frequency}</p>
            
            {med.notes && <p className="text-[11px] text-slate-500 italic mb-6 lg:mb-8 leading-relaxed line-clamp-2">"{med.notes}"</p>}

            <div className="grid grid-cols-2 gap-2 lg:gap-3 mt-auto pt-4 lg:pt-6 border-t border-slate-100">
              <button 
                onClick={() => onUpdateStatus(med.id, 'taken')}
                className={`py-2.5 lg:py-3 rounded-xl text-[8px] lg:text-[9px] font-black uppercase tracking-widest transition-all ${
                  med.status === 'taken' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10' : 'bg-slate-50 text-slate-400 active:bg-emerald-50'
                }`}
              >
                Taken
              </button>
              <button 
                onClick={() => onUpdateStatus(med.id, 'missed')}
                className={`py-2.5 lg:py-3 rounded-xl text-[8px] lg:text-[9px] font-black uppercase tracking-widest transition-all ${
                  med.status === 'missed' ? 'bg-rose-500 text-white shadow-md shadow-rose-500/10' : 'bg-slate-50 text-slate-400 active:bg-rose-50'
                }`}
              >
                Missed
              </button>
            </div>

            {med.status === 'missed' && (
              <div className="absolute top-2 right-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-slate-900 p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] text-white flex flex-col sm:flex-row items-center gap-6 lg:gap-8 relative overflow-hidden">
        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-500/20 rounded-2xl flex-shrink-0 flex items-center justify-center text-blue-400 text-2xl lg:text-3xl">
           <i className="fas fa-shield-virus"></i>
        </div>
        <div className="relative z-10 text-center sm:text-left">
          <h4 className="text-base lg:text-lg font-black uppercase tracking-tight">Protocol Adherence</h4>
          <p className="text-slate-400 text-[11px] lg:text-sm leading-relaxed max-w-xl">Strict timing is critical in neuro-care. System flags divergent status automatically if not logged within 60 min.</p>
        </div>
        <div className="absolute -right-20 -bottom-20 w-48 h-48 lg:w-64 lg:h-64 bg-blue-600/10 rounded-full blur-[60px] lg:blur-[80px]"></div>
      </div>
    </div>
  );
};

export default MedicationsView;
