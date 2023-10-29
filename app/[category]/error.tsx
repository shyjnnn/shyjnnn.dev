'use client';

import { useEffect } from 'react';

import Btn from '@/components/shared/Btn';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>에러가 발생했습니다!</h2>
      <Btn onClick={() => reset()}>다시 시도하기</Btn>
    </div>
  );
}
