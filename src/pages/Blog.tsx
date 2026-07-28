import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, User, Tag, Loader2 } from 'lucide-react';
import PageHeader, { CTASection } from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import { supabase, type BlogPost } from '@/utils/supabase';

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [current, setCurrent] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPosts(data || []);
        if (slug) {
          setCurrent(data?.find((p) => p.slug === slug) || null);
        }
        setLoading(false);
      });
  }, [slug]);

  const locale = i18n.language === 'ta' ? 'ta-IN' : 'en-IN';

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  if (slug) {
    if (!current) {
      return (
        <div className="container-x py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t('blog.notFound')}
          </h2>
          <Link to="/blog" className="btn-secondary mt-6">
            <ArrowLeft className="w-4 h-4" /> {t('blog.backToBlogBtn')}
          </Link>
        </div>
      );
    }
    return (
      <>
        <PageHeader
          title={current.title}
          breadcrumb={t('nav.blog')}
          image={current.image_url || undefined}
        />
        <section className="section-pad bg-white dark:bg-slate-950">
          <div className="container-x max-w-3xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 mb-6 hover:gap-2.5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> {t('blog.backToAllArticles')}
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" /> {current.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="w-4 h-4" /> {current.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(current.created_at)}
              </span>
            </div>
            {current.image_url && (
              <img
                src={current.image_url}
                alt={current.title}
                className="w-full rounded-2xl object-cover h-72 sm:h-96 shadow-card mb-8"
                loading="lazy"
              />
            )}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {current.content.split('\n').map((para, i) => (
                <p
                  key={i}
                  className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 whitespace-pre-line"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
        <CTASection />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={t('blog.title')}
        subtitle={t('blog.subtitle')}
        breadcrumb={t('nav.blog')}
      />

      <section className="section-pad bg-white dark:bg-slate-950">
        <div className="container-x">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="card overflow-hidden card-hover group flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image_url || 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=600'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 badge bg-brand-600/90 text-white">
                    {post.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(post.created_at)}
                  </p>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-2.5 transition-all"
                  >
                    {t('blog.readMore')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16">
              <SectionHeading
                title={t('blog.noArticles')}
                subtitle={t('blog.noArticlesSubtitle')}
              />
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
