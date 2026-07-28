import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Calendar,
  CheckCircle2,
  Loader2,
  User,
  Phone,
  Mail,
  Stethoscope,
  Clock,
  MessageSquare,
  CalendarCheck,
} from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { supabase, type Doctor } from '@/utils/supabase';
import { DEPARTMENTS, GENDERS, TIME_SLOTS, HOSPITAL } from '@/utils/constants';

type FormData = {
  patient_name: string;
  phone: string;
  email: string;
  age: string;
  gender: string;
  department: string;
  doctor: string;
  appointment_date: string;
  preferred_time: string;
  reason: string;
};

export default function AppointmentPage() {
  const { t } = useTranslation();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const selectedDept = watch('department');

  useEffect(() => {
    supabase
      .from('doctors')
      .select('*')
      .order('name', { ascending: true })
      .then(({ data }) => setDoctors(data || []));
  }, []);

  const filteredDoctors = selectedDept
    ? doctors.filter((d) => d.department === selectedDept)
    : doctors;

  const today = new Date().toISOString().split('T')[0];

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    const { error } = await supabase.from('appointments').insert({
      patient_name: data.patient_name,
      phone: data.phone,
      email: data.email || null,
      age: data.age ? parseInt(data.age) : null,
      gender: data.gender || null,
      department: data.department,
      doctor: data.doctor || null,
      appointment_date: data.appointment_date,
      preferred_time: data.preferred_time,
      reason: data.reason || null,
      status: 'pending',
    });

    setSubmitting(false);
    if (!error) {
      setSuccess(true);
      reset();
    }
  };

  if (success) {
    return (
      <>
        <PageHeader title={t('appointment.title')} breadcrumb={t('nav.bookAppointment')} />
        <section className="section-pad bg-white dark:bg-slate-950">
          <div className="container-x max-w-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="card p-10 text-center"
            >
              <div className="mx-auto w-20 h-20 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t('appointment.successTitle')}
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('appointment.successDesc')}
              </p>
              <div className="mt-6 rounded-xl bg-brand-50 dark:bg-slate-800 p-4 text-left">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-semibold">{t('appointment.needUrgentHelp')}</span>{' '}
                  <a
                    href={`tel:${HOSPITAL.phoneRaw}`}
                    className="text-brand-600 font-semibold"
                  >
                    {HOSPITAL.phone}
                  </a>
                </p>
              </div>
              <button
                onClick={() => setSuccess(false)}
                className="btn-secondary mt-6"
              >
                {t('appointment.bookAnother')}
              </button>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  const fieldIcon = (icon: React.ReactNode) => (
    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
      {icon}
    </span>
  );

  return (
    <>
      <PageHeader
        title={t('appointment.title')}
        subtitle={t('appointment.subtitle')}
        breadcrumb={t('nav.bookAppointment')}
      />

      <section className="section-pad bg-white dark:bg-slate-950">
        <div className="container-x max-w-3xl">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className="card p-6 sm:p-10"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('appointment.patientName')} *
                </label>
                <div className="relative">
                  {fieldIcon(<User className="w-5 h-5" />)}
                  <input
                    {...register('patient_name', { required: t('appointment.nameRequired') })}
                    className="input-field pl-11"
                    placeholder={t('appointment.patientNamePlaceholder')}
                  />
                </div>
                {errors.patient_name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.patient_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('appointment.phoneNumber')} *
                </label>
                <div className="relative">
                  {fieldIcon(<Phone className="w-5 h-5" />)}
                  <input
                    {...register('phone', {
                      required: t('appointment.phoneRequired'),
                      pattern: {
                        value: /^[0-9+\-\s]{10,15}$/,
                        message: t('appointment.phoneInvalid'),
                      },
                    })}
                    className="input-field pl-11"
                    placeholder={t('appointment.phonePlaceholder')}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('appointment.email')}
                </label>
                <div className="relative">
                  {fieldIcon(<Mail className="w-5 h-5" />)}
                  <input
                    type="email"
                    {...register('email', {
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: t('appointment.emailInvalid'),
                      },
                    })}
                    className="input-field pl-11"
                    placeholder={t('appointment.emailPlaceholder')}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('appointment.age')}
                </label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  {...register('age')}
                  className="input-field"
                  placeholder={t('appointment.agePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('appointment.gender')}
                </label>
                <select {...register('gender')} className="input-field" defaultValue="">
                  <option value="">{t('appointment.selectGender')}</option>
                  {GENDERS.map((g) => (
                    <option key={g} value={g}>
                      {t(`genders.${g}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('appointment.department')} *
                </label>
                <div className="relative">
                  {fieldIcon(<Stethoscope className="w-5 h-5" />)}
                  <select
                    {...register('department', { required: t('appointment.departmentRequired') })}
                    className="input-field pl-11"
                    defaultValue=""
                  >
                    <option value="">{t('appointment.selectDepartment')}</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {t(`departments.${d}`)}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.department && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.department.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('appointment.preferredDoctor')}
                </label>
                <select {...register('doctor')} className="input-field" defaultValue="">
                  <option value="">{t('appointment.anyDoctor')}</option>
                  {filteredDoctors.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} — {d.specialization}
                    </option>
                  ))}
                </select>
                {selectedDept && filteredDoctors.length === 0 && (
                  <p className="text-xs text-slate-400 mt-1">
                    {t('appointment.noDoctorsForDept')}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('appointment.appointmentDate')} *
                </label>
                <div className="relative">
                  {fieldIcon(<Calendar className="w-5 h-5" />)}
                  <input
                    type="date"
                    min={today}
                    {...register('appointment_date', { required: t('appointment.dateRequired') })}
                    className="input-field pl-11"
                  />
                </div>
                {errors.appointment_date && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.appointment_date.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('appointment.preferredTime')} *
                </label>
                <div className="relative">
                  {fieldIcon(<Clock className="w-5 h-5" />)}
                  <select
                    {...register('preferred_time', { required: t('appointment.timeRequired') })}
                    className="input-field pl-11"
                    defaultValue=""
                  >
                    <option value="">{t('appointment.selectTimeSlot')}</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {t(`timeSlots.${slot}`)}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.preferred_time && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.preferred_time.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {t('appointment.reasonForVisit')}
              </label>
              <div className="relative">
                {fieldIcon(<MessageSquare className="w-5 h-5" />)}
                <textarea
                  rows={3}
                  {...register('reason')}
                  className="input-field pl-11 resize-none"
                  placeholder={t('appointment.reasonPlaceholder')}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full mt-6 text-base py-4"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> {t('appointment.submitting')}
                </>
              ) : (
                <>
                  <CalendarCheck className="w-5 h-5" /> {t('appointment.requestAppointment')}
                </>
              )}
            </button>
            <p className="text-xs text-center text-slate-400 mt-3">
              {t('appointment.confirmMessage')}{' '}
              <a href={`tel:${HOSPITAL.phoneRaw}`} className="text-brand-600 font-semibold">
                {HOSPITAL.phone}
              </a>
            </p>
          </motion.form>
        </div>
      </section>
    </>
  );
}
