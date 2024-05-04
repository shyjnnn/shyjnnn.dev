import dateToString from '@/utils/dateToString';

import Chip from '../Chip';

export default function Title({
  title,
  tags,
  date,
}: {
  title: string;
  tags?: string[];
  date?: string;
}) {
  return (
    <div className='flex flex-col items-start w-full'>
      <h1 className='text-4xl font-extrabold'>{title}</h1>
      <nav className='flex items-center justify-between w-full mt-4'>
        {date && (
          <div className='text-sm font-normal text-gray-500'>
            {dateToString(new Date(date))}
          </div>
        )}
        <div className='flex gap-2'>
          {tags && tags.map((tag) => <Chip key={tag} text={tag} />)}
        </div>
      </nav>
      <hr className='w-full my-4 border-t border-gray-200' />
    </div>
  );
}
