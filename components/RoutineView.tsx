
import React from 'react';
import { Task } from '../types';

interface RoutineViewProps {
  tasks: Task[];
  toggleTask: (id: string) => void;
}

const RoutineView: React.FC<RoutineViewProps> = ({ tasks, toggleTask }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 lg:gap-6 mb-4 px-1">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-800 tracking-tight">Protocol Matrix</h2>
          <p className="text-slate-500 text-[10px] mt-1 font-black mono tracking-[0.2em] uppercase">Sequential Care Logic</p>
        </div>
        <button className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-black mono text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-3 active:scale-95 group">
          <i className="fas fa-plus group-hover:rotate-90 transition-transform text-xs"></i>
          <span>Add Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:gap-4">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`group flex flex-col xs:flex-row items-stretch xs:items-center gap-4 p-4 lg:p-6 bg-white rounded-[24px] lg:rounded-[32px] border transition-all duration-300 ${
              task.isCompleted ? 'border-emerald-100 bg-emerald-50/20' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between xs:justify-start gap-4">
              <button 
                onClick={() => toggleTask(task.id)}
                className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl flex-shrink-0 flex items-center justify-center transition-all duration-300 active:scale-90 ${
                  task.isCompleted 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                    : 'bg-slate-50 text-slate-400 border border-slate-100 hover:border-blue-400'
                }`}
              >
                {task.isCompleted ? <i className="fas fa-check text-lg"></i> : <i className="fas fa-clock-rotate-left text-lg"></i>}
              </button>
              
              <div className="xs:hidden flex flex-col items-end">
                <span className={`px-2 py-0.5 rounded text-[8px] font-black mono uppercase mb-1 ${
                  task.category === 'Hygiene' ? 'bg-purple-50 text-purple-600' :
                  task.category === 'Nutrition' ? 'bg-orange-50 text-orange-600' :
                  task.category === 'Medication' ? 'bg-rose-50 text-rose-600' :
                  'bg-blue-50 text-blue-600'
                }`}>
                  {task.category}
                </span>
                <p className="text-slate-400 text-[10px] font-black mono">{task.time}</p>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="hidden xs:flex items-center gap-3 mb-1">
                <span className={`px-2 py-0.5 rounded text-[8px] lg:text-[9px] font-black mono uppercase tracking-widest ${
                  task.category === 'Hygiene' ? 'bg-purple-50 text-purple-600' :
                  task.category === 'Nutrition' ? 'bg-orange-50 text-orange-600' :
                  task.category === 'Medication' ? 'bg-rose-50 text-rose-600' :
                  'bg-blue-50 text-blue-600'
                }`}>
                  {task.category}
                </span>
                <span className="text-slate-400 text-[9px] lg:text-[10px] font-black mono tracking-widest">{task.time}</span>
              </div>
              <h4 className={`text-base lg:text-lg font-bold truncate transition-colors ${task.isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                {task.title}
              </h4>
              <p className="text-slate-500 text-xs mt-0.5 leading-relaxed line-clamp-2">
                {task.description}
              </p>
            </div>

            <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
                <i className="fas fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] border border-slate-100">
        <h5 className="text-[9px] lg:text-[10px] font-black mono text-slate-400 uppercase tracking-[0.3em] mb-4">Optimization Advice</h5>
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
             <i className="fas fa-lightbulb text-sm"></i>
          </div>
          <p className="text-xs lg:text-sm text-slate-500 leading-relaxed italic">
            Chronological consistency reduces cognitive re-learning stress for patients in transition.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoutineView;
