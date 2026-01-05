'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2025 Mehmet Erbişim. {t('rights')}
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a
              href="https://www.linkedin.com/in/merbisim/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:mehmet@hec-engineering.com"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

