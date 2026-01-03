
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Task, Activity, MoodEntry, DoctorVisit, Medication } from '../types';

interface DashboardProps {
  tasks: Task[];
  moodData: MoodEntry[];
  activities: Activity[];
  dayStatus: 'stable' | 'elevated';
  setDayStatus: (status: 'stable' | 'elevated') => void;
  visits?: DoctorVisit[];
  medications?: Medication[];
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, moodData, activities, dayStatus, setDayStatus, visits = [], medications = [] }) => {
  const completedTasksCount = tasks.filter(t => t.isCompleted).length;
  const progressPercent = Math.round((completedTasksCount / tasks.length) * 100);
  const lastVisit = visits[0];
  const missedMeds = medications.filter(m => m.status === 'missed');
  const pendingMeds = medications.filter(m => m.status === 'pending');

  const currentStatusLabel = missedMeds.length > 0 ? 'Alert' : dayStatus === 'elevated' ? 'Observe' : 'Baseline';

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-8">
      {/* SYSTEM ALERTS / MEDICATION HUD */}
      {missedMeds.length > 0 && (
        <div className="xl:col-span-12">
           <div className="bg-rose-50 border border-rose-200 p-4 lg:p-6 rounded-[24px] lg:rounded-[28px] flex items-center justify-between shadow-lg shadow-rose-900/5 animate-pulse">
             <div className="flex items-center gap-3 lg:gap-6">
                <div className="w-10 h-10 lg:w-14 lg:h-14 bg-rose-600 text-white rounded-xl lg:rounded-2xl flex items-center justify-center text-lg lg:text-2xl">
                  <i className="fas fa-pills"></i>
                </div>
                <div>
                   <p className="text-[8px] lg:text-[10px] font-black text-rose-600 uppercase mono tracking-[0.2em] mb-0.5">Alert</p>
                   <h3 className="text-sm lg:text-lg font-bold text-rose-900 truncate max-w-[200px] sm:max-w-none">Missed: {missedMeds.map(m => m.name).join(', ')}</h3>
                </div>
             </div>
             <div className="hidden sm:block px-4 py-1.5 border border-rose-300 rounded-xl text-[10px] font-bold text-rose-700">
               Action Required
             </div>
           </div>
        </div>
      )}

      {/* STATUS TOGGLE */}
      <div className="xl:col-span-12">
        <div className="bg-white border border-slate-200 p-4 lg:p-5 rounded-[24px] lg:rounded-[28px] flex flex-col sm:flex-row items-center justify-between gap-4 lg:gap-6 shadow-sm">
          <div className="flex items-center gap-3 lg:gap-4 w-full sm:w-auto">
            {/* Animated Icon Container */}
            <div 
              key={`icon-${currentStatusLabel}`}
              className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl flex items-center justify-center transition-all duration-500 flex-shrink-0 animate-in zoom-in-90 fade-in duration-300 ${
                dayStatus === 'elevated' || missedMeds.length > 0 
                ? 'bg-rose-100 text-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.1)]' 
                : 'bg-blue-100 text-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.1)]'
              }`}
            >
              <i className={`fas ${dayStatus === 'elevated' || missedMeds.length > 0 ? 'fa-triangle-exclamation animate-pulse' : 'fa-check-circle animate-clinical-pulse'}`}></i>
            </div>
            <div>
              <p className="text-[8px] lg:text-xs font-black text-slate-400 mono uppercase tracking-widest">Protocol</p>
              {/* Animated Text Label */}
              <h3 
                key={`text-${currentStatusLabel}`}
                className={`text-sm lg:text-lg font-bold uppercase tracking-tight truncate animate-in slide-in-from-left-2 fade-in duration-500 ${
                  missedMeds.length > 0 ? 'text-rose-600' : dayStatus === 'elevated' ? 'text-amber-600' : 'text-slate-800'
                }`}
              >
                {currentStatusLabel}
              </h3>
            </div>
          </div>

          <div className="flex bg-slate-100 p-1 lg:p-1.5 rounded-xl lg:rounded-2xl border border-slate-200 w-full sm:w-auto">
            <button 
              onClick={() => setDayStatus('stable')}
              className={`flex-1 sm:flex-none px-4 lg:px-8 py-2.5 lg:py-3 rounded-lg lg:rounded-xl text-[9px] lg:text-xs font-black mono tracking-[0.1em] transition-all duration-300 flex items-center justify-center gap-2 lg:gap-3 ${
                dayStatus === 'stable' 
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200' 
                  : 'text-slate-500 active:scale-95'
              }`}
            >
              <i className="fas fa-stethoscope text-[10px]"></i>
              STABLE
            </button>
            <button 
              onClick={() => setDayStatus('elevated')}
              className={`flex-1 sm:flex-none px-4 lg:px-8 py-2.5 lg:py-3 rounded-lg lg:rounded-xl text-[9px] lg:text-xs font-black mono tracking-[0.1em] transition-all duration-300 flex items-center justify-center gap-2 lg:gap-3 ${
                dayStatus === 'elevated' 
                  ? 'bg-white text-amber-600 shadow-sm border border-slate-200' 
                  : 'text-slate-500 active:scale-95'
              }`}
            >
              <i className="fas fa-eye text-[10px]"></i>
              OBSERVE
            </button>
          </div>
        </div>
      </div>

      {/* Main Monitoring Station */}
      <div className="xl:col-span-8 space-y-4 lg:space-y-8">
        <div className="bg-white p-6 lg:p-10 rounded-[32px] lg:rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-6 lg:mb-10">
            <h3 className="text-lg lg:text-xl font-bold text-slate-800 flex items-center gap-3 lg:gap-4">
               <i className="fas fa-vial-circle-check text-blue-600 text-base lg:text-lg"></i>
               Timeline
            </h3>
            <div className="text-right">
              <p className="text-[8px] lg:text-xs font-black text-slate-400 mono uppercase tracking-[0.2em]">Compliance</p>
              <p className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tighter">{progressPercent}<span className="text-lg lg:text-xl opacity-20">%</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-8 lg:mb-12">
            {tasks.slice(0, 4).map(task => (
              <div key={task.id} className={`p-4 lg:p-6 rounded-2xl lg:rounded-3xl border transition-all duration-300 flex items-center gap-3 lg:gap-5 ${
                task.isCompleted ? 'bg-emerald-50/50 border-emerald-100' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className={`w-9 h-9 lg:w-11 lg:h-11 rounded-lg lg:rounded-xl flex-shrink-0 flex items-center justify-center transition-all ${
                  task.isCompleted ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 border border-slate-100'
                }`}>
                  <i className={`fas ${task.isCompleted ? 'fa-check' : 'fa-circle-dot'} text-xs`}></i>
                </div>
                <div className="min-w-0">
                  <p className={`font-bold text-xs lg:text-sm truncate ${task.isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.title}</p>
                  <p className="text-[8px] lg:text-[10px] font-black text-slate-500 mono uppercase tracking-widest">{task.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="h-1.5 lg:h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${dayStatus === 'elevated' || missedMeds.length > 0 ? 'bg-rose-500' : 'bg-blue-600'}`} 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Clinical Pulse Chart */}
        <div className="bg-white p-6 lg:p-10 rounded-[32px] lg:rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6 lg:mb-10">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-slate-800">Stability</h3>
              <p className="hidden xs:block text-[10px] text-slate-400 font-medium">7-Day Physiological Index</p>
            </div>
            <div className={`px-3 lg:px-4 py-1.5 rounded-xl border flex items-center gap-2 lg:gap-3 transition-colors ${dayStatus === 'elevated' || missedMeds.length > 0 ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
               <div className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full animate-clinical-pulse ${dayStatus === 'elevated' || missedMeds.length > 0 ? 'bg-rose-500' : 'bg-blue-600'}`}></div>
               <span className="text-[8px] lg:text-xs font-black mono tracking-[0.1em] uppercase whitespace-nowrap">{dayStatus === 'elevated' || missedMeds.length > 0 ? 'Anomaly' : 'Baseline'}</span>
            </div>
          </div>
          
          <div className="h-48 sm:h-64 lg:h-96 -mx-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={moodData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="clinicalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={dayStatus === 'elevated' || missedMeds.length > 0 ? '#f43f5e' : '#2563eb'} stopOpacity={0.15}/>
                    <stop offset="95%" stopColor={dayStatus === 'elevated' || missedMeds.length > 0 ? '#f43f5e' : '#2563eb'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 8, fontWeight: 800 }} dy={10} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '10px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="stability" 
                  stroke={dayStatus === 'elevated' || missedMeds.length > 0 ? '#f43f5e' : '#2563eb'} 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#clinicalGradient)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Actionable Diagnostics Sidebar */}
      <div className="xl:col-span-4 space-y-4 lg:space-y-8">
        {/* UPCOMING MEDICATIONS */}
        <div className="bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] border border-slate-200 shadow-sm">
           <div className="flex items-center justify-between mb-6 lg:mb-8">
             <h3 className="text-base lg:text-lg font-bold text-slate-800">Pharmacy</h3>
             <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[8px] lg:text-[9px] font-black mono uppercase">Pending</span>
           </div>
           <div className="space-y-2 lg:space-y-3">
             {pendingMeds.length > 0 ? pendingMeds.slice(0, 3).map((med, i) => (
               <div key={i} className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 bg-slate-50 rounded-xl lg:rounded-2xl border border-slate-100">
                 <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-white border border-slate-200 flex-shrink-0 flex items-center justify-center text-slate-400">
                    <i className="fas fa-pills text-[10px]"></i>
                 </div>
                 <div className="min-w-0">
                   <p className="text-xs font-bold text-slate-800 truncate">{med.name}</p>
                   <p className="text-[8px] lg:text-[10px] font-black mono text-slate-400 uppercase tracking-widest">{med.scheduledTime}</p>
                 </div>
               </div>
             )) : (
               <p className="text-xs text-slate-400 text-center py-4">All doses complete.</p>
             )}
           </div>
        </div>

        {/* RECENT CLINICAL SUMMARY - Hidden on mobile if not first item */}
        {lastVisit && (
          <div className="bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] border border-slate-200 shadow-sm hidden md:block">
            <p className="text-[8px] lg:text-[10px] font-black text-slate-400 mono uppercase tracking-[0.2em] mb-4 lg:mb-6">Latest Note</p>
            <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <i className="fas fa-file-waveform text-xs"></i>
              </div>
              <div>
                <p className="text-xs lg:text-sm font-bold text-slate-800 truncate">{lastVisit.physician}</p>
                <p className="text-[8px] lg:text-[10px] text-slate-400 mono font-black">{lastVisit.date}</p>
              </div>
            </div>
            <p className="text-[11px] lg:text-xs text-slate-600 leading-relaxed italic border-l-2 border-blue-100 pl-3 lg:pl-4 py-1 line-clamp-3">
              "{lastVisit.recommendations}"
            </p>
          </div>
        )}

        {/* INSIGHT BOX */}
        <div className={`p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] shadow-lg relative overflow-hidden transition-all duration-700 ${dayStatus === 'elevated' || missedMeds.length > 0 ? 'bg-white border border-rose-200' : 'bg-blue-600 text-white'}`}>
          <div className="relative z-10">
            <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
              <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl flex items-center justify-center shadow-md ${dayStatus === 'elevated' || missedMeds.length > 0 ? 'bg-rose-100 text-rose-600' : 'bg-white/20 text-white'}`}>
                <i className={`fas ${missedMeds.length > 0 ? 'fa-shield-exclamation' : 'fa-lightbulb-on'} text-xs lg:text-sm`}></i>
              </div>
              <span className={`text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] ${dayStatus === 'elevated' || missedMeds.length > 0 ? 'text-rose-700' : 'text-white/80'}`}>Protocol Insight</span>
            </div>
            <p className={`text-sm lg:text-lg font-bold leading-relaxed italic ${dayStatus === 'elevated' || missedMeds.length > 0 ? 'text-slate-800' : 'text-white'}`}>
              {missedMeds.length > 0 
                ? `"Critical: Pharmacological non-compliance. Verify safety immediately."`
                : dayStatus === 'elevated' 
                  ? '"Observer agitation protocol active. Low-stimulus env suggested."' 
                  : '"Baseline nominal. Window for high-engagement memory activities active."'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
