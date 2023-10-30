import '@/styles/global.scss';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import Gnb from '@/components/Gnb';
import Layout from '@/components/shared/Layout';

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
      <body className={pretendard.className}>
        <Layout className='sticky'>
          <Gnb />
        </Layout>
        <Layout tag='main' className='head'>
          {children}
        </Layout>
      </body>
    </html>
  );
}
