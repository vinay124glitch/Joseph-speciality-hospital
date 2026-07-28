import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { SERVICES } from '@/data/services';

export default function ServicesOverview() {
  const { t } = useTranslation();

  return (
    <section className="section-pad bg-white dark:bg-slate-950">
      <div className="container-x">
        <SectionHeading
          eyebrow={t('servicesOverview.eyebrow')}
          title={
            <>
              {t('servicesOverview.comprehensiveCare')}{' '}
              <span className="gradient-text">{t('servicesOverview.oneRoof')}</span>
            </>
          }
          subtitle={t('servicesOverview.subtitle')}
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES.slice(0, 8).map((service, i) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="card p-5 card-hover group"
            >
              <div className="rounded-xl bg-teal-50 dark:bg-slate-800 p-3 w-fit mb-4 group-hover:bg-brand-600 transition-colors">
                <service.icon className="w-6 h-6 text-teal-600 dark:text-teal-400 group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100">
                {t(`services.${service.key}`)}
              </h4>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                {t(`services.${service.key}Desc`)}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/services" className="btn-secondary">
            {t('servicesOverview.viewAllServices')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
