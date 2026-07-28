export type HealthTip = {
  key: string;
  image: string;
};

export const HEALTH_TIPS: HealthTip[] = [
  {
    key: 'stayHydrated',
    image:
      'https://images.pexels.com/photos/4474038/pexels-photo-4474038.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    key: 'exerciseRegularly',
    image:
      'https://images.pexels.com/photos/4498294/pexels-photo-4498294.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    key: 'balancedDiet',
    image:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    key: 'qualitySleep',
    image:
      'https://images.pexels.com/photos/2631167/pexels-photo-2631167.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

export const STATS = [
  { labelKey: 'yearsOfService', value: 25, suffix: '+' },
  { labelKey: 'expertDoctors', value: 40, suffix: '+' },
  { labelKey: 'patientsTreated', value: 100000, suffix: '+' },
  { labelKey: 'departments', value: 16, suffix: '' },
  { labelKey: 'satisfiedPatients', value: 98, suffix: '%' },
  { labelKey: 'emergencyServices', value: 24, suffix: '×7' },
];
