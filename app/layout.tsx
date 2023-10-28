import '@/styles/global.scss';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import Gnb from '@/components/Gnb';
import { getCategories } from '@/services/getCategories';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
});

export const metadata: Metadata = {
  title: 'blog.shyjnnn.dev',
  description: 'shyjnnn의 개발 블로그',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories: [string, number][] | Error = await getCategories();

  if (categories instanceof Error) throw Error;

  return (
    <html lang='ko'>
      <body className={pretendard.className}>
        <Gnb />
        {children}
      </body>
    </html>
  );
}
