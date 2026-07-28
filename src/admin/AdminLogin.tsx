import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartPulse, Mail, Lock, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from './AuthContext';

export default function AdminLogin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-brand-700 to-teal-600 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-white max-w-md"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
              <HeartPulse className="w-8 h-8" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl">Joseph Speciality</h2>
              <p className="text-xs text-teal-200 tracking-wide">HOSPITAL</p>
            </div>
          </div>
          <h1 className="text-3xl font-bold leading-tight">
            Hospital Administration
          </h1>
          <p className="mt-4 text-blue-100/90 leading-relaxed">
            Manage appointments, doctors, blog content, and patient messages —
            all from one secure dashboard.
          </p>
          <ul className="mt-8 space-y-3 text-blue-100/90 text-sm">
            {[
              'Real-time appointment management',
              'Doctor and department administration',
              'Blog content management',
              'Patient message inbox',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-300" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Right login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-600 transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to website
          </Link>

          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="rounded-xl bg-gradient-to-br from-brand-600 to-teal-500 p-2 text-white">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-slate-900 dark:text-white">
                Joseph Speciality
              </h2>
              <p className="text-xs text-teal-600 font-medium tracking-wide">ADMIN PANEL</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Sign in to your admin account to continue.
          </p>

          {error && (
            <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 px-4 py-3 text-sm text-red-700 dark:text-red-300">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-11"
                  placeholder="admin@josephspecialityhospital.in"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-11"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-6 text-xs text-center text-slate-400">
            Admin access is restricted to authorised hospital staff.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
