
import React, { useState, useEffect } from 'react';
import { Task, Activity, MoodEntry, DoctorVisit, Medication, PatientInfo } from './types';
import { generateDailyStimulation } from './services/geminiService';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RoutineView from './components/RoutineView';
import AIInsights from './components/AIInsights';
import ActivitiesView from './components/ActivitiesView';
import ClinicalRecordsView from './components/ClinicalRecordsView';
import MedicationsView from './components/MedicationsView';
import EmergencyHUD from './components/EmergencyHUD';
import PatientProfileView from './components/PatientProfileView';

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Morning Medication', category: 'Medication', time: '08:00 AM', isCompleted: false, description: 'Check Medication Hub for specifics.' },
  { id: '2', title: 'Warm Bath/Wash', category: 'Hygiene', time: '09:30 AM', isCompleted: false, description: 'Ensure water temperature is checked.' },
  { id: '3', title: 'Hydration Break', category: 'Nutrition', time: '11:00 AM', isCompleted: false, description: 'Small glass of water.' },
  { id: '4', title: 'Gentle Walk', category: 'Other', time: '05:00 PM', isCompleted: false, description: '15-minute garden walk if weather permits.' },
];

const INITIAL_MEDICATIONS: Medication[] = [
  { id: 'm1', name: 'Donepezil (Aricept)', dosage: '10mg', frequency: 'Daily', scheduledTime: '08:00 AM', status: 'pending' },
  { id: 'm2', name: 'Memantine (Namenda)', dosage: '5mg', frequency: 'Twice Daily', scheduledTime: '08:00 AM', status: 'missed' },
  { id: 'm3', name: 'Multi-Vitamin', dosage: '1 Tab', frequency: 'Daily', scheduledTime: '09:00 AM', status: 'pending' },
];

const INITIAL_PATIENT: PatientInfo = {
  name: 'John Doe',
  age: '78',
  bloodType: 'A+',
  allergies: 'Penicillin, Latex',
  conditions: 'Early-onset Alzheimers, Hypertension',
  dnrStatus: 'Active',
  emergencyContact: 'Jane Doe (555-0199)'
};

const INITIAL_VISITS: DoctorVisit[] = [
  {
    id: 'v1',
    date: '2024-05-10',
    physician: 'Dr. Aris Vance',
    specialty: 'Neurologist',
    notes: 'Patient showing slightly increased word-finding difficulty. Motor skills remain stable.',
    recommendations: 'Continue current Aricept dosage. Monitor for increased agitation during sunset hours.'
  }
];

const MOOD_DATA: MoodEntry[] = [
  { day: 'MON', stability: 70 },
  { day: 'TUE', stability: 85 },
  { day: 'WED', stability: 60 },
  { day: 'THU', stability: 90 },
  { day: 'FRI', stability: 75 },
  { day: 'SAT', stability: 80 },
  { day: 'SUN', stability: 88 },
];

const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'routine' | 'ai' | 'activities' | 'records' | 'meds' | 'emergency' | 'profile'>('dashboard');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [patientInfo, setPatientInfo] = useState<PatientInfo>(INITIAL_PATIENT);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [visits, setVisits] = useState<DoctorVisit[]>(INITIAL_VISITS);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dayStatus, setDayStatus] = useState<'stable' | 'elevated'>('stable');

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoadingActivities(true);
      const acts = await generateDailyStimulation('Moderate');
      setActivities(acts);
      setIsLoadingActivities(false);
    };
    fetchActivities();
  }, []);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const updateMedicationStatus = (id: string, status: 'taken' | 'pending' | 'missed') => {
    setMedications(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const addMedication = (med: Omit<Medication, 'id'>) => {
    const newMed = { ...med, id: Date.now().toString() };
    setMedications(prev => [...prev, newMed]);
  };

  const addVisit = (visit: Omit<DoctorVisit, 'id'>) => {
    const newVisit = { ...visit, id: Date.now().toString() };
    setVisits(prev => [newVisit, ...prev]);
  };

  const handleSetView = (newView: typeof view) => {
    setView(newView);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const missedCount = medications.filter(m => m.status === 'missed').length;

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-5%] right-[-5%] w-[50%] h-[50%] md:w-[35%] md:h-[35%] transition-colors duration-1000 blur-[80px] md:blur-[100px] rounded-full opacity-30 md:opacity-40 ${dayStatus === 'elevated' || missedCount > 0 || view === 'emergency' ? 'bg-rose-400' : 'bg-blue-400'}`}></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] md:w-[45%] md:h-[45%] bg-slate-200 blur-[100px] md:blur-[120px] rounded-full opacity-25 md:opacity-30"></div>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <Sidebar 
        currentView={view} 
        setView={handleSetView} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        dayStatus={dayStatus}
        missedMedsCount={missedCount}
      />
      
      <main className={`flex-1 relative z-10 transition-all duration-500 lg:ml-72 pb-32 lg:pb-12 ${view === 'emergency' ? 'bg-rose-50/30' : ''}`}>
        <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-4 py-3 lg:px-12 lg:py-6 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-600 rounded-xl active:bg-slate-100">
              <i className="fas fa-bars-staggered"></i>
            </button>
            <div>
              <p className="hidden xs:block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mono">Institutional Console</p>
              <h2 className="text-lg lg:text-xl font-bold text-slate-800 flex items-center gap-2 lg:gap-3">
                <span className="truncate max-w-[120px] sm:max-w-none">
                  {view === 'records' ? 'Medical Records' : 
                   view === 'meds' ? 'Pharmacy' : 
                   view === 'emergency' ? 'Crisis HUD' : 
                   view === 'profile' ? 'Patient Profile' : 'Monitor'}
                </span>
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-black mono tracking-widest ${dayStatus === 'elevated' || missedCount > 0 || view === 'emergency' ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-blue-100 text-blue-600'}`}>
                  {view === 'emergency' ? 'CRITICAL' : missedCount > 0 ? 'ALERT' : dayStatus === 'elevated' ? 'OBSERVE' : 'BASELINE'}
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleSetView('emergency')}
              className={`flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl shadow-sm border transition-all ${
                view === 'emergency' ? 'bg-rose-600 text-white border-rose-700' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <i className="fas fa-biohazard text-[10px] lg:text-xs"></i>
              <span className="text-[10px] font-black mono uppercase tracking-widest hidden sm:block">Emergency</span>
            </button>
          </div>
        </header>

        <div className="px-4 lg:px-12 py-6 lg:py-8">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            {view === 'dashboard' && <Dashboard tasks={tasks} moodData={MOOD_DATA} activities={activities} dayStatus={dayStatus} setDayStatus={setDayStatus} visits={visits} medications={medications} />}
            {view === 'routine' && <RoutineView tasks={tasks} toggleTask={toggleTask} />}
            {view === 'ai' && <AIInsights visits={visits} tasks={tasks} medications={medications} patientInfo={patientInfo} />}
            {view === 'activities' && <ActivitiesView activities={activities} isLoading={isLoadingActivities} />}
            {view === 'records' && <ClinicalRecordsView visits={visits} onAddVisit={addVisit} />}
            {view === 'meds' && <MedicationsView medications={medications} onUpdateStatus={updateMedicationStatus} onAddMedication={addMedication} />}
            {view === 'emergency' && <EmergencyHUD medications={medications} visits={visits} patientInfo={patientInfo} />}
            {view === 'profile' && <PatientProfileView patientInfo={patientInfo} setPatientInfo={setPatientInfo} />}
          </div>
        </div>

        {/* Floating Mobile Navigation */}
        <div className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] z-50">
          <div className="bg-white/90 backdrop-blur-2xl rounded-[24px] border border-slate-200/60 p-1.5 shadow-2xl flex items-center justify-between">
            {[
              { id: 'dashboard', icon: 'fa-chart-simple', label: 'Monitor' },
              { id: 'meds', icon: 'fa-pills', label: 'Meds' },
              { id: 'emergency', icon: 'fa-heart-pulse', label: 'SOS' },
              { id: 'profile', icon: 'fa-user-circle', label: 'Bio' }
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => handleSetView(nav.id as any)}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 transition-all duration-300 relative rounded-2xl ${
                  view === nav.id ? (nav.id === 'emergency' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600') : 'text-slate-400 hover:text-slate-600 active:scale-95'
                }`}
              >
                <i className={`fas ${nav.icon} text-base`}></i>
                {(nav.id === 'meds' && missedCount > 0) && (
                  <span className="absolute top-2.5 right-1/3 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white"></span>
                )}
                <span className="text-[8px] font-black uppercase tracking-tighter mono">{nav.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
