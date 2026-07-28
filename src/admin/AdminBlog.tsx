import { useEffect, useState } from 'react';
import {
  FileText,
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { supabase, type BlogPost } from '@/utils/supabase';

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  author: string;
  published: boolean;
};

const empty: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image_url: '',
  category: 'General Health',
  author: 'Joseph Speciality Hospital',
  published: true,
};

const CATEGORIES = [
  'General Health',
  'Diabetes',
  'Cardiology',
  'Pediatrics',
  'Wellness',
  'Women\'s Health',
  'Seasonal Health',
  'Preventive Care',
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<FormState>(empty);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPosts(data || []);
        setLoading(false);
      });
  };

  useEffect(load, []);

  const openAdd = () => {
    setEditing(null);
    setForm(empty);
    setShowForm(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image_url: post.image_url || '',
      category: post.category,
      author: post.author,
      published: post.published,
    });
    setShowForm(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const slug = form.slug || slugify(form.title);
    const payload = {
      title: form.title,
      slug,
      excerpt: form.excerpt,
      content: form.content,
      image_url: form.image_url || null,
      category: form.category,
      author: form.author,
      published: form.published,
    };
    if (editing) {
      await supabase.from('blog_posts').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('blog_posts').insert(payload);
    }
    setSaving(false);
    setShowForm(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    await supabase.from('blog_posts').delete().eq('id', id);
    load();
  };

  const togglePublish = async (post: BlogPost) => {
    await supabase
      .from('blog_posts')
      .update({ published: !post.published })
      .eq('id', post.id);
    load();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Blog Management
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create, edit, and publish health articles.
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
        </div>
      ) : posts.length === 0 ? (
        <div className="card p-12 text-center text-slate-400">
          <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          No articles yet. Click "New Article" to create one.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="card overflow-hidden">
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-36 object-cover"
                  loading="lazy"
                />
              )}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="badge bg-brand-50 text-brand-600 dark:bg-slate-800 dark:text-brand-400">
                    {post.category}
                  </span>
                  <button
                    onClick={() => togglePublish(post)}
                    className={`rounded-lg p-1.5 transition ${
                      post.published
                        ? 'text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30'
                        : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    title={post.published ? 'Published' : 'Draft'}
                  >
                    {post.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm leading-snug">
                  {post.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                  {post.excerpt}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  By {post.author} ·{' '}
                  {new Date(post.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </p>
                <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => openEdit(post)}
                    className="flex-1 btn-secondary text-xs py-2"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => remove(post.id)}
                    className="rounded-lg px-3 py-2 text-xs font-semibold bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-300 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
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
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editing ? 'Edit Article' : 'New Article'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={save} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })
                  }
                  className="input-field"
                  placeholder="Article title"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Slug *</label>
                  <input
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                    className="input-field"
                    placeholder="article-slug"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="input-field"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Author</label>
                <input
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="input-field"
                  placeholder="Author name"
                />
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
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Excerpt *</label>
                <textarea
                  required
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="input-field resize-none"
                  placeholder="Short summary..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Content *</label>
                <textarea
                  required
                  rows={8}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="input-field resize-y"
                  placeholder="Write the full article. Use blank lines to separate paragraphs."
                />
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Publish immediately
                </span>
              </label>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary flex-1"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                  {editing ? 'Save Changes' : 'Create Article'}
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
