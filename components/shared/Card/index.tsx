import Image from 'next/image';
import Link from 'next/link';

import Chip from '../Chip';

export default function Card({
  category,
  title,
  slug,
  date,
  en_category,
  thumbnail,
  summary,
}: {
  category: string;
  title: string;
  slug: string;
  date: string;
  en_category: string;
  thumbnail?: string;
  summary?: string;
}) {
  return (
    <Link href={`/${en_category}/${slug}`}>
      <div className='relative flex flex-col items-start justify-center gap-4 py-10 transition-transform transform border-t border-gray-200 duration-250 ease hover:bg-yellow-gray'>
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={'thumbnail'}
            width={1104}
            height={1104}
            className={'w-auto rounded-md drop-shadow-md bg-white mx-auto my-3'}
          />
        )}
        <h3 className='text-3xl font-semibold transition hover:text-pink-400 duration-250'>
          {title}
        </h3>
        {summary && <p className='text-base text-black font-norma'>{summary}</p>}
        <Chip variant='category' text={category} />
        <p className='text-base font-normal text-zinc-400'>{date}</p>
      </div>
    </Link>
  );
}
