import Link from 'next/link';

import { createId } from '@/utils/getString';

export default function CategoryText({
  text,
  count,
  isCurrent,
}: {
  text: string;
  count: number;
  isCurrent: boolean;
}) {
  return (
    <Link href={text === 'all' ? '/' : `/${createId(text)}`}>
      <div className='flex items-center gap-1 justify-center w-auto mx-auto'>
        <h1
          className={`text-base font-normal italic border-b-2 border-white hover:border-pink-300 transition duration-250${
            isCurrent ? 'border-b-2 border-pink-300' : ''
          }`}>
          {text.toUpperCase()}
        </h1>
        <p className='text-base font-normal italic text-gray-400'>{`(${count})`}</p>
      </div>
    </Link>
  );
}
