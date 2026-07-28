import { useTranslation } from 'react-i18next';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ServicesOverview from '@/components/home/ServicesOverview';
import FeaturedDoctors from '@/components/home/FeaturedDoctors';
import AnimatedCounters from '@/components/home/AnimatedCounters';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import Facilities from '@/components/home/Facilities';
import HealthTips from '@/components/home/HealthTips';
import EmergencyBanner from '@/components/home/EmergencyBanner';
import SectionHeading from '@/components/ui/SectionHeading';
import FaqAccordion from '@/components/ui/FaqAccordion';
import Newsletter from '@/components/ui/Newsletter';
import { CTASection } from '@/components/ui/PageHeader';
import { FAQ_KEYS } from '@/data/content';

export default function Home() {
  const { t } = useTranslation();

  const faqItems = FAQ_KEYS.map((key) => ({
    q: t(`faq.${key}`),
    a: t(`faq.a${key.slice(1)}`),
  }));

  return (
    <>
      <Hero />
      <About />
      <AnimatedCounters />
      <WhyChooseUs />
      <ServicesOverview />
      <FeaturedDoctors />
      <TestimonialsCarousel />
      <Facilities />
      <HealthTips />

      {/* FAQ + Newsletter */}
      <section className="section-pad bg-white dark:bg-slate-950">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading
              eyebrow={t('faq.eyebrow')}
              center={false}
              title={
                <>
                  {t('faq.frequentlyAsked')}{' '}
                  <span className="gradient-text">{t('faq.questions')}</span>
                </>
              }
              subtitle={t('faq.subtitle')}
            />
            <div className="mt-8">
              <FaqAccordion items={faqItems} />
            </div>
          </div>
          <div className="lg:sticky lg:top-28">
            <Newsletter />
          </div>
        </div>
      </section>

      <EmergencyBanner />
      <CTASection />
    </>
  );
}
