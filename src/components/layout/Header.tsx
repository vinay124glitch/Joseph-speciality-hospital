import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  HeartPulse,
  Menu,
  X,
  Moon,
  Sun,
  Phone,
  Calendar,
  LayoutDashboard,
} from 'lucide-react';
import { HOSPITAL, NAV_LINKS } from '@/utils/constants';
import { useTheme } from '@/hooks/useTheme';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-brand-800 text-blue-100 text-xs">
        <div className="container-x flex items-center justify-between py-2">
          <p className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" /> {HOSPITAL.phone}
            <span className="mx-2 text-brand-400">|</span>
            <HeartPulse className="w-3.5 h-3.5 text-red-300" /> {t('topbar.emergency')}
          </p>
          <div className="flex items-center gap-4">
            <span>{t('topbar.opdHours')}</span>
            <Link
              to="/admin"
              className="flex items-center gap-1 hover:text-white transition"
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> {t('nav.admin')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass shadow-soft'
            : 'bg-white dark:bg-slate-950'
        }`}
      >
        <nav className="container-x flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="rounded-xl bg-gradient-to-br from-brand-600 to-teal-500 p-2 text-white shadow-md">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div className="leading-tight">
              <p className="font-display font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                {t('meta.siteName')}
              </p>
              <p className="text-[11px] text-teal-600 dark:text-teal-400 font-medium tracking-wide">
                HOSPITAL
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-slate-800'
                      : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-300 hover:bg-brand-50/50 dark:hover:bg-slate-800/50'
                  }`
                }
              >
                {t(link.labelKey)}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-lg p-2 text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800 transition"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <Link
              to="/appointment"
              className="hidden sm:inline-flex btn-primary text-sm py-2.5 px-5"
            >
              <Calendar className="w-4 h-4" /> {t('nav.bookAppointment')}
            </Link>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden rounded-lg p-2 text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950"
            >
              <div className="container-x py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? 'text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-slate-800'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800'
                      }`
                    }
                  >
                    {t(link.labelKey)}
                  </NavLink>
                ))}
                <Link to="/admin" className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800">
                  {t('nav.adminDashboard')}
                </Link>
                <Link
                  to="/appointment"
                  className="btn-primary mt-2 justify-center"
                >
                  <Calendar className="w-4 h-4" /> {t('nav.bookAppointment')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
