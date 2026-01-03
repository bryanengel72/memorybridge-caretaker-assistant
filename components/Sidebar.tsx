
import React from 'react';

interface SidebarProps {
  currentView: string;
  setView: (view: 'dashboard' | 'routine' | 'ai' | 'activities' | 'records' | 'meds' | 'emergency' | 'profile') => void;
  isOpen?: boolean;
  onClose?: () => void;
  dayStatus?: 'stable' | 'elevated';
  missedMedsCount?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, onClose, dayStatus, missedMedsCount = 0 }) => {
  const navItems = [
    { id: 'dashboard', icon: 'fa-chart-simple', label: 'Clinical Monitor', sub: 'Real-time telemetry' },
    { id: 'profile', icon: 'fa-user-nurse', label: 'Patient Bio', sub: 'Critical demographics' },
    { id: 'meds', icon: 'fa-pills', label: 'Medication Control', sub: 'Pharmacy tracking', alert: missedMedsCount > 0 },
    { id: 'records', icon: 'fa-folder-medical', label: 'Medical Records', sub: 'Visits & Physician notes' },
    { id: 'routine', icon: 'fa-clipboard-list', label: 'Care Protocol', sub: 'Scheduled routines' },
    { id: 'activities', icon: 'fa-brain', label: 'Neural Stimulation', sub: 'Cognitive therapies' },
    { id: 'ai', icon: 'fa-wand-magic-sparkles', label: 'Intelligence Core', sub: 'AI diagnostic aid' },
  ];

  return (
    <aside className={`
      fixed left-0 top-0 h-full w-72 bg-white border-r border-slate-200 p-8 flex flex-col z-50 transition-all duration-500 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
    `}>
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <i className="fas fa-microscope"></i>
          </div>
          <div>
            <span className="text-lg font-black text-slate-800 tracking-tight leading-none block">MEMORY</span>
            <span className="text-lg font-black text-blue-600 tracking-tight leading-none block">BRIDGE</span>
          </div>
        </div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mono mt-4">V 2.8.5 STABLE</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as any)}
            className={`w-full group flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 relative ${
              currentView === item.id 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              currentView === item.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 group-hover:text-slate-600'
            }`}>
              <i className={`fas ${item.icon} text-sm`}></i>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold leading-none mb-1">{item.label}</p>
              <p className="text-[10px] text-slate-400 font-medium">{item.sub}</p>
            </div>
            {item.alert && (
              <div className="absolute right-4 w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-slate-100">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-4">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">System Health</p>
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${missedMedsCount > 0 ? 'bg-rose-500' : 'bg-emerald-500'} animate-clinical-pulse`}></span>
              {missedMedsCount > 0 ? 'Alert Active' : 'Core Linked'}
            </span>
            <span className="text-[10px] font-black mono text-slate-400">99.9%</span>
          </div>
        </div>
        
        <button 
          onClick={() => setView('emergency')}
          className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold text-xs transition-colors ${
            currentView === 'emergency' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-white hover:bg-rose-600'
          }`}
        >
          <span>Emergency HUD</span>
          <i className="fas fa-biohazard text-[10px]"></i>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
