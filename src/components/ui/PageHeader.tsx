import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { HOSPITAL } from '@/utils/constants';

export default function PageHeader({
  title,
  subtitle,
  breadcrumb,
  image,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  image?: string;
}) {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            image ||
            'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1600'
          })`,
        }}
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative container-x py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <nav className="flex items-center gap-2 text-sm text-blue-100/80 mb-4">
            <Link to="/" className="hover:text-white transition">
              {t('pageHeader.home')}
            </Link>
            <span>/</span>
            <span className="text-white">{breadcrumb || title}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg text-blue-100/90 leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>

      <div className="relative container-x pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: MapPin, label: t('pageHeader.visitUs'), value: t(HOSPITAL.addressKey) },
            { icon: Phone, label: t('pageHeader.callUs'), value: HOSPITAL.phone },
            { icon: Clock, label: t('pageHeader.opdHours'), value: t(HOSPITAL.hoursKey) },
          ].map((item) => (
            <div
              key={item.label}
              className="glass rounded-2xl p-5 flex items-start gap-3"
            >
              <div className="rounded-xl bg-brand-600/90 p-2.5 text-white shrink-0">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-brand-200 uppercase tracking-wide">
                  {item.label}
                </p>
                <p className="text-sm text-white mt-0.5 leading-snug">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="section-pad">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-700 to-teal-600 px-6 py-12 sm:px-12 sm:py-16 text-center"
        >
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-teal-300/20 rounded-full blur-2xl" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {t('cta.title')}
            </h2>
            <p className="mt-4 text-blue-100/90 max-w-xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <Link
              to="/appointment"
              className="btn bg-white text-brand-700 hover:bg-brand-50 mt-8"
            >
              {t('cta.bookAppointment')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
