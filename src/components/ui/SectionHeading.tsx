import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  light = false,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}
    >
      {eyebrow && (
        <span
          className={`badge mb-3 ${
            light
              ? 'bg-white/15 text-teal-200'
              : 'bg-teal-50 text-teal-600 dark:bg-teal-900/40 dark:text-teal-300'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl font-bold leading-tight ${
          light ? 'text-white' : 'text-slate-900 dark:text-white'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            light ? 'text-blue-100/90' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
