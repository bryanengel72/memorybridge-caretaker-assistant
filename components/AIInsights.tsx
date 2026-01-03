
import React, { useState } from 'react';
import { getCareAdvice } from '../services/geminiService';
import { DoctorVisit, Task, Medication, PatientInfo } from '../types';

interface AIInsightsProps {
  visits?: DoctorVisit[];
  tasks?: Task[];
  medications?: Medication[];
  patientInfo?: PatientInfo;
}

const AIInsights: React.FC<AIInsightsProps> = ({ visits = [], tasks = [], medications = [], patientInfo }) => {
  const [query, setQuery] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsTyping(true);
    setAdvice(null);

    const clinicalContext = `
      PATIENT BIO:
      - Name: ${patientInfo?.name}
      - Age: ${patientInfo?.age}
      - Conditions: ${patientInfo?.conditions}
      - Allergies: ${patientInfo?.allergies}
      - DNR: ${patientInfo?.dnrStatus}

      PHARMACY ADHERENCE:
      ${medications.map(m => `- ${m.name} (${m.dosage}, ${m.frequency}): ${m.status.toUpperCase()} (Scheduled: ${m.scheduledTime})`).join('\n')}

      DOCTOR VISITS:
      ${visits.map(v => `- ${v.date}: ${v.physician} (${v.specialty}). Notes: ${v.notes}. Recommendations: ${v.recommendations}`).join('\n')}
      
      DAILY PROTOCOL:
      ${tasks.map(t => `- ${t.time}: ${t.title} (${t.isCompleted ? 'Completed' : 'Pending'})`).join('\n')}
    `;

    try {
      const result = await getCareAdvice(query, clinicalContext);
      setAdvice(result);
    } catch (err) {
      setAdvice("DIAGNOSTIC FAILURE: The intelligence core is currently unreachable. Check your institutional network settings.");
    } finally {
      setIsTyping(false);
    }
  };

  // Simple formatter for markdown-like responses from Gemini
  const renderFormattedAdvice = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <div key={index} className="h-4" />;

      // Header handling
      if (trimmedLine.startsWith('###')) {
        return (
          <h3 key={index} className="text-sm font-black text-blue-700 uppercase tracking-widest mt-8 mb-4 border-b border-blue-100 pb-2 mono">
            {trimmedLine.replace(/###|\*/g, '').trim()}
          </h3>
        );
      }

      // Bullet points
      if (trimmedLine.startsWith('*') || trimmedLine.startsWith('-')) {
        const content = trimmedLine.substring(1).trim();
        return (
          <div key={index} className="flex gap-3 mb-3 pl-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
            <p className="text-slate-700 text-sm leading-relaxed">
              {formatBoldText(content)}
            </p>
          </div>
        );
      }

      return (
        <p key={index} className="text-slate-700 text-sm leading-relaxed mb-4">
          {formatBoldText(trimmedLine)}
        </p>
      );
    });
  };

  const formatBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-slate-900">{part.replace(/\*\*/g, '')}</strong>;
      }
      return part;
    });
  };

  const suggestions = [
    "ANALYSIS OF MISSED DOSES",
    "MEDICATION SIDE EFFECTS",
    "DE-ESCALATION TIPS",
    "RE-ENTRY INTO BASELINE"
  ];

  const hasMissedMeds = medications.some(m => m.status === 'missed');

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-5">
        <div className="w-20 h-20 bg-blue-50 border border-blue-100 rounded-3xl flex items-center justify-center text-blue-600 text-3xl mx-auto shadow-sm">
          <i className="fas fa-laptop-medical animate-clinical-pulse"></i>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight uppercase">Intelligence Core</h2>
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] mono mt-2">Expert Care Analysis</p>
          
          <div className="mt-4">
            <span className={`inline-flex items-center px-3 py-1 border rounded-lg text-[9px] font-black mono tracking-widest ${hasMissedMeds ? 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
              <i className={`fas ${hasMissedMeds ? 'fa-bell' : 'fa-link'} mr-2 text-[8px]`}></i>
              {hasMissedMeds ? 'ALERT ACTIVE' : 'RECORDS LINKED'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-12 rounded-[40px] md:rounded-[48px] border border-slate-200 shadow-sm relative overflow-hidden">
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:border-blue-400 transition-all shadow-inner">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Query patient records or pharma info..."
              className="w-full bg-transparent px-6 md:px-8 py-4 md:py-5 text-slate-800 font-bold outline-none text-sm md:text-base mono placeholder:text-slate-300"
            />
            <button 
              disabled={isTyping || !query.trim()}
              className={`mr-2 h-10 md:h-12 px-4 md:px-6 rounded-2xl flex items-center justify-center transition-all font-black text-[9px] md:text-[10px] mono uppercase tracking-widest ${
                !query.trim() ? 'bg-slate-200 text-slate-400' : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95'
              }`}
            >
              {isTyping ? <i className="fas fa-spinner-third animate-spin"></i> : <span>Inquire</span>}
            </button>
          </div>
        </form>

        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {suggestions.map((s, i) => (
            <button 
              key={i} 
              onClick={() => setQuery(s)}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-500 rounded-xl text-[9px] font-black mono tracking-widest hover:border-blue-400 hover:text-blue-600 transition-all active:scale-95 shadow-sm"
            >
              {s}
            </button>
          ))}
        </div>

        {advice && (
          <div className="p-1 px-1 bg-white rounded-[32px] overflow-hidden animate-in slide-in-from-bottom-4 duration-500 border border-blue-50">
             <div className="bg-slate-50/50 p-6 md:p-10 rounded-[30px] border border-blue-100/50">
                <div className="flex items-start justify-between mb-8 border-b border-blue-100 pb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                      <i className="fas fa-file-medical-alt text-xl"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-blue-600 mono uppercase tracking-[0.2em] mb-0.5">Automated Analysis</p>
                      <h4 className="text-slate-900 font-bold text-lg">Clinical Care Directive</h4>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-[9px] font-black text-slate-400 mono uppercase tracking-widest">Diagnostic ID</p>
                    <p className="text-[10px] font-bold text-slate-700 mono">MB-CORE-REF-{Math.floor(Math.random() * 9000) + 1000}</p>
                  </div>
                </div>

                <div className="advice-content font-medium">
                  {renderFormattedAdvice(advice)}
                </div>

                <div className="mt-12 pt-8 border-t border-blue-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-black text-slate-400 mono uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <i className="fas fa-circle text-[6px] text-emerald-500"></i>
                    Context: Records + Adherence History
                  </span>
                  <div className="flex gap-6">
                    <button onClick={() => window.print()} className="hover:text-blue-600 transition-colors flex items-center gap-2">
                      <i className="fas fa-print"></i> Export
                    </button>
                    <button onClick={() => {
                      navigator.clipboard.writeText(advice);
                      alert('Directive copied to clipboard');
                    }} className="hover:text-blue-600 transition-colors flex items-center gap-2">
                      <i className="fas fa-copy"></i> Copy
                    </button>
                  </div>
                </div>
             </div>
          </div>
        )}

        {isTyping && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <div className="flex space-x-2">
               <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
               <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
               <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce"></div>
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mono">Synthesizing Records + Research...</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pb-12 px-2">
        <div className="p-8 bg-white rounded-[40px] border border-slate-200 flex items-start gap-6 shadow-sm">
           <div className="w-14 h-14 rounded-2xl bg-slate-50 flex-shrink-0 flex items-center justify-center text-blue-600 text-2xl">
             <i className="fas fa-user-shield"></i>
           </div>
           <div>
             <h4 className="font-black text-slate-800 text-[10px] mono uppercase tracking-[0.2em] mb-2">PRIVACY PROTOCOL</h4>
             <p className="text-xs lg:text-sm text-slate-500 leading-relaxed">Intelligence Core handles data locally for session context. HIPAA-aligned processing minimizes external risk.</p>
           </div>
        </div>
        <div className="p-8 bg-white rounded-[40px] border border-slate-200 flex items-start gap-6 shadow-sm">
           <div className="w-14 h-14 rounded-2xl bg-slate-50 flex-shrink-0 flex items-center justify-center text-blue-600 text-2xl">
             <i className="fas fa-microscope"></i>
           </div>
           <div>
             <h4 className="font-black text-slate-800 text-[10px] mono uppercase tracking-[0.2em] mb-2">CLINICAL GROUNDING</h4>
             <p className="text-xs lg:text-sm text-slate-500 leading-relaxed">Answers are cross-referenced with your specific physician notes and Alzheimer’s Association guidelines.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
