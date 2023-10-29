'use client';
import Link from 'next/link';
import { useEffect } from 'react';

import Btn from '@/components/shared/Btn';

export default function NotFound({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>존재하지 않는 페이지입니다.</h2>
      <Btn>
        <Link href={'/'} />
      </Btn>
    </div>
  );
}
