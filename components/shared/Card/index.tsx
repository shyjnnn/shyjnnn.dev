import Link from 'next/link';

export default function Card({
  category,
  title,
  slug,
  date,
  en_category,
}: {
  category: string;
  title: string;
  slug: string;
  date: string;
  en_category: string;
}) {
  return (
    <Link href={`/${en_category}/${slug}`}>
      <div className='relative py-10 transition-transform transform duration-250 ease border-t border-gray-200 gap-4 flex flex-col justify-center items-start hover:bg-yellow-gray'>
        <p className='text-black font-normal rounded px-1 text-sm bg-pink-200'>
          {category}
        </p>
        <h3 className='text-3xl font-semibold hover:text-pink-400 transition duration-250'>
          {title}
        </h3>
        <p className='text-zinc-400 text-base font-normal'>{date}</p>
      </div>
    </Link>
  );
}
