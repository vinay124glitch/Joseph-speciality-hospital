import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  HeartPulse,
  Target,
  Eye,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

export default function About() {
  const { t } = useTranslation();

  const highlights = [
    'about.nabhProtocols',
    'about.compassionateCare',
    'about.affordablePricing',
    'about.servingSince',
  ];

  return (
    <section id="about" className="section-pad bg-white dark:bg-slate-950">
      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=500"
              alt="Hospital room"
              className="rounded-2xl object-cover h-56 w-full shadow-card"
              loading="lazy"
            />
            <img
              src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=500"
              alt="Doctor with patient"
              className="rounded-2xl object-cover h-56 w-full mt-8 shadow-card"
              loading="lazy"
            />
            <img
              src="https://images.pexels.com/photos/4021808/pexels-photo-4021808.jpeg?auto=compress&cs=tinysrgb&w=500"
              alt="Laboratory"
              className="rounded-2xl object-cover h-56 w-full shadow-card"
              loading="lazy"
            />
            <img
              src="https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=500"
              alt="ICU"
              className="rounded-2xl object-cover h-56 w-full mt-8 shadow-card"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl bg-gradient-to-r from-brand-600 to-teal-500 p-5 text-white shadow-glow hidden sm:block">
            <p className="text-3xl font-bold">25+</p>
            <p className="text-sm text-blue-100">{t('counters.yearsOfService')}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow={t('about.aboutUs')}
            center={false}
            title={
              <>
                {t('about.dedicatedToHealing')}{' '}
                <span className="gradient-text">{t('about.compassion')}</span>
              </>
            }
            subtitle={t('about.aboutDesc')}
          />

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {[
              { icon: Target, titleKey: 'about.ourMission', textKey: 'about.missionText' },
              { icon: Eye, titleKey: 'about.ourVision', textKey: 'about.visionText' },
            ].map((item) => (
              <div key={item.titleKey} className="card p-5 card-hover">
                <div className="rounded-xl bg-brand-50 dark:bg-slate-800 p-2.5 w-fit mb-3">
                  <item.icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-100">
                  {t(item.titleKey)}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {t(item.textKey)}
                </p>
              </div>
            ))}
          </div>

          <ul className="mt-6 grid sm:grid-cols-2 gap-2.5">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                {t(h)}
              </li>
            ))}
          </ul>

          <Link to="/about" className="btn-secondary mt-8">
            {t('about.readFullStory')} <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
