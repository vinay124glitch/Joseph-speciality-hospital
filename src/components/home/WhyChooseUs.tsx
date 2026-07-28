import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Stethoscope,
  HeartHandshake,
  Microscope,
  Sparkles,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

export default function WhyChooseUs() {
  const { t } = useTranslation();

  const reasons = [
    { icon: Stethoscope, titleKey: 'whyChooseUs.experiencedDoctors', textKey: 'whyChooseUs.experiencedDoctorsText' },
    { icon: HeartHandshake, titleKey: 'whyChooseUs.compassionateCare', textKey: 'whyChooseUs.compassionateCareText' },
    { icon: Microscope, titleKey: 'whyChooseUs.modernEquipment', textKey: 'whyChooseUs.modernEquipmentText' },
    { icon: Sparkles, titleKey: 'whyChooseUs.cleanHygienic', textKey: 'whyChooseUs.cleanHygienicText' },
  ];

  return (
    <section className="section-pad bg-brand-gradient-soft dark:bg-slate-900">
      <div className="container-x">
        <SectionHeading
          eyebrow={t('whyChooseUs.eyebrow')}
          title={
            <>
              {t('whyChooseUs.trustedByThousands')}{' '}
              <span className="gradient-text">{t('whyChooseUs.families')}</span>
            </>
          }
          subtitle={t('whyChooseUs.subtitle')}
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-6 text-center card-hover group"
            >
              <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 to-teal-500 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                <reason.icon className="w-7 h-7" />
              </div>
              <h4 className="mt-4 font-semibold text-slate-800 dark:text-slate-100">
                {t(reason.titleKey)}
              </h4>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t(reason.textKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
