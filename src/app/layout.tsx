import type { Metadata } from 'next';
import './globals.css';
import { Poppins, Space_Grotesk } from 'next/font/google'; 



const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '500'],
  variable: '--secondary-font',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '500'],
  variable: '--primary-font',
});

export const metadata: Metadata = {
  title: 'KodigoSpark | Inscripción a Bootcamps',
  description:
    'Plataforma de inscripción para bootcamps tecnológicos. Explora, inscríbete y comienza tu carrera en tecnología con un proceso simple y seguro.',
  keywords:
    'bootcamp, programación, tecnología, educación, desarrollo web, inscripción, cursos tech',
  authors: [{ name: 'Kodigo' }],
  openGraph: {
    title: 'KodigoSpark | Tu Puerta al Mundo Tech',
    description: 'Inscríbete en bootcamps tecnológicos y transforma tu futuro.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${spaceGrotesk.variable}`}>{children}</body>
    </html>
  );
}
