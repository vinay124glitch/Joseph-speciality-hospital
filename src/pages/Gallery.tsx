import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import PageHeader, { CTASection } from '@/components/ui/PageHeader';
import { GALLERY, GALLERY_CATEGORIES, type GalleryItem } from '@/data/gallery';

export default function GalleryPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const items =
    filter === 'all'
      ? GALLERY
      : GALLERY.filter((g) => g.categoryKey === filter);

  return (
    <>
      <PageHeader
        title={t('gallery.title')}
        subtitle={t('gallery.subtitle')}
        breadcrumb={t('nav.gallery')}
      />

      <section className="section-pad bg-white dark:bg-slate-950">
        <div className="container-x">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  filter === cat
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-700'
                }`}
              >
                {t(`gallery.${cat}`)}
              </button>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {items.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="relative group rounded-2xl overflow-hidden shadow-card cursor-pointer break-inside-avoid"
                onClick={() => setLightbox(item)}
              >
                <img
                  src={item.image}
                  alt={t(`gallery.${item.key}`)}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="badge bg-teal-500/90 text-white mb-1">
                        {t(`gallery.${item.categoryKey}`)}
                      </span>
                      <h4 className="text-white font-semibold">{t(`gallery.${item.key}`)}</h4>
                    </div>
                    <div className="rounded-lg bg-white/20 p-2">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-5 rounded-full bg-white/15 p-2.5 text-white hover:bg-white/25 transition"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.image}
                alt={t(`gallery.${lightbox.key}`)}
                className="w-full rounded-2xl object-contain max-h-[80vh]"
              />
              <div className="mt-4 text-center">
                <span className="badge bg-teal-500/90 text-white">
                  {t(`gallery.${lightbox.categoryKey}`)}
                </span>
                <h4 className="text-white font-semibold text-lg mt-2">
                  {t(`gallery.${lightbox.key}`)}
                </h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection />
    </>
  );
}
