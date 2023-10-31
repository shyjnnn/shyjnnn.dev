import { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const MarkdownComponents: Components = {
  h1: ({ children, ...props }) => {
    return (
      <h1 className='text-5xl font-bold' {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    return (
      <h2 className='text-4xl font-bold' {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    return (
      <h3 className='text-base font-bold' {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) => {
    return (
      <h4 className='text-base font-bold mt-8' {...props}>
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
        className='w-full overflow-x-auto rounded-md'>
        {String(children).replace(/wrapLines\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code
        className='px-1.5 border rounded-md bg-light-blue-gray text-pastel-red italic'
        {...props}>
        {children}
      </code>
    );
  },
  img: (props) => {
    return (
      <img
        src={props.src as string}
        alt={props.alt as string}
        className='w-full'
        width={500}
        height={500}
      />
    );
  },
  p: ({ children, ...props }) => (
    <p className='text-base' {...props}>
      {children}
    </p>
  ),
  ol: ({ children, ...props }) => (
    <ol className='block m-4 pl-10 list-decimal' {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className='pl-1.5' {...props}>
      {children}
    </li>
  ),
  ul: ({ children, ...props }) => (
    <ul className='m-4 pl-10 list-disc' {...props}>
      {children}
    </ul>
  ),
  strong: ({ children, ...props }) => (
    <strong className='font-semibold' {...props}>
      {children}
    </strong>
  ),
  aside: ({ children, ...props }) => (
    <aside className='w-full my-4 p-4 rounded-md bg-light-blue-gray' {...props}>
      {children}
    </aside>
  ),
};
