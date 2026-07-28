import {
  Stethoscope,
  BedDouble,
  Siren,
  ClipboardCheck,
  Syringe,
  FlaskConical,
  Waves,
  HeartPulse,
  Scissors,
  Pill,
  Ambulance,
  type LucideIcon,
} from 'lucide-react';

export type ServiceInfo = {
  key: string;
  icon: LucideIcon;
};

export const SERVICES: ServiceInfo[] = [
  { key: 'outpatientConsultation', icon: Stethoscope },
  { key: 'inpatientCare', icon: BedDouble },
  { key: 'emergencyCare', icon: Siren },
  { key: 'healthCheckups', icon: ClipboardCheck },
  { key: 'vaccination', icon: Syringe },
  { key: 'laboratoryServices', icon: FlaskConical },
  { key: 'ultrasound', icon: Waves },
  { key: 'ecg', icon: HeartPulse },
  { key: 'minorProcedures', icon: Scissors },
  { key: 'pharmacy', icon: Pill },
  { key: 'ambulanceService', icon: Ambulance },
];
