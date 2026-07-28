import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Target,
  Eye,
  Heart,
  ShieldCheck,
  HandHeart,
  Sparkles,
  Award,
  Stethoscope,
  Microscope,
} from 'lucide-react';
import PageHeader, { CTASection } from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedCounters from '@/components/home/AnimatedCounters';

export default function AboutPage() {
  const { t } = useTranslation();

  const values = [
    { icon: Heart, titleKey: 'aboutPage.compassion', textKey: 'aboutPage.compassionText' },
    { icon: ShieldCheck, titleKey: 'aboutPage.integrity', textKey: 'aboutPage.integrityText' },
    { icon: Award, titleKey: 'aboutPage.excellence', textKey: 'aboutPage.excellenceText' },
    { icon: HandHeart, titleKey: 'aboutPage.accessibility', textKey: 'aboutPage.accessibilityText' },
  ];

  const trust = [
    { icon: Stethoscope, titleKey: 'aboutPage.experiencedDoctors', textKey: 'aboutPage.experiencedDoctorsText' },
    { icon: HandHeart, titleKey: 'aboutPage.compassionateCare', textKey: 'aboutPage.compassionateCareText' },
    { icon: Microscope, titleKey: 'aboutPage.modernEquipment', textKey: 'aboutPage.modernEquipmentText' },
    { icon: Sparkles, titleKey: 'aboutPage.cleanHygienic', textKey: 'aboutPage.cleanHygienicText' },
  ];

  const history = [
    { yearKey: 'aboutPage.history1999', titleKey: 'aboutPage.history1999Title', textKey: 'aboutPage.history1999Text' },
    { yearKey: 'aboutPage.history2007', titleKey: 'aboutPage.history2007Title', textKey: 'aboutPage.history2007Text' },
    { yearKey: 'aboutPage.history2015', titleKey: 'aboutPage.history2015Title', textKey: 'aboutPage.history2015Text' },
    { yearKey: 'aboutPage.historyToday', titleKey: 'aboutPage.historyTodayTitle', textKey: 'aboutPage.historyTodayText' },
  ];

  const infra = [
    'aboutPage.modernOT',
    'aboutPage.equippedICU',
    'aboutPage.advancedLab',
    'aboutPage.comfortableRooms',
    'aboutPage.emergencyDept',
    'aboutPage.wheelchairAccess',
  ];

  return (
    <>
      <PageHeader
        title={t('about.aboutUs')}
        subtitle={t('aboutPage.subtitle')}
        breadcrumb={t('nav.about')}
      />

      {/* Overview */}
      <section className="section-pad bg-white dark:bg-slate-950">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt={t('meta.siteNameFull')}
              className="rounded-3xl shadow-card object-cover w-full h-[420px]"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              eyebrow={t('aboutPage.hospitalOverview')}
              center={false}
              title={
                <>
                  {t('aboutPage.servingCommunity')}{' '}
                  <span className="gradient-text">{t('aboutPage.dedication')}</span>
                </>
              }
            />
            <div className="mt-5 space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>{t('aboutPage.overviewP1')}</p>
              <p>{t('aboutPage.overviewP2')}</p>
              <p>{t('aboutPage.overviewP3')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatedCounters />

      {/* Mission & Vision */}
      <section className="section-pad bg-brand-gradient-soft dark:bg-slate-900">
        <div className="container-x grid md:grid-cols-2 gap-6">
          {[
            { icon: Target, title: t('about.ourMission'), text: t('about.missionText') },
            { icon: Eye, title: t('about.ourVision'), text: t('about.visionText') },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card p-8"
            >
              <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-teal-500 p-3 w-fit mb-4 text-white">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="section-pad bg-white dark:bg-slate-950">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('aboutPage.ourValues')}
            title={
              <>
                {t('aboutPage.principlesGuide')} <span className="gradient-text">{t('aboutPage.guideUs')}</span>
              </>
            }
            subtitle={t('aboutPage.valuesSubtitle')}
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.titleKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="card p-6 text-center card-hover group"
              >
                <div className="mx-auto w-14 h-14 rounded-2xl bg-teal-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-brand-600 transition-colors">
                  <value.icon className="w-7 h-7 text-teal-600 dark:text-teal-400 group-hover:text-white transition-colors" />
                </div>
                <h4 className="mt-4 font-semibold text-slate-900 dark:text-white">
                  {t(value.titleKey)}
                </h4>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t(value.textKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section-pad bg-brand-gradient-soft dark:bg-slate-900">
        <div className="container-x max-w-4xl">
          <SectionHeading
            eyebrow={t('aboutPage.ourJourney')}
            title={
              <>
                {t('aboutPage.legacyCaring')} <span className="gradient-text">{t('aboutPage.caring')}</span>
              </>
            }
          />
          <div className="mt-12 relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-brand-200 dark:bg-slate-700 -translate-x-1/2" />
            {history.map((item, i) => (
              <motion.div
                key={item.yearKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
                className={`relative flex gap-6 mb-8 ${
                  i % 2 === 0 ? 'sm:flex-row-reverse sm:text-right' : ''
                }`}
              >
                <div className="hidden sm:block w-1/2" />
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-600 ring-4 ring-brand-100 dark:ring-slate-800 z-10" />
                <div className="ml-12 sm:ml-0 sm:w-1/2 card p-5">
                  <span className="badge bg-brand-600 text-white">{t(item.yearKey)}</span>
                  <h4 className="mt-2 font-semibold text-slate-900 dark:text-white">
                    {t(item.titleKey)}
                  </h4>
                  <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {t(item.textKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why trust us */}
      <section className="section-pad bg-white dark:bg-slate-950">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('aboutPage.whyPatientsTrust')}
            title={
              <>
                {t('aboutPage.keyDifferentiators')} <span className="gradient-text">{t('aboutPage.differentiators')}</span>
              </>
            }
            subtitle={t('aboutPage.trustSubtitle')}
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trust.map((item, i) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="card p-6 card-hover group"
              >
                <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-teal-500 p-3 w-fit mb-4 text-white group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  {t(item.titleKey)}
                </h4>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t(item.textKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="section-pad bg-brand-gradient-soft dark:bg-slate-900">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <img src="https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=400" alt={t('facilities.icu')} className="rounded-2xl object-cover h-44 w-full shadow-card" loading="lazy" />
            <img src="https://images.pexels.com/photos/4021808/pexels-photo-4021808.jpeg?auto=compress&cs=tinysrgb&w=400" alt={t('facilities.laboratory')} className="rounded-2xl object-cover h-44 w-full mt-6 shadow-card" loading="lazy" />
            <img src="https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=400" alt={t('facilities.waitingLounge')} className="rounded-2xl object-cover h-44 w-full shadow-card" loading="lazy" />
            <img src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400" alt={t('facilities.cleanRooms')} className="rounded-2xl object-cover h-44 w-full mt-6 shadow-card" loading="lazy" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              eyebrow={t('aboutPage.infrastructure')}
              center={false}
              title={
                <>
                  {t('aboutPage.builtForHealing')} <span className="gradient-text">{t('aboutPage.healing')}</span>
                </>
              }
              subtitle={t('aboutPage.infrastructureSubtitle')}
            />
            <ul className="mt-6 space-y-3">
              {infra.map((key) => (
                <li key={key} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300">
                  <ShieldCheck className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                  {t(key)}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
