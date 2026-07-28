import { useEffect, useState } from 'react';
import {
  Inbox,
  Mail,
  Phone,
  Trash2,
  CheckCircle2,
  Loader2,
  X,
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { supabase, type ContactMessage } from '@/utils/supabase';

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const load = () => {
    setLoading(true);
    supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setMessages(data || []);
        setLoading(false);
      });
  };

  useEffect(load, []);

  const markRead = async (msg: ContactMessage) => {
    if (msg.is_read) return;
    await supabase.from('contact_messages').update({ is_read: true }).eq('id', msg.id);
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m)),
    );
    setSelected({ ...msg, is_read: true });
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await supabase.from('contact_messages').delete().eq('id', id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Messages
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {unread > 0 ? `${unread} unread message${unread > 1 ? 's' : ''}` : 'All caught up!'} · {messages.length} total
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
        </div>
      ) : messages.length === 0 ? (
        <div className="card p-12 text-center text-slate-400">
          <Inbox className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          No messages yet.
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Message list */}
          <div className="lg:col-span-1 space-y-2">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => {
                  setSelected(msg);
                  markRead(msg);
                }}
                className={`w-full text-left card p-4 transition hover:shadow-card-hover ${
                  selected?.id === msg.id ? 'ring-2 ring-brand-500' : ''
                } ${!msg.is_read ? 'border-l-4 border-l-brand-500' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <p className={`font-medium truncate ${msg.is_read ? 'text-slate-600 dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>
                    {msg.name}
                  </p>
                  {!msg.is_read && (
                    <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {msg.subject}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(msg.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </button>
            ))}
          </div>

          {/* Message detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {selected.subject}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      From {selected.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center gap-1.5 text-sm text-brand-600 dark:text-brand-400"
                  >
                    <Mail className="w-4 h-4" /> {selected.email}
                  </a>
                  {selected.phone && (
                    <a
                      href={`tel:${selected.phone}`}
                      className="flex items-center gap-1.5 text-sm text-brand-600 dark:text-brand-400"
                    >
                      <Phone className="w-4 h-4" /> {selected.phone}
                    </a>
                  )}
                  <span className="text-sm text-slate-400">
                    {new Date(selected.created_at).toLocaleString('en-IN')}
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {selected.message}
                </p>

                <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="btn-primary text-sm"
                  >
                    <Mail className="w-4 h-4" /> Reply via Email
                  </a>
                  <button
                    onClick={() => remove(selected.id)}
                    className="btn text-sm bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="card p-12 text-center text-slate-400 h-full flex flex-col items-center justify-center">
                <Mail className="w-12 h-12 mb-3 text-slate-300" />
                <p>Select a message to read it</p>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
