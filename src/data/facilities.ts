import {
  Accessibility,
  ParkingCircle,
  Siren,
  Stethoscope,
  HeartPulse,
  FlaskConical,
  Pill,
  CreditCard,
  Banknote,
  Sofa,
  Sparkles,
  Clock,
  type LucideIcon,
} from 'lucide-react';

export type Facility = {
  key: string;
  icon: LucideIcon;
};

export const FACILITIES: Facility[] = [
  { key: 'wheelchairEntrance', icon: Accessibility },
  { key: 'wheelchairParking', icon: ParkingCircle },
  { key: 'emergencyWard', icon: Siren },
  { key: 'operationTheatre', icon: Stethoscope },
  { key: 'icu', icon: HeartPulse },
  { key: 'laboratory', icon: FlaskConical },
  { key: 'pharmacy', icon: Pill },
  { key: 'digitalPayments', icon: CreditCard },
  { key: 'cardPayments', icon: Banknote },
  { key: 'waitingLounge', icon: Sofa },
  { key: 'cleanRooms', icon: Sparkles },
  { key: 'emergencySupport', icon: Clock },
];
