export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          benefit: string | null
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          benefit?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          benefit?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      doctor_visits: {
        Row: {
          created_at: string | null
          date: string | null
          id: string
          notes: string | null
          physician: string | null
          recommendations: string | null
          specialty: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          id?: string
          notes?: string | null
          physician?: string | null
          recommendations?: string | null
          specialty?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          id?: string
          notes?: string | null
          physician?: string | null
          recommendations?: string | null
          specialty?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      medications: {
        Row: {
          created_at: string | null
          dosage: string | null
          frequency: string | null
          id: string
          name: string
          notes: string | null
          scheduled_time: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          dosage?: string | null
          frequency?: string | null
          id?: string
          name: string
          notes?: string | null
          scheduled_time?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          dosage?: string | null
          frequency?: string | null
          id?: string
          name?: string
          notes?: string | null
          scheduled_time?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      mood_entries: {
        Row: {
          created_at: string | null
          date: string | null
          day: string | null
          id: string
          notes: string | null
          stability: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          day?: string | null
          id?: string
          notes?: string | null
          stability?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          day?: string | null
          id?: string
          notes?: string | null
          stability?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      patients: {
        Row: {
          age: string | null
          allergies: string | null
          blood_type: string | null
          conditions: string | null
          created_at: string | null
          dnr_status: string | null
          emergency_contact: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          age?: string | null
          allergies?: string | null
          blood_type?: string | null
          conditions?: string | null
          created_at?: string | null
          dnr_status?: string | null
          emergency_contact?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          age?: string | null
          allergies?: string | null
          blood_type?: string | null
          conditions?: string | null
          created_at?: string | null
          dnr_status?: string | null
          emergency_contact?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          is_completed: boolean | null
          time: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          time?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          time?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
