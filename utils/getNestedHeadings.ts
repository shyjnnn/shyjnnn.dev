import { HeadingItem } from '@/types/components/data.types';

const getNestedHeadings = (headingElements: Element[]) => {
  const nestedHeadings: HeadingItem[] = [];
  const lastItems: HeadingItem[] = [];

  headingElements.forEach((heading) => {
    const { innerText: title } = heading as HTMLElement;
    const level = parseInt(heading.nodeName.slice(1)) - 1;

    const newItem: HeadingItem = { id: title, title, items: [] };

    if (level === 0 || !lastItems[level - 1]) {
      nestedHeadings.push(newItem);
    } else {
      lastItems[level - 1].items.push(newItem);
    }

    lastItems[level] = newItem;
  });

  return nestedHeadings;
};

export default getNestedHeadings;
