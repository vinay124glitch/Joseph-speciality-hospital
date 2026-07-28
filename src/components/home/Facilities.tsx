import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeading from '@/components/ui/SectionHeading';
import { FACILITIES } from '@/data/facilities';

export default function Facilities() {
  const { t } = useTranslation();

  return (
    <section className="section-pad bg-brand-gradient-soft dark:bg-slate-900">
      <div className="container-x">
        <SectionHeading
          eyebrow={t('facilities.eyebrow')}
          title={
            <>
              {t('facilities.modernAmenities')}{' '}
              <span className="gradient-text">{t('facilities.yourComfort')}</span>
            </>
          }
          subtitle={t('facilities.subtitle')}
        />

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {FACILITIES.map((facility, i) => (
            <motion.div
              key={facility.key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card p-4 flex flex-col items-center text-center card-hover group"
            >
              <div className="rounded-xl bg-gradient-to-br from-brand-50 to-teal-50 dark:from-slate-800 dark:to-slate-700 p-3 mb-3 group-hover:from-brand-600 group-hover:to-teal-500 transition-all">
                <facility.icon className="w-6 h-6 text-brand-600 dark:text-brand-400 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                {t(`facilities.${facility.key}`)}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
