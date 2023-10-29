import classNames from 'classnames/bind';
import Image from 'next/image';
import { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { createId } from '@/utils/getString';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);
export const MarkdownComponents: Components = {
  h1: ({ children, ...props }) => {
    const id = createId(children);
    return (
      <h1 className={cx('h1')} id={id} {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    const id = createId(children);
    return (
      <h2 className={cx('h2')} id={id} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = createId(children);
    return (
      <h3 className={cx('h3')} id={id} {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) => {
    const id = createId(children);
    return (
      <h4 className={cx('h4')} id={id} {...props}>
        {children}
      </h4>
    );
  },
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return match ? (
      <SyntaxHighlighter
        showLineNumbers
        PreTag='div'
        language={match[1]}
        wrapLines
        style={materialDark}
        className={cx('codeblock')}
        lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}>
        {String(children).replace(/wrapLines\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={cx('code')} {...props}>
        {children}
      </code>
    );
  },

  img: (props) => {
    return (
      <Image
        src={props.src as string}
        alt={props.alt as string}
        className={cx('img')}
        width={500}
        height={500}
      />
    );
  },
  p: ({ children, ...props }) => (
    <p className={cx('p')} {...props}>
      {children}
    </p>
  ),

  ol: ({ children, ...props }) => (
    <ol className={cx('ol')} {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className={cx('li')} {...props}>
      {children}
    </li>
  ),
  ul: ({ children, ...props }) => (
    <ul className={cx('ul')} {...props}>
      {children}
    </ul>
  ),

  strong: ({ children, ...props }) => (
    <strong className={cx('strong')} {...props}>
      {children}
    </strong>
  ),

  aside: ({ children, ...props }) => (
    <aside className={cx('aside')} {...props}>
      {children}
    </aside>
  ),
};
