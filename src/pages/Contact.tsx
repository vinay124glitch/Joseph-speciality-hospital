import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Siren,
} from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { HOSPITAL } from '@/utils/constants';
import { supabase } from '@/utils/supabase';

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    const { error } = await supabase.from('contact_messages').insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject,
      message: data.message,
      is_read: false,
    });
    if (!error) {
      setStatus('success');
      reset();
    } else {
      setStatus('idle');
    }
  };

  const contactCards = [
    { icon: MapPin, label: t('contact.address'), value: t(HOSPITAL.addressKey) },
    { icon: Phone, label: t('contact.phone'), value: HOSPITAL.phone, href: `tel:${HOSPITAL.phoneRaw}` },
    { icon: Mail, label: t('contact.email'), value: HOSPITAL.email, href: `mailto:${HOSPITAL.email}` },
    { icon: Clock, label: t('contact.workingHours'), value: `${t(HOSPITAL.hoursKey)}\n${t(HOSPITAL.emergencyHoursKey)}` },
  ];

  return (
    <>
      <PageHeader
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
        breadcrumb={t('nav.contact')}
      />

      <section className="section-pad bg-white dark:bg-slate-950">
        <div className="container-x">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card p-6 text-center card-hover group"
              >
                <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-teal-500 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                  <card.icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  {card.label}
                </h4>
                {card.href ? (
                  <a
                    href={card.href}
                    className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 transition whitespace-pre-line block"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 whitespace-pre-line">
                    {card.value}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 bg-white dark:bg-slate-950">
        <div className="container-x grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card p-6 sm:p-8"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t('contact.sendMessage')}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t('contact.sendMessageDesc')}
            </p>

            {status === 'success' ? (
              <div className="mt-6 text-center py-8">
                <CheckCircle2 className="w-14 h-14 text-teal-500 mx-auto" />
                <p className="mt-4 font-semibold text-slate-900 dark:text-white">
                  {t('contact.successTitle')}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {t('contact.successDesc')}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-secondary mt-5"
                >
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      {t('contact.yourName')} *
                    </label>
                    <input
                      {...register('name', { required: t('contact.nameRequired') })}
                      className="input-field"
                      placeholder={t('contact.yourNamePlaceholder')}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      {t('contact.emailLabel')} *
                    </label>
                    <input
                      type="email"
                      {...register('email', {
                        required: t('contact.emailRequired'),
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: t('contact.emailInvalid'),
                        },
                      })}
                      className="input-field"
                      placeholder={t('contact.emailPlaceholder')}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      {t('contact.phoneLabel')}
                    </label>
                    <input
                      {...register('phone')}
                      className="input-field"
                      placeholder={t('contact.phonePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      {t('contact.subject')} *
                    </label>
                    <input
                      {...register('subject', { required: t('contact.subjectRequired') })}
                      className="input-field"
                      placeholder={t('contact.subjectPlaceholder')}
                    />
                    {errors.subject && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('contact.message')} *
                  </label>
                  <textarea
                    rows={5}
                    {...register('message', { required: t('contact.messageRequired') })}
                    className="input-field resize-none"
                    placeholder={t('contact.messagePlaceholder')}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> {t('contact.send')}
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="card overflow-hidden">
              <iframe
                title={t('contact.address')}
                src={HOSPITAL.mapEmbed}
                className="w-full h-72 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="rounded-2xl bg-red-600 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/15 p-2.5">
                  <Siren className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">{t('contact.emergencyContact')}</h4>
                  <p className="text-sm text-red-100">
                    {t('contact.emergencyDesc')}
                  </p>
                </div>
              </div>
              <a
                href={`tel:${HOSPITAL.phoneRaw}`}
                className="btn bg-white text-red-600 hover:bg-red-50 w-full mt-4"
              >
                <Phone className="w-4 h-4" /> {HOSPITAL.phone}
              </a>
            </div>

            <div className="card p-6">
              <h4 className="font-semibold text-slate-900 dark:text-white">
                {t('contact.connectWithUs')}
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {t('contact.connectDesc')}
              </p>
              <div className="flex gap-3 mt-4">
                {[
                  { Icon: Facebook, url: HOSPITAL.social.facebook },
                  { Icon: Instagram, url: HOSPITAL.social.instagram },
                  { Icon: Twitter, url: HOSPITAL.social.twitter },
                  { Icon: Youtube, url: HOSPITAL.social.youtube },
                ].map(({ Icon, url }, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-brand-50 dark:bg-slate-800 p-3 text-brand-600 dark:text-brand-400 hover:bg-brand-600 hover:text-white transition"
                    aria-label={t('contact.connectWithUs')}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
