import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Stethoscope, Award, Clock, ArrowRight, Calendar } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { supabase, type Doctor } from '@/utils/supabase';

export default function FeaturedDoctors() {
  const { t } = useTranslation();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('doctors')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(4)
      .then(({ data }) => {
        setDoctors(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <section className="section-pad bg-brand-gradient-soft dark:bg-slate-900">
      <div className="container-x">
        <SectionHeading
          eyebrow={t('featuredDoctors.eyebrow')}
          title={
            <>
              {t('featuredDoctors.meetExpertDoctors')}{' '}
              <span className="gradient-text">{t('featuredDoctors.expertDoctors')}</span>
            </>
          }
          subtitle={t('featuredDoctors.subtitle')}
        />

        {loading ? (
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card p-6 animate-pulse">
                <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mt-4 w-2/3 mx-auto" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded mt-2 w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card overflow-hidden card-hover group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={doc.image_url || 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=500'}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  <span className="absolute bottom-3 left-3 badge bg-teal-500/90 text-white">
                    <Stethoscope className="w-3 h-3" /> {t(`departments.${doc.department}`)}
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {doc.name}
                  </h4>
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-medium mt-0.5">
                    {doc.qualifications}
                  </p>
                  <div className="mt-3 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <p className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-teal-500" />
                      {doc.experience} {t('featuredDoctors.yearsExperience')}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-500" />
                      {doc.available_days}
                    </p>
                  </div>
                  <Link
                    to="/appointment"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-2.5 transition-all"
                  >
                    <Calendar className="w-4 h-4" /> {t('featuredDoctors.bookAppointment')}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/doctors" className="btn-secondary">
            {t('featuredDoctors.viewAllDoctors')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
