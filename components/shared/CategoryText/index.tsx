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
      <div className='flex items-center gap-2 justify-center w-auto mx-auto'>
        <h1
          className={`text-size5 font-normal italic ${
            isCurrent ? 'text-blue underline' : 'hover:underline'
          }`}>
          {text.toUpperCase()}
        </h1>
        <p className='text-size6 font-normal italic text-gray'>{`(${count})`}</p>
      </div>
    </Link>
  );
}
