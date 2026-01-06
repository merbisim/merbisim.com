import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { inter, spaceGrotesk } from '@/lib/fonts';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import '../globals.css';

export const metadata = {
  title: 'Mehmet Erbişim - Kıyı ve Deniz Yapıları Mühendisi',
  description: 'HEC Engineering & Consulting Genel Müdürü, kıyı mühendisliği, hidrodinamik analiz ve hidrolik mühendisliği uzmanı.',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  //console.log(locale);




  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <NextIntlClientProvider messages={messages}>
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

