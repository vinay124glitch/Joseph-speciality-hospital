import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type Doctor = {
  id: string;
  name: string;
  qualifications: string;
  specialization: string;
  experience: number;
  department: string;
  available_days: string;
  image_url: string | null;
  bio: string | null;
  created_at?: string;
};

export type AppointmentStatus =
  | 'pending'
  | 'approved'
  | 'rescheduled'
  | 'cancelled'
  | 'completed';

export type Appointment = {
  id: string;
  patient_name: string;
  phone: string;
  email: string | null;
  age: number | null;
  gender: string | null;
  department: string;
  doctor: string | null;
  appointment_date: string;
  preferred_time: string;
  reason: string | null;
  status: AppointmentStatus;
  admin_notes: string | null;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  category: string;
  author: string;
  published: boolean;
  created_at: string;
};
