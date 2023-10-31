import { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { createId } from '@/utils/getString';

export const MarkdownComponents: Components = {
  h1: ({ children, ...props }) => {
    const id = createId(children);

    return (
      <h1 className='mt-24 mb-10 text-4xl font-bold' id={id} {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    const id = createId(children);
    return (
      <h2 className='mt-20 mb-8 text-3xl font-bold' id={id} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = createId(children);
    return (
      <h3 className='mt-16 mb-6 text-2xl font-bold' id={id} {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) => {
    const id = createId(children);
    return (
      <h4 className='mt-12 mb-4 font-bold text-1xl' id={id} {...props}>
        {children}
      </h4>
    );
  },
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return match ? (
      <SyntaxHighlighter
        PreTag='div'
        language={match[1]}
        style={materialDark}
        className='overflow-x-auto rounded-md'>
        {String(children).replace(/wrapLines\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className='px-2 italic bg-gray-200 border-0 rounded-md' {...props}>
        {children}
      </code>
    );
  },
  img: (props) => {
    return (
      <img
        src={props.src as string}
        alt={props.alt as string}
        className='w-full rounded'
        width={500}
        height={500}
      />
    );
  },
  p: ({ children, ...props }) => (
    <p className='my-4 text-base' {...props}>
      {children}
    </p>
  ),
  ol: ({ children, ...props }) => (
    <ol className='block pl-10 m-4 list-decimal' {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className='pl-1.5 my-2' {...props}>
      {children}
    </li>
  ),
  ul: ({ children, ...props }) => (
    <ul className='pl-10 m-2 list-disc' {...props}>
      {children}
    </ul>
  ),
  strong: ({ children, ...props }) => (
    <strong className='font-semibold' {...props}>
      {children}
    </strong>
  ),
  aside: ({ children, ...props }) => (
    <aside className='w-full p-4 my-4 rounded-md bg-light-blue-gray' {...props}>
      {children}
    </aside>
  ),
  hr: ({ ...props }) => <hr className='my-12' {...props} />,

  a: ({ children, ...props }) => (
    <a className='underline hover:text-pink-400' {...props}>
      {children}
    </a>
  ),
};
