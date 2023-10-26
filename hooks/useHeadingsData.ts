import { useEffect, useState } from 'react';

import { HeadingItem } from '@/types/components/data.types';
import getNestedHeadings from '@/utils/getNestedHeadings';

const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState<HeadingItem[]>([]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3, h4'));

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
};

export default useHeadingsData;
