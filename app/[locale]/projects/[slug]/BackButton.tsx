'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export function BackButton() {
  const t = useTranslations('projects');
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}#projects`}
      className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors group"
    >
      <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span className="font-semibold">{t('backToProjects')}</span>
    </Link>
  );
}

