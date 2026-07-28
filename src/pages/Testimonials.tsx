import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import PageHeader, { CTASection } from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import { TESTIMONIALS } from '@/data/testimonials';

export default function TestimonialsPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        title={t('testimonials.storiesTrust') + ' ' + t('testimonials.trustRecovery')}
        subtitle={t('testimonials.subtitleReviews')}
        breadcrumb={t('nav.testimonials')}
      />

      <section className="section-pad bg-white dark:bg-slate-950">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('testimonials.eyebrowReviews')}
            title={
              <>
                {t('testimonials.storiesTrust')}{' '}
                <span className="gradient-text">{t('testimonials.trustRecovery')}</span>
              </>
            }
            subtitle={t('testimonials.subtitleReviews')}
          />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="card p-6 card-hover relative"
              >
                <Quote className="absolute top-5 right-5 w-10 h-10 text-brand-100 dark:text-slate-800" />
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${
                        idx < item.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm relative z-10">
                  "{item.quote}"
                </p>
                <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-100 dark:ring-slate-700"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.location} · {t(`departments.${item.treatmentKey}`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 max-w-md mx-auto text-center card p-8"
          >
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-7 h-7 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-4xl font-bold gradient-text">4.9 / 5</p>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {t('testimonials.basedOn')}
            </p>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
