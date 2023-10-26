import { HeadingItem } from '@/types/components/data.types';

const Headings = ({ headings }: { headings: HeadingItem[] }) => (
  <ul>
    {headings.map((heading) => (
      <li key={heading.id}>
        <a href={`#${heading.id}`}>{heading.title}</a>
        {heading.items.length > 0 && (
          <ul>
            {heading.items.map((child) => (
              <li key={child.id}>
                <a href={`#${child.id}`}>{child.title}</a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);
export default Headings;
