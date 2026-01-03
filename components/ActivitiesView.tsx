
import React, { useState } from 'react';
import { Activity } from '../types';

interface ActivitiesViewProps {
  activities: Activity[];
  isLoading: boolean;
}

const ActivitiesView: React.FC<ActivitiesViewProps> = ({ activities, isLoading }) => {
  const [processingIds, setProcessingIds] = useState<Set<number>>(new Set());
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());
  const [confirmDialog, setConfirmDialog] = useState<{ isOpen: boolean; index: number | null }>({
    isOpen: false,
    index: null,
  });

  const openConfirmation = (index: number) => {
    setConfirmDialog({ isOpen: true, index });
  };

  const closeConfirmation = () => {
    setConfirmDialog({ isOpen: false, index: null });
  };

  const handleConfirmDone = async () => {
    const index = confirmDialog.index;
    if (index === null) return;
    
    closeConfirmation();
    
    if (completedIds.has(index) || processingIds.has(index)) return;

    setProcessingIds((prev) => new Set(prev).add(index));
    
    // Simulate API call or processing time
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    setProcessingIds((prev) => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
    setCompletedIds((prev) => new Set(prev).add(index));
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-10 relative pb-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 px-1">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Neural Protocol Suite</h2>
          <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-black mono">COGNITIVE ENGAGEMENT & STIMULATION THERAPY</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-200 animate-pulse space-y-6 shadow-sm">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl"></div>
              <div className="h-6 bg-slate-50 rounded w-1/2"></div>
              <div className="space-y-3">
                <div className="h-3 bg-slate-50 rounded"></div>
                <div className="h-3 bg-slate-50 rounded"></div>
              </div>
            </div>
          ))
        ) : (
          activities.map((act, i) => {
            const isProcessing = processingIds.has(i);
            const isCompleted = completedIds.has(i);

            return (
              <div 
                key={i} 
                className={`group bg-white p-8 rounded-[40px] border border-slate-200 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 relative flex flex-col ${isCompleted ? 'opacity-60 bg-slate-50/50' : ''}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 text-xl transition-all duration-300 ${isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
                  <i className={`fas ${isCompleted ? 'fa-check-circle' : 'fa-brain'}`}></i>
                </div>
                
                <h3 className={`text-xl font-bold mb-4 transition-colors ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                  {act.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-10 flex-1">
                  {act.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 mb-8">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mono mb-1">Benefit</p>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">{act.benefit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mono mb-1">Time</p>
                    <p className="text-[11px] font-bold text-slate-700">{act.duration}</p>
                  </div>
                </div>

                <button 
                  onClick={() => openConfirmation(i)}
                  disabled={isProcessing || isCompleted}
                  className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 ${
                    isCompleted 
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default' 
                      : isProcessing
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]'
                  }`}
                >
                  {isProcessing && <i className="fas fa-spinner-third animate-spin"></i>}
                  {isCompleted && <i className="fas fa-check"></i>}
                  <span>{isCompleted ? 'Completed' : isProcessing ? 'Logging...' : 'Mark as Finished'}</span>
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="bg-slate-900 p-10 md:p-14 rounded-[48px] text-white flex flex-col md:flex-row items-center gap-12 relative overflow-hidden shadow-2xl">
        <div className="flex-1 space-y-6 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400">
            <i className="fas fa-heart-pulse text-xl"></i>
          </div>
          <h3 className="text-3xl font-black tracking-tight uppercase italic">The Clinical Value of Connection</h3>
          <p className="text-slate-400 leading-relaxed text-lg">
            Neuro-stimulation is not just an activity; it's a physiological intervention. Routine engagement helps stabilize dopamine levels and reduces cortisol-induced agitation.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[100px]"></div>
      </div>

      {/* Confirmation Dialog */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[40px] border border-slate-200 shadow-2xl p-10 transform animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-3xl flex items-center justify-center text-blue-600 text-2xl mb-8 mx-auto">
              <i className="fas fa-file-medical"></i>
            </div>
            <h3 className="text-2xl font-black text-slate-800 text-center mb-4 uppercase tracking-tighter">Log Completion?</h3>
            <p className="text-slate-500 text-center mb-10 leading-relaxed font-medium px-4">
              Recording this therapy session helps the AI Core refine the patient's daily stimulation strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={closeConfirmation}
                className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-2xl font-black mono text-[10px] tracking-widest hover:bg-slate-100 transition-all"
              >
                ABORT
              </button>
              <button 
                onClick={handleConfirmDone}
                className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black mono text-[10px] tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
              >
                LOG DATA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitiesView;
