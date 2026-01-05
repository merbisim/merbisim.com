import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Merbisim Portfolio',
  description: 'Portfolio website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

