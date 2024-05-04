'use client';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { MarkdownComponents } from '../MarkdownComponents';

export default function PostContentBody({
  content,
  thumbnail,
}: {
  content: string | JSX.Element;
  thumbnail?: string;
}) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <>
      {thumbnail && (
        <Image
          src={thumbnail}
          alt={'thumbnail'}
          width={768}
          height={768}
          className={'w-auto rounded-md drop-shadow-md bg-white mx-auto my-3'}
        />
      )}
      {typeof content === 'string' ? (
        <ReactMarkdown
          components={MarkdownComponents}
          rehypePlugins={[rehypeRaw, remarkGfm]}>
          {content}
        </ReactMarkdown>
      ) : (
        content
      )}
    </>
  );
}
