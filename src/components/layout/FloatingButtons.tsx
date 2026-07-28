import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUp,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { HOSPITAL } from '@/utils/constants';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingButtons() {
  const { t } = useTranslation();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed right-4 sm:right-6 bottom-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="rounded-full bg-brand-600 text-white p-3 shadow-lg hover:bg-brand-700 transition"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={`https://wa.me/${HOSPITAL.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative rounded-full bg-[#25D366] text-white p-4 shadow-lg hover:scale-105 transition"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
        <MessageCircle className="w-6 h-6 relative" />
      </a>

      <Link
        to="/contact"
        aria-label="Emergency contact"
        className="rounded-full bg-red-600 text-white p-4 shadow-lg hover:scale-105 transition flex flex-col items-center"
      >
        <Phone className="w-6 h-6" />
        <span className="text-[9px] font-bold mt-0.5 leading-none">{t('topbar.emergency')}</span>
      </Link>
    </div>
  );
}
