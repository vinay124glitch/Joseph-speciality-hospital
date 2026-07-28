import { useEffect, useState } from 'react';
import {
  Stethoscope,
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Award,
  Clock,
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { supabase, type Doctor } from '@/utils/supabase';
import { DEPARTMENTS } from '@/utils/constants';

type FormState = {
  name: string;
  qualifications: string;
  specialization: string;
  experience: string;
  department: string;
  available_days: string;
  image_url: string;
  bio: string;
};

const empty: FormState = {
  name: '',
  qualifications: '',
  specialization: '',
  experience: '',
  department: '',
  available_days: '',
  image_url: '',
  bio: '',
};

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Doctor | null>(null);
  const [form, setForm] = useState<FormState>(empty);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    supabase
      .from('doctors')
      .select('*')
      .order('name', { ascending: true })
      .then(({ data }) => {
        setDoctors(data || []);
        setLoading(false);
      });
  };

  useEffect(load, []);

  const openAdd = () => {
    setEditing(null);
    setForm(empty);
    setShowForm(true);
  };

  const openEdit = (doc: Doctor) => {
    setEditing(doc);
    setForm({
      name: doc.name,
      qualifications: doc.qualifications,
      specialization: doc.specialization,
      experience: String(doc.experience),
      department: doc.department,
      available_days: doc.available_days,
      image_url: doc.image_url || '',
      bio: doc.bio || '',
    });
    setShowForm(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name,
      qualifications: form.qualifications,
      specialization: form.specialization,
      experience: parseInt(form.experience) || 0,
      department: form.department,
      available_days: form.available_days,
      image_url: form.image_url || null,
      bio: form.bio || null,
    };
    if (editing) {
      await supabase.from('doctors').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('doctors').insert(payload);
    }
    setSaving(false);
    setShowForm(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this doctor?')) return;
    await supabase.from('doctors').delete().eq('id', id);
    load();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Doctors
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Add, edit, and manage doctor profiles.
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Add Doctor
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doc) => (
            <div key={doc.id} className="card p-5">
              <div className="flex items-start gap-4">
                <img
                  src={doc.image_url || 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=200'}
                  alt={doc.name}
                  className="w-16 h-16 rounded-xl object-cover"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-slate-900 dark:text-white truncate">
                    {doc.name}
                  </h4>
                  <p className="text-xs text-brand-600 dark:text-brand-400">
                    {doc.qualifications}
                  </p>
                  <span className="badge bg-teal-50 text-teal-600 dark:bg-teal-900/40 dark:text-teal-300 mt-1.5">
                    {doc.department}
                  </span>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                <p className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-teal-500" />
                  {doc.experience} years
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-500" />
                  {doc.available_days}
                </p>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => openEdit(doc)}
                  className="flex-1 btn-secondary text-xs py-2"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => remove(doc.id)}
                  className="rounded-lg px-3 py-2 text-xs font-semibold bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-300 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          onClick={() => setShowForm(false)}
        >
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editing ? 'Edit Doctor' : 'Add Doctor'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={save} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field"
                    placeholder="Dr. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Qualifications *</label>
                  <input
                    required
                    value={form.qualifications}
                    onChange={(e) => setForm({ ...form, qualifications: e.target.value })}
                    className="input-field"
                    placeholder="MBBS, MD"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Specialization *</label>
                  <input
                    required
                    value={form.specialization}
                    onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                    className="input-field"
                    placeholder="Cardiology"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Experience (years) *</label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    className="input-field"
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Department *</label>
                  <select
                    required
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select department</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Available Days *</label>
                  <input
                    required
                    value={form.available_days}
                    onChange={(e) => setForm({ ...form, available_days: e.target.value })}
                    className="input-field"
                    placeholder="Mon–Sat, 9 AM – 1 PM"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Image URL</label>
                <input
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  className="input-field"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Bio</label>
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="input-field resize-none"
                  placeholder="Short biography..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary flex-1"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Stethoscope className="w-4 h-4" />}
                  {editing ? 'Save Changes' : 'Add Doctor'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
