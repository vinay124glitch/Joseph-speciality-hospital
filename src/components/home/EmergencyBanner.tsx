import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Phone, Siren, Clock } from 'lucide-react';
import { HOSPITAL } from '@/utils/constants';

export default function EmergencyBanner() {
  const { t } = useTranslation();

  return (
    <section className="py-12 bg-red-600 relative overflow-hidden">
      <div className="absolute -right-10 top-0 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 text-white"
        >
          <div className="flex items-center gap-4">
            <div className="relative rounded-2xl bg-white/15 p-4">
              <span className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse-ring" />
              <Siren className="w-8 h-8 relative" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{t('emergencyBanner.title')}</h3>
              <p className="text-red-100 mt-1">{t('emergencyBanner.subtitle')}</p>
            </div>
          </div>

          <a
            href={`tel:${HOSPITAL.phoneRaw}`}
            className="btn bg-white text-red-600 hover:bg-red-50 text-lg px-8 py-4 shrink-0"
          >
            <Phone className="w-5 h-5" /> {HOSPITAL.phone}
          </a>
        </motion.div>

        <div className="mt-6 flex items-center gap-2 text-red-100 text-sm">
          <Clock className="w-4 h-4" />
          <span>{t('emergencyBanner.ambulanceAvailable')}</span>
        </div>
      </div>
    </section>
  );
}
