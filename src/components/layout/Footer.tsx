import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  HeartPulse,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
} from 'lucide-react';
import { HOSPITAL, NAV_LINKS } from '@/utils/constants';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="container-x py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="rounded-xl bg-gradient-to-br from-brand-600 to-teal-500 p-2 text-white">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div className="leading-tight">
                <p className="font-display font-bold text-white text-lg">
                  {t('meta.siteName')}
                </p>
                <p className="text-[11px] text-teal-400 font-medium tracking-wide">
                  HOSPITAL
                </p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href={Object.values(HOSPITAL.social)[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-slate-800 p-2.5 text-slate-300 hover:bg-brand-600 hover:text-white transition"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-teal-400 transition flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-teal-500" />
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.ourServices')}</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                'footer.outpatientCare',
                'footer.emergency24x7',
                'footer.healthCheckups',
                'footer.laboratory',
                'footer.pharmacy',
                'footer.ambulance',
              ].map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="hover:text-teal-400 transition flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-teal-500" />
                    {t(s)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.contactUs')}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span>{t(HOSPITAL.addressKey)}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${HOSPITAL.phoneRaw}`} className="hover:text-teal-400">
                  {HOSPITAL.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${HOSPITAL.email}`} className="hover:text-teal-400">
                  {HOSPITAL.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span>
                  {t(HOSPITAL.hoursKey)}
                  <br />
                  {t(HOSPITAL.emergencyHoursKey)}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {year} {t('meta.siteNameFull')}. {t('footer.rightsReserved')}
          </p>
          <p className="flex items-center gap-1.5">
            {t('footer.madeWith')} <HeartPulse className="w-3.5 h-3.5 text-red-400" /> {t('footer.forBetterHealthcare')}
          </p>
        </div>
      </div>
    </footer>
  );
}
