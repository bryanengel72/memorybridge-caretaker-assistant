import { supabase } from '../lib/supabase';
import { Task, Medication, PatientInfo, DoctorVisit, Activity, MoodEntry } from '../types';
import { Database } from '../types/database.types';

type TaskRow = Database['public']['Tables']['tasks']['Row'];
type MedicationRow = Database['public']['Tables']['medications']['Row'];
type PatientRow = Database['public']['Tables']['patients']['Row'];
type VisitRow = Database['public']['Tables']['doctor_visits']['Row'];
type ActivityRow = Database['public']['Tables']['activities']['Row'];
type MoodRow = Database['public']['Tables']['mood_entries']['Row'];

// --- TASKS ---

export const getTasks = async (): Promise<Task[]> => {
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) throw error;
    return (data as TaskRow[]).map(mapTaskFromDB);
};

export const updateTaskStatus = async (id: string, isCompleted: boolean): Promise<void> => {
    const { error } = await supabase
        .from('tasks')
        .update({ is_completed: isCompleted })
        .eq('id', id);

    if (error) throw error;
};

const mapTaskFromDB = (row: TaskRow): Task => ({
    id: row.id,
    title: row.title,
    category: row.category as any,
    time: row.time || '',
    isCompleted: row.is_completed || false,
    description: row.description || '',
});

// --- MEDICATIONS ---

export const getMedications = async (): Promise<Medication[]> => {
    const { data, error } = await supabase
        .from('medications')
        .select('*')
        .order('scheduled_time', { ascending: true });

    if (error) throw error;
    return (data as MedicationRow[]).map(mapMedicationFromDB);
};

export const updateMedicationStatus = async (id: string, status: 'taken' | 'pending' | 'missed'): Promise<void> => {
    const { error } = await supabase
        .from('medications')
        .update({ status })
        .eq('id', id);

    if (error) throw error;
};

export const addMedication = async (med: Omit<Medication, 'id'>): Promise<Medication> => {
    const { data, error } = await supabase
        .from('medications')
        .insert({
            name: med.name,
            dosage: med.dosage,
            frequency: med.frequency,
            scheduled_time: med.scheduledTime,
            status: med.status,
            notes: med.notes
        })
        .select()
        .single();

    if (error) throw error;
    return mapMedicationFromDB(data);
};

const mapMedicationFromDB = (row: MedicationRow): Medication => ({
    id: row.id,
    name: row.name,
    dosage: row.dosage || '',
    frequency: row.frequency || '',
    scheduledTime: row.scheduled_time || '',
    status: (row.status as 'taken' | 'pending' | 'missed') || 'pending',
    notes: row.notes || undefined,
});

// --- PATIENT INFO ---

export const getPatientInfo = async (): Promise<PatientInfo | null> => {
    const { data, error } = await supabase
        .from('patients')
        .select('*')
        .limit(1)
        .maybeSingle();

    if (error) throw error;
    if (!data) return null;
    return mapPatientFromDB(data);
};

export const updatePatientInfo = async (info: PatientInfo): Promise<void> => {
    // Check if exists
    const existing = await getPatientInfo();

    if (existing) {
        const { error } = await supabase
            .from('patients')
            .update({
                name: info.name,
                age: info.age,
                blood_type: info.bloodType,
                allergies: info.allergies,
                conditions: info.conditions,
                dnr_status: info.dnrStatus,
                emergency_contact: info.emergencyContact
            })
            .neq('id', '00000000-0000-0000-0000-000000000000'); // Hack to update all (should be by user_id)
        if (error) throw error;
    } else {
        const { error } = await supabase
            .from('patients')
            .insert({
                name: info.name,
                age: info.age,
                blood_type: info.bloodType,
                allergies: info.allergies,
                conditions: info.conditions,
                dnr_status: info.dnrStatus,
                emergency_contact: info.emergencyContact
            });
        if (error) throw error;
    }
};


const mapPatientFromDB = (row: PatientRow): PatientInfo => ({
    name: row.name,
    age: row.age || '',
    bloodType: row.blood_type || '',
    allergies: row.allergies || '',
    conditions: row.conditions || '',
    dnrStatus: (row.dnr_status as any) || 'None',
    emergencyContact: row.emergency_contact || '',
});

// --- DOCTOR VISITS ---

export const getVisits = async (): Promise<DoctorVisit[]> => {
    const { data, error } = await supabase
        .from('doctor_visits')
        .select('*')
        .order('date', { ascending: false });

    if (error) throw error;
    return (data as VisitRow[]).map(mapVisitFromDB);
};

export const addVisit = async (visit: Omit<DoctorVisit, 'id'>): Promise<DoctorVisit> => {
    const { data, error } = await supabase
        .from('doctor_visits')
        .insert({
            date: visit.date,
            physician: visit.physician,
            specialty: visit.specialty,
            notes: visit.notes,
            recommendations: visit.recommendations
        })
        .select()
        .single();

    if (error) throw error;
    return mapVisitFromDB(data);
};

const mapVisitFromDB = (row: VisitRow): DoctorVisit => ({
    id: row.id,
    date: row.date || '',
    physician: row.physician || '',
    specialty: row.specialty || '',
    notes: row.notes || '',
    recommendations: row.recommendations || '',
});

// --- ACTIVITY ---

// Activities are currently generated by AI, but we can store them too if needed.
// For now, we'll keep the AI generation but maybe fetch defaults from DB if AI fails?
// Or maybe saving the generated ones? 
// Let's stick to reading/writing if the view requires it. The current App uses `generateDailyStimulation`.
// But we created an `activities` table. Let's provide a get/add for it.

export const getStoredActivities = async (): Promise<Activity[]> => {
    const { data, error } = await supabase.from('activities').select('*');
    if (error) throw error;
    return (data as ActivityRow[]).map(row => ({
        title: row.title,
        description: row.description || '',
        benefit: row.benefit || '',
        duration: row.duration || ''
    }));
}

// --- MOOD ---

export const getMoodData = async (): Promise<MoodEntry[]> => {
    const { data, error } = await supabase.from('mood_entries').select('*').order('date', { ascending: true }).limit(7);
    if (error) throw error;
    return (data as MoodRow[]).map(row => ({
        day: row.day || '',
        stability: row.stability || 0
    }));
}

