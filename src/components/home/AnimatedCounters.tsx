import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView, useCountUp } from '@/hooks/useCountUp';
import { STATS } from '@/data/content';

function StatCard({
  value,
  labelKey,
  suffix,
  index,
  t,
}: {
  value: number;
  labelKey: string;
  suffix: string;
  index: number;
  t: (key: string) => string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const count = useCountUp(value, 2200, inView);

  const formatNumber = (n: number) => {
    if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
    return n.toString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="text-center"
    >
      <p className="text-4xl sm:text-5xl font-bold gradient-text">
        {formatNumber(count)}
        <span className="text-2xl sm:text-3xl">{suffix}</span>
      </p>
      <p className="mt-2 text-sm sm:text-base text-blue-100/90 font-medium">
        {t(`counters.${labelKey}`)}
      </p>
    </motion.div>
  );
}

export default function AnimatedCounters() {
  const { t } = useTranslation();

  return (
    <section className="py-14 bg-gradient-to-r from-brand-800 to-teal-700 relative overflow-hidden">
      <div className="absolute -right-32 -top-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl" />
      <div className="container-x relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.labelKey}
              value={stat.value}
              labelKey={stat.labelKey}
              suffix={stat.suffix}
              index={i}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
