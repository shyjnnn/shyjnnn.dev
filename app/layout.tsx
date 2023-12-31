import '@/styles/global.scss';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import Gnb from '@/components/Gnb';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
});

export const metadata: Metadata = {
  title: 'blog.shyjnnn.dev',
  description: 'shyjnnn의 개발 블로그',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body
        className={
          (pretendard.className,
          'max-w-6xl mx-auto my-0 p-6 sm:w-full md:w-full lg:w-full')
        }>
        <Gnb />
        {children}
      </body>
    </html>
  );
}
