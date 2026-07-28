export type GalleryItem = {
  key: string;
  categoryKey: string;
  image: string;
};

export const GALLERY: GalleryItem[] = [
  {
    key: 'operationTheatre',
    categoryKey: 'facilities',
    image:
      'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    key: 'laboratory',
    categoryKey: 'facilities',
    image:
      'https://images.pexels.com/photos/4021808/pexels-photo-4021808.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    key: 'reception',
    categoryKey: 'interiors',
    image:
      'https://images.pexels.com/photos/40568/medical-appointment-doctor-health-40568.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    key: 'patientRooms',
    categoryKey: 'interiors',
    image:
      'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    key: 'ourDoctors',
    categoryKey: 'team',
    image:
      'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    key: 'medicalEquipment',
    categoryKey: 'facilities',
    image:
      'https://images.pexels.com/photos/5732402/pexels-photo-5732402.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    key: 'waitingHall',
    categoryKey: 'interiors',
    image:
      'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    key: 'icu',
    categoryKey: 'facilities',
    image:
      'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export const GALLERY_CATEGORIES = ['all', 'facilities', 'interiors', 'team'];
