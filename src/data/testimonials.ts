export type Testimonial = {
  name: string;
  location: string;
  rating: number;
  quote: string;
  treatmentKey: string;
  image: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Karthik R',
    location: 'Srivilliputhur',
    rating: 5,
    quote:
      'The doctors were extremely patient and explained everything clearly. The hospital is clean and the staff treated us with great care during my mother\u2019s surgery.',
    treatmentKey: 'generalSurgery',
    image:
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Priya S',
    location: 'Rajapalayam',
    rating: 5,
    quote:
      'Excellent maternity care. The gynecology team made my entire pregnancy journey smooth and stress-free. Highly recommend Joseph Speciality Hospital.',
    treatmentKey: 'obstetrics',
    image:
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Mohammed A',
    location: 'Sivakasi',
    rating: 5,
    quote:
      'Brought my father during a cardiac emergency at night. The response was immediate and the doctor saved his life. Forever grateful to the emergency team.',
    treatmentKey: 'cardiology',
    image:
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Lakshmi N',
    location: 'Srivilliputhur',
    rating: 5,
    quote:
      'My diabetes is finally under control thanks to the diabetology department. Personalised diet advice and regular follow-ups made all the difference.',
    treatmentKey: 'diabetology',
    image:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Senthil V',
    location: 'Watrap',
    rating: 5,
    quote:
      'After my knee replacement, the physiotherapy team helped me walk again without pain. Professional, caring, and modern facilities throughout.',
    treatmentKey: 'orthopedics',
    image:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Anjali K',
    location: 'Tirunelveli',
    rating: 5,
    quote:
      'Took my daughter for a persistent fever. The pediatrician was so gentle and reassuring. Quick diagnosis and she recovered in two days.',
    treatmentKey: 'pediatrics',
    image:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];
