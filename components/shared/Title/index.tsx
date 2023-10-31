import dateToString from '@/utils/dateToString';

import Chip from '../Chip';

export default function Title({
  title,
  tags,
  date,
}: {
  title: string;
  tags: string[];
  date: string;
}) {
  return (
    <div className='flex flex-col items-start w-full'>
      <h1 className='text-4xl font-semibold'>{title}</h1>
      <nav className='w-full mt-4 flex items-center justify-between'>
        <div className='text-base font-normal text-black'>
          {dateToString(new Date(date))}
        </div>
        <div className='flex gap-2'>
          {tags.map((tag) => (
            <Chip key={tag} text={tag} />
          ))}
        </div>
      </nav>
      <hr className='w-full my-4 border-t border-gray-300' />
    </div>
  );
}
