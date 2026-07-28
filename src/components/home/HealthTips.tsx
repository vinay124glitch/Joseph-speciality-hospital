import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { HEALTH_TIPS } from '@/data/content';

export default function HealthTips() {
  const { t } = useTranslation();

  return (
    <section className="section-pad bg-white dark:bg-slate-950">
      <div className="container-x">
        <SectionHeading
          eyebrow={t('healthTips.eyebrow')}
          title={
            <>
              {t('healthTips.wellnessAdvice')}{' '}
              <span className="gradient-text">{t('healthTips.healthyLiving')}</span>
            </>
          }
          subtitle={t('healthTips.subtitle')}
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HEALTH_TIPS.map((tip, i) => (
            <motion.div
              key={tip.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card overflow-hidden card-hover group"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={tip.image}
                  alt={t(`healthTips.${tip.key}`)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
              </div>
              <div className="p-5">
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  {t(`healthTips.${tip.key}`)}
                </h4>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t(`healthTips.${tip.key}Desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/blog" className="btn-secondary">
            {t('healthTips.readHealthBlog')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
