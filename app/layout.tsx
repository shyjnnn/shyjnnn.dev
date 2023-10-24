import '@/styles/global.scss';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

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
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
