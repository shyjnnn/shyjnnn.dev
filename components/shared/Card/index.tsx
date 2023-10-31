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
      <div className='w-full'>
        <div className='relative p-4 transition-transform transform duration-250 ease border border-yellow-gray rounded gap-4 flex flex-col justify-center items-start hover:bg-yellow-gray'>
          <p className='text-blue text-base font-normal'>{category}</p>
          <h3 className='text-4xl font-semibold'>{title}</h3>
          <p className='text-gray text-base font-normal'>{date}</p>
        </div>
      </div>
    </Link>
  );
}
