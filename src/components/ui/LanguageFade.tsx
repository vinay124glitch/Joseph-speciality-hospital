import { useEffect, useRef, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageFade({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const langRef = useRef(i18n.language);

  useEffect(() => {
    if (i18n.language !== langRef.current) {
      langRef.current = i18n.language;
      const el = containerRef.current;
      if (el) {
        el.classList.remove('lang-fade');
        void el.offsetWidth;
        el.classList.add('lang-fade');
      }
    }
  }, [i18n.language]);

  return <div ref={containerRef}>{children}</div>;
}
