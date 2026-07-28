import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Calendar,
  Phone,
  HeartPulse,
  ShieldCheck,
  Award,
  Users,
  ArrowRight,
  Play,
} from 'lucide-react';
import { HOSPITAL } from '@/utils/constants';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1920',
        }}
      />
      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="absolute top-20 right-20 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-brand-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="relative container-x py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge bg-white/15 text-teal-200 backdrop-blur-sm mb-5">
              <ShieldCheck className="w-3.5 h-3.5" /> {t('hero.trustedHealthcare')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
          >
            {t('meta.siteName')}
            <span className="block bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">
              {t('meta.siteNameFull').replace(t('meta.siteName'), '').trim() || 'Hospital'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg sm:text-xl text-blue-100/90 leading-relaxed max-w-xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link to="/appointment" className="btn-primary text-base px-7 py-3.5">
              <Calendar className="w-5 h-5" /> {t('hero.bookAppointment')}
            </Link>
            <a
              href={`tel:${HOSPITAL.phoneRaw}`}
              className="btn bg-red-600 text-white hover:bg-red-700 text-base px-7 py-3.5"
            >
              <Phone className="w-5 h-5" /> {t('hero.emergencyContact')}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex items-center gap-6 text-white"
          >
            {[
              { icon: Award, label: t('hero.years') },
              { icon: Users, label: t('hero.doctors') },
              { icon: HeartPulse, label: t('hero.emergency24x7') },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <item.icon className="w-5 h-5 text-teal-300" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />

      <Link
        to="/about"
        className="absolute bottom-8 right-8 hidden lg:flex items-center gap-2 text-sm text-white/80 hover:text-white transition group"
      >
        <span className="flex items-center gap-2">
          <span className="rounded-full bg-white/15 p-2 group-hover:bg-white/25 transition">
            <Play className="w-4 h-4" />
          </span>
          {t('hero.discoverStory')}
        </span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
