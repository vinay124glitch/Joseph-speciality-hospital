import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/utils/supabase';

export default function Newsletter() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .insert({ email });
    if (error) {
      if (error.code === '23505') {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } else {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-r from-brand-700 to-teal-600 p-8 sm:p-10 text-center">
      <div className="inline-flex rounded-2xl bg-white/15 p-3 mb-4">
        <Mail className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white">
        {t('newsletter.title')}
      </h3>
      <p className="mt-2 text-blue-100/90 max-w-md mx-auto">
        {t('newsletter.subtitle')}
      </p>

      {status === 'success' ? (
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-white">
          <CheckCircle2 className="w-5 h-5 text-teal-300" />
          {t('newsletter.success')}
        </div>
      ) : (
        <form
          onSubmit={submit}
          className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('newsletter.placeholder')}
            className="flex-1 rounded-full px-5 py-3 text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn bg-white text-brand-700 hover:bg-brand-50 shrink-0"
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              t('newsletter.subscribe')
            )}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="mt-3 text-sm text-red-200">
          {t('newsletter.error')}
        </p>
      )}
    </div>
  );
}
