import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Clock, Calendar, Search, Stethoscope } from 'lucide-react';
import PageHeader, { CTASection } from '@/components/ui/PageHeader';
import { supabase, type Doctor } from '@/utils/supabase';
import { DEPARTMENTS } from '@/utils/constants';

export default function DoctorsPage() {
  const { t } = useTranslation();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState('all');

  useEffect(() => {
    supabase
      .from('doctors')
      .select('*')
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        setDoctors(data || []);
        setLoading(false);
      });
  }, []);

  const filtered = doctors.filter((d) => {
    const matchesQuery =
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialization.toLowerCase().includes(query.toLowerCase());
    const matchesDept = dept === 'all' || d.department === dept;
    return matchesQuery && matchesDept;
  });

  return (
    <>
      <PageHeader
        title={t('nav.doctors')}
        subtitle={t('doctorsPage.subtitle')}
        breadcrumb={t('nav.doctors')}
      />

      <section className="section-pad bg-white dark:bg-slate-950">
        <div className="container-x">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder={t('doctorsPage.searchPlaceholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input-field pl-12"
              />
            </div>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="input-field sm:w-56"
            >
              <option value="all">{t('doctorsPage.allDepartments')}</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {t(`departments.${d}`)}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mt-4 w-2/3 mx-auto" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded mt-2 w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-slate-500 py-12">
              {t('doctorsPage.noDoctors')}
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
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
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                      {doc.specialization}
                    </p>
                    {doc.bio && (
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 leading-relaxed line-clamp-2">
                        {doc.bio}
                      </p>
                    )}
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
                      className="mt-4 btn-primary w-full text-sm py-2.5"
                    >
                      <Calendar className="w-4 h-4" /> {t('featuredDoctors.bookAppointment')}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
