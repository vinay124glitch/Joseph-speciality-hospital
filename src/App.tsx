import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { AuthProvider } from '@/admin/AuthContext';
import ProtectedRoute from '@/admin/ProtectedRoute';
import PublicLayout from '@/components/layout/PublicLayout';
import LanguageFade from '@/components/ui/LanguageFade';

import Home from '@/pages/Home';
import About from '@/pages/About';
import Departments from '@/pages/Departments';
import Doctors from '@/pages/Doctors';
import Services from '@/pages/Services';
import Appointment from '@/pages/Appointment';
import Gallery from '@/pages/Gallery';
import Testimonials from '@/pages/Testimonials';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

import AdminLogin from '@/admin/AdminLogin';

const AdminOverview = lazy(() => import('@/admin/AdminOverview'));
const AdminAppointments = lazy(() => import('@/admin/AdminAppointments'));
const AdminDoctors = lazy(() => import('@/admin/AdminDoctors'));
const AdminBlog = lazy(() => import('@/admin/AdminBlog'));
const AdminMessages = lazy(() => import('@/admin/AdminMessages'));
const AdminSettings = lazy(() => import('@/admin/AdminSettings'));

function AdminFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
      <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <LanguageFade>
          <Routes>
            {/* Public routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/services" element={<Services />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<AdminFallback />}>
                    <AdminOverview />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/appointments"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<AdminFallback />}>
                    <AdminAppointments />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<AdminFallback />}>
                    <AdminDoctors />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/blog"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<AdminFallback />}>
                    <AdminBlog />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/messages"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<AdminFallback />}>
                    <AdminMessages />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<AdminFallback />}>
                    <AdminSettings />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </LanguageFade>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
