'use client';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { TableOfContents } from '@/types/components/data.types';
import { getIntersectionObserver } from '@/utils/getIntersectionObserver';
import { createId, getRawString } from '@/utils/getString';

interface TableOfContentItemProps {
  text: string;
  level: string;
  isActive: boolean;
  onCurrentId: Dispatch<SetStateAction<string>>;
}

const TableOfContentItem = ({
  text,
  level,
  isActive,
  onCurrentId,
}: TableOfContentItemProps) => {
  const id = createId(text);
  const handleClick = () => {
    onCurrentId(id);
  };
  const itemClasses = `block py-1 hover:underline ${
    level === 'level-2'
      ? 'pl-6'
      : level === 'level-3'
      ? 'pl-12'
      : level === 'level-4'
      ? 'pl-24'
      : ''
  } ${isActive ? 'text-pink-400' : 'text-zinc-400'}`;

  return (
    <Link id={id} className={itemClasses} onClick={handleClick} href={`#${id}`}>
      {getRawString(text)}
    </Link>
  );
};

const TableOfContents = ({ tableOfContents }: { tableOfContents: TableOfContents[] }) => {
  let lastLevel = 1;
  const [currentId, setCurrentId] = useState<string>('');
  const [, setHeadingEls] = useState<Element[]>([]);

  useEffect(() => {
    const observer = getIntersectionObserver(setCurrentId);
    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3, h3'));

    setHeadingEls(headingElements);

    headingElements.map((header) => {
      observer.observe(header);
    });
  }, []);

  useEffect(() => {}, [currentId]);

  return (
    <div className='sticky top-[120px] hidden min-w-[240px] max-w-[260px] self-start lg:block'>
      <div className='overflow-hidden transition-all'>
        <div className='text-lg font-bold'>ON THIS PAGE</div>
        <div className='flex flex-col items-start justify-start mt-2 text-sm'>
          {tableOfContents.map((content, index) => {
            let level = `level-${content.level}`;
            if (content.level > lastLevel + 1) {
              level = `level-${lastLevel + 1}`;
            }
            lastLevel = content.level;
            return (
              <TableOfContentItem
                key={index}
                text={content.text}
                level={level}
                isActive={currentId === createId(content.text)}
                onCurrentId={setCurrentId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
