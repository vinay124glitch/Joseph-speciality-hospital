import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import PageHeader, { CTASection } from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import { SERVICES } from '@/data/services';
import { FACILITIES } from '@/data/facilities';

export default function ServicesPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        title={t('nav.services')}
        subtitle={t('servicesPage.subtitle')}
        breadcrumb={t('nav.services')}
      />

      <section className="section-pad bg-white dark:bg-slate-950">
        <div className="container-x">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="card p-6 card-hover group"
              >
                <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-teal-50 dark:from-slate-800 dark:to-slate-700 p-4 w-fit mb-4 group-hover:from-brand-600 group-hover:to-teal-500 transition-all">
                  <service.icon className="w-8 h-8 text-brand-600 dark:text-brand-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                  {t(`services.${service.key}`)}
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t(`services.${service.key}Desc`)}
                </p>
                <Link
                  to="/appointment"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-2.5 transition-all"
                >
                  <Calendar className="w-4 h-4" /> {t('servicesPage.bookThisService')}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities included */}
      <section className="section-pad bg-brand-gradient-soft dark:bg-slate-900">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('servicesPage.facilities')}
            title={
              <>
                {t('servicesPage.amenitiesIncluded')}{' '}
                <span className="gradient-text">{t('servicesPage.yourCare')}</span>
              </>
            }
            subtitle={t('servicesPage.facilitiesSubtitle')}
          />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {FACILITIES.map((facility, i) => (
              <motion.div
                key={facility.key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
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
          <div className="text-center mt-10">
            <Link to="/appointment" className="btn-primary">
              {t('servicesPage.bookAppointment')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
