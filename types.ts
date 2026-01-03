
export interface Task {
  id: string;
  title: string;
  category: 'Hygiene' | 'Nutrition' | 'Medication' | 'Stimulation' | 'Other';
  time: string;
  isCompleted: boolean;
  description: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string; 
  frequency: string; 
  scheduledTime: string; 
  status: 'pending' | 'taken' | 'missed';
  notes?: string;
}

export interface Activity {
  title: string;
  description: string;
  benefit: string;
  duration: string;
}

export interface DoctorVisit {
  id: string;
  date: string;
  physician: string;
  specialty: string;
  notes: string;
  recommendations: string;
}

export interface MoodEntry {
  day: string;
  stability: number;
}

export interface PatientInfo {
  name: string;
  age: string;
  bloodType: string;
  allergies: string;
  conditions: string;
  dnrStatus: 'Active' | 'None' | 'Consult Physician';
  emergencyContact: string;
}
