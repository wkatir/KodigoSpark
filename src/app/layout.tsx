import type { Metadata } from 'next';
import './globals.css';
import { Poppins, Space_Grotesk } from 'next/font/google'; 



export const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '500']
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '500']
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
      <body>{children}</body>
    </html>
  );
}
