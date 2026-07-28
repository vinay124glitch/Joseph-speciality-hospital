import { useState } from 'react';
import { Building2, Save, CheckCircle2, Loader2 } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { HOSPITAL } from '@/utils/constants';

export default function AdminSettings() {
  const [form, setForm] = useState({
    name: HOSPITAL.name,
    tagline: HOSPITAL.tagline,
    address: HOSPITAL.address,
    phone: HOSPITAL.phone,
    email: HOSPITAL.email,
    hours: HOSPITAL.hours,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Hospital Information
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Update hospital details displayed across the website.
        </p>
      </div>

      <form onSubmit={handleSave} className="max-w-2xl space-y-5">
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="rounded-xl bg-gradient-to-br from-brand-600 to-teal-500 p-2 text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              General Information
            </h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Hospital Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Tagline</label>
            <input
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Address</label>
            <textarea
              rows={2}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="input-field resize-none"
            />
          </div>
        </div>

        <div className="card p-6 space-y-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">Contact Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Working Hours</label>
            <input
              value={form.hours}
              onChange={(e) => setForm({ ...form, hours: e.target.value })}
              className="input-field"
            />
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
            Website Settings
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Enable online appointment booking', checked: true },
              { label: 'Show emergency contact banner', checked: true },
              { label: 'Allow newsletter subscriptions', checked: true },
              { label: 'Display WhatsApp floating button', checked: true },
            ].map((setting) => (
              <label key={setting.label} className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={setting.checked}
                  className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {setting.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Changes
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-teal-600 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Saved successfully
            </span>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}
