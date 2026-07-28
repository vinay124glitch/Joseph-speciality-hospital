import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { TESTIMONIALS } from '@/data/testimonials';
import { Link } from 'react-router-dom';

export default function TestimonialsCarousel() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % TESTIMONIALS.length),
    [],
  );
  const prev = () =>
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const active = TESTIMONIALS[index];

  return (
    <section
      className="section-pad bg-white dark:bg-slate-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-x">
        <SectionHeading
          eyebrow={t('testimonials.eyebrow')}
          title={
            <>
              {t('testimonials.whatPatientsSay')}{' '}
              <span className="gradient-text">{t('testimonials.patientsSay')}</span>
            </>
          }
          subtitle={t('testimonials.subtitle')}
        />

        <div className="mt-12 max-w-4xl mx-auto relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-600 to-teal-500 p-4 text-white shadow-glow z-10">
            <Quote className="w-7 h-7" />
          </div>

          <div className="card p-8 sm:p-12 pt-14 min-h-[280px] flex flex-col items-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <img
                  src={active.image}
                  alt={active.name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-teal-100 dark:ring-slate-700"
                  loading="lazy"
                />
                <div className="flex gap-0.5 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < active.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed italic max-w-2xl">
                  "{active.quote}"
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {active.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {active.location} · {t(`departments.${active.treatmentKey}`)}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-5 rounded-full bg-white dark:bg-slate-800 shadow-md p-2.5 text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-700 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-5 rounded-full bg-white dark:bg-slate-800 shadow-md p-2.5 text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-700 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? 'w-8 bg-brand-600'
                    : 'w-2 bg-slate-300 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/testimonials"
            className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            {t('testimonials.readMoreStories')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
