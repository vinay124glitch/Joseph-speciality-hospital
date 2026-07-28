import { useEffect, useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock,
  CalendarClock,
  Search,
  Phone,
  Mail,
  Loader2,
  Trash2,
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { supabase, type Appointment, type AppointmentStatus } from '@/utils/supabase';

const STATUSES: AppointmentStatus[] = [
  'pending',
  'approved',
  'rescheduled',
  'completed',
  'cancelled',
];

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    approved: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    completed: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    rescheduled: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  };
  return map[status] || 'bg-slate-100 text-slate-700';
};

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Appointment | null>(null);

  const load = () => {
    setLoading(true);
    supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setAppointments(data || []);
        setLoading(false);
      });
  };

  useEffect(load, []);

  const updateStatus = async (id: string, status: AppointmentStatus) => {
    await supabase.from('appointments').update({ status }).eq('id', id);
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a)),
    );
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const deleteAppt = async (id: string) => {
    await supabase.from('appointments').delete().eq('id', id);
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const filtered = appointments.filter((a) => {
    const matchesFilter = filter === 'all' || a.status === filter;
    const matchesQuery =
      a.patient_name.toLowerCase().includes(query.toLowerCase()) ||
      a.phone.includes(query) ||
      a.department.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = appointments.filter((a) => a.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Appointments
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage, approve, reschedule, and cancel appointment requests.
        </p>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            filter === 'all'
              ? 'bg-brand-600 text-white'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-700'
          }`}
        >
          All ({appointments.length})
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition ${
              filter === s
                ? 'bg-brand-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-700'
            }`}
          >
            {s} ({counts[s] || 0})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, phone, or department..."
          className="input-field pl-11"
        />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <CalendarDays className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            No appointments found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Patient</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Department</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Date / Time</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="text-right px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((appt) => (
                  <tr
                    key={appt.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer"
                    onClick={() => setSelected(appt)}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900 dark:text-white">
                        {appt.patient_name}
                      </p>
                      <p className="text-xs text-slate-500">{appt.phone}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-slate-600 dark:text-slate-300">
                      {appt.department}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-slate-600 dark:text-slate-300">
                      {appt.appointment_date}
                      <span className="text-slate-400"> · {appt.preferred_time}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge ${statusBadge(appt.status)} capitalize`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => updateStatus(appt.id, 'approved')}
                          className="rounded-lg p-1.5 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition"
                          title="Approve"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateStatus(appt.id, 'cancelled')}
                          className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                          title="Cancel"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteAppt(appt.id)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex justify-end"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-slate-900 h-full overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Appointment Details
              </h3>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Patient</p>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {selected.patient_name}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase">Phone</p>
                  <a href={`tel:${selected.phone}`} className="text-brand-600 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> {selected.phone}
                  </a>
                </div>
                {selected.email && (
                  <div>
                    <p className="text-xs text-slate-400 uppercase">Email</p>
                    <p className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5" /> {selected.email}
                    </p>
                  </div>
                )}
                {selected.age && (
                  <div>
                    <p className="text-xs text-slate-400 uppercase">Age</p>
                    <p className="text-slate-600 dark:text-slate-300">{selected.age}</p>
                  </div>
                )}
                {selected.gender && (
                  <div>
                    <p className="text-xs text-slate-400 uppercase">Gender</p>
                    <p className="text-slate-600 dark:text-slate-300">{selected.gender}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase">Department</p>
                <p className="text-slate-600 dark:text-slate-300">{selected.department}</p>
              </div>
              {selected.doctor && (
                <div>
                  <p className="text-xs text-slate-400 uppercase">Doctor</p>
                  <p className="text-slate-600 dark:text-slate-300">{selected.doctor}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase">Date</p>
                  <p className="text-slate-600 dark:text-slate-300">{selected.appointment_date}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase">Time</p>
                  <p className="text-slate-600 dark:text-slate-300">{selected.preferred_time}</p>
                </div>
              </div>
              {selected.reason && (
                <div>
                  <p className="text-xs text-slate-400 uppercase">Reason</p>
                  <p className="text-slate-600 dark:text-slate-300">{selected.reason}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-slate-400 uppercase mb-2">Status</p>
                <span className={`badge ${statusBadge(selected.status)} capitalize`}>
                  {selected.status}
                </span>
              </div>

              {/* Quick actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400 uppercase mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateStatus(selected.id, 'approved')}
                    className="btn-secondary text-xs py-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button
                    onClick={() => updateStatus(selected.id, 'rescheduled')}
                    className="btn-secondary text-xs py-2"
                  >
                    <CalendarClock className="w-3.5 h-3.5" /> Reschedule
                  </button>
                  <button
                    onClick={() => updateStatus(selected.id, 'completed')}
                    className="btn-secondary text-xs py-2"
                  >
                    <Clock className="w-3.5 h-3.5" /> Complete
                  </button>
                  <button
                    onClick={() => updateStatus(selected.id, 'cancelled')}
                    className="btn text-xs py-2 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-300"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
