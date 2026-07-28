import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope } from 'lucide-react';
import PageHeader, { CTASection } from '@/components/ui/PageHeader';
import { DEPARTMENTS_INFO } from '@/data/departments';

export default function DepartmentsPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        title={t('departments.title')}
        subtitle={t('departments.subtitle')}
        breadcrumb={t('nav.departments')}
      />

      <section className="section-pad bg-white dark:bg-slate-950">
        <div className="container-x">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS_INFO.map((dept, i) => (
              <motion.div
                key={dept.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="card p-6 card-hover group"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-teal-500 p-3 text-white shadow-md group-hover:scale-110 transition-transform">
                    <dept.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                    {t(`departments.${dept.key}`)}
                  </h3>
                </div>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t(`departments.${dept.key}Desc`)}
                </p>
                <Link
                  to="/appointment"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-2.5 transition-all"
                >
                  <Stethoscope className="w-4 h-4" /> {t('departments.learnMore')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
