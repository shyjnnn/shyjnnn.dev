'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { CATEGORY_MAP } from '@/constants/api';
import { createId } from '@/utils/getString';

export default function CategoryText({ text, count }: { text: string; count: number }) {
  const params = useParams();
  const isCurrent = params?.category ? params?.category === text : 'all' === text;
  return (
    <Link href={text === 'all' ? '/' : `/${createId(text)}`}>
      <div className='flex items-center justify-center w-auto gap-1 mx-auto'>
        <h1
          className={`text-base font-normal italic border-b-2 hover:border-pink-300 transition duration-250 ${
            isCurrent ? 'border-pink-300' : 'border-white'
          }`}>
          {CATEGORY_MAP[text] || text.toUpperCase()}
        </h1>
        <p className='text-base italic font-normal text-gray-400'>{`(${count})`}</p>
      </div>
    </Link>
  );
}
