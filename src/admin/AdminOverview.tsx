import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Inbox,
  Stethoscope,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import AdminLayout from './AdminLayout';
import { supabase, type Appointment, type ContactMessage } from '@/utils/supabase';

export default function AdminOverview() {
  const [stats, setStats] = useState({
    appointments: 0,
    pending: 0,
    messages: 0,
    unread: 0,
    doctors: 0,
    blog: 0,
  });
  const [recent, setRecent] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [deptData, setDeptData] = useState<{ name: string; count: number }[]>([]);
  const [statusData, setStatusData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from('appointments').select('*'),
      supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(5),
      supabase.from('doctors').select('*', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    ]).then(([apptRes, msgRes, docRes, blogRes]) => {
      const appts = (apptRes.data || []) as Appointment[];
      setStats({
        appointments: appts.length,
        pending: appts.filter((a) => a.status === 'pending').length,
        messages: msgRes.data?.length || 0,
        unread: (msgRes.data || []).filter((m) => !m.is_read).length,
        doctors: docRes.count || 0,
        blog: blogRes.count || 0,
      });
      setRecent(appts.slice(0, 6));
      setMessages(msgRes.data || []);

      // department distribution
      const deptMap: Record<string, number> = {};
      appts.forEach((a) => {
        deptMap[a.department] = (deptMap[a.department] || 0) + 1;
      });
      setDeptData(
        Object.entries(deptMap).map(([name, count]) => ({ name, count })),
      );

      // status distribution
      const statusMap: Record<string, number> = {};
      appts.forEach((a) => {
        statusMap[a.status] = (statusMap[a.status] || 0) + 1;
      });
      setStatusData(
        Object.entries(statusMap).map(([name, value]) => ({ name, value })),
      );

      setLoading(false);
    });
  }, []);

  const PIE_COLORS = ['#2563eb', '#14b8a6', '#f59e0b', '#ef4444', '#22c55e'];
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

  const statCards = [
    { label: 'Total Appointments', value: stats.appointments, icon: CalendarDays, color: 'from-brand-500 to-brand-700', link: '/admin/appointments' },
    { label: 'Pending Approval', value: stats.pending, icon: Clock, color: 'from-amber-500 to-amber-600', link: '/admin/appointments' },
    { label: 'Unread Messages', value: stats.unread, icon: Inbox, color: 'from-teal-500 to-teal-600', link: '/admin/messages' },
    { label: 'Active Doctors', value: stats.doctors, icon: Stethoscope, color: 'from-purple-500 to-purple-600', link: '/admin/doctors' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <Link
              key={card.label}
              to={card.link}
              className="card p-5 card-hover group"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-xl bg-gradient-to-br ${card.color} p-2.5 text-white`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <TrendingUp className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-teal-500 transition" />
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-3">
                {loading ? '—' : card.value}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {card.label}
              </p>
            </Link>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Department bar chart */}
          <div className="card p-5 lg:col-span-2">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Appointments by Department
            </h3>
            <div className="mt-4 h-64">
              {deptData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deptData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={60} stroke="#94a3b8" />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '12px',
                        border: 'none',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                  No appointment data yet
                </div>
              )}
            </div>
          </div>

          {/* Status pie chart */}
          <div className="card p-5">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Appointment Status
            </h3>
            <div className="mt-4 h-64">
              {statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      innerRadius={40}
                      paddingAngle={3}
                    >
                      {statusData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                  No status data yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trend area chart */}
        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Appointments Over Time
          </h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={recent
                  .slice()
                  .reverse()
                  .map((a) => ({
                    date: new Date(a.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
                    name: a.patient_name.split(' ')[0],
                  }))}
                margin={{ top: 5, right: 10, left: -15, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorAppt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis hide />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="name"
                  stroke="#14b8a6"
                  strokeWidth={2}
                  fill="url(#colorAppt)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent appointments + messages */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Recent Appointments
              </h3>
              <Link
                to="/admin/appointments"
                className="text-sm font-semibold text-brand-600 dark:text-brand-400 flex items-center gap-1 hover:gap-1.5 transition-all"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {recent.length === 0 ? (
                <p className="text-sm text-slate-400 py-8 text-center">
                  No appointments yet.
                </p>
              ) : (
                recent.map((appt) => (
                  <div
                    key={appt.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-slate-900 dark:text-white truncate">
                        {appt.patient_name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {appt.department} · {appt.appointment_date}
                      </p>
                    </div>
                    <span className={`badge ${statusBadge(appt.status)} shrink-0`}>
                      {appt.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Recent Messages
              </h3>
              <Link
                to="/admin/messages"
                className="text-sm font-semibold text-brand-600 dark:text-brand-400 flex items-center gap-1 hover:gap-1.5 transition-all"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {messages.length === 0 ? (
                <p className="text-sm text-slate-400 py-8 text-center">
                  No messages yet.
                </p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50"
                  >
                    <div className={`rounded-lg p-1.5 mt-0.5 ${msg.is_read ? 'bg-slate-200 dark:bg-slate-700 text-slate-400' : 'bg-teal-100 dark:bg-teal-900/40 text-teal-600'}`}>
                      {msg.is_read ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-slate-900 dark:text-white truncate">
                        {msg.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {msg.subject}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
