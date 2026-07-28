import {
  Stethoscope,
  Scissors,
  Bone,
  Baby,
  HeartPulse,
  Heart,
  Activity,
  Droplets,
  Sparkles,
  Ear,
  Brain,
  Droplet,
  Dumbbell,
  Siren,
  FlaskConical,
  Pill,
  type LucideIcon,
} from 'lucide-react';

export type DepartmentInfo = {
  key: string;
  icon: LucideIcon;
};

export const DEPARTMENTS_INFO: DepartmentInfo[] = [
  { key: 'generalMedicine', icon: Stethoscope },
  { key: 'generalSurgery', icon: Scissors },
  { key: 'orthopedics', icon: Bone },
  { key: 'gynecology', icon: Baby },
  { key: 'obstetrics', icon: Heart },
  { key: 'pediatrics', icon: HeartPulse },
  { key: 'diabetology', icon: Activity },
  { key: 'cardiology', icon: HeartPulse },
  { key: 'dermatology', icon: Sparkles },
  { key: 'ent', icon: Ear },
  { key: 'neurology', icon: Brain },
  { key: 'urology', icon: Droplet },
  { key: 'physiotherapy', icon: Dumbbell },
  { key: 'emergencyCare', icon: Siren },
  { key: 'laboratoryDept', icon: FlaskConical },
  { key: 'pharmacyDept', icon: Pill },
];
