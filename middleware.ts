import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  locales,
  defaultLocale: 'tr',
  localePrefix: 'always'
});

export const config = {
  matcher: [
    '/',
    '/(tr|en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};

