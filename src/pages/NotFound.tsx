import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, HeartPulse } from 'lucide-react';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-gradient-soft dark:bg-slate-950 px-4">
      <div className="text-center">
        <div className="inline-flex rounded-2xl bg-gradient-to-br from-brand-600 to-teal-500 p-4 text-white shadow-glow mb-6">
          <HeartPulse className="w-10 h-10" />
        </div>
        <h1 className="text-7xl font-bold gradient-text">{t('notFound.title')}</h1>
        <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">
          {t('notFound.subtitle')}
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          {t('notFound.desc')}
        </p>
        <Link to="/" className="btn-primary mt-8">
          <Home className="w-4 h-4" /> {t('notFound.backHome')}
        </Link>
      </div>
    </div>
  );
}
