'use client';

import useHeadingsData from '@/hooks/useHeadingsData';

import Headings from '../shared/Headings';

const TableOfContents: React.FC = () => {
  const { nestedHeadings } = useHeadingsData();

  return (
    <nav aria-label='Table of contents'>
      <Headings headings={nestedHeadings} />
    </nav>
  );
};

export default TableOfContents;
