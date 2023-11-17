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
        className='w-auto rounded-md max-h-96'
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
    <aside className='w-full p-4 my-10 bg-gray-100 rounded-md' {...props}>
      {children}
    </aside>
  ),

  hr: ({ ...props }) => <hr className='my-12' {...props} />,

  a: ({ children, ...props }) => (
    <a className='underline hover:text-pink-400' {...props}>
      {children}
    </a>
  ),
  table: ({ children }) => (
    <table className='border border-collapse border-gray-200'>{children}</table>
  ),
  thead: ({ children }) => <thead className='bg-gray-100'>{children}</thead>,
  th: ({ children }) => <th className='px-3 py-2 border border-gray-200 '>{children}</th>,
  tbody: ({ children }) => <tbody className=''>{children}</tbody>,
  tr: ({ children }) => <tr className=''>{children}</tr>,
  td: ({ children }) => {
    return <td className='px-3 py-2 border border-gray-200'>{children}</td>;
  },

  blockquote: ({ children }) => (
    <blockquote className='pl-3 my-6 border-l-4 border-black'>{children}</blockquote>
  ),
};
