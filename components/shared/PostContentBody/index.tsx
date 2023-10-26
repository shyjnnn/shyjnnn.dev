'use client';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { MarkdownComponents } from '../MarkdownComponents';

export default function PostContentBody({ content }: { content: string }) {
  return (
    <ReactMarkdown components={MarkdownComponents} rehypePlugins={[rehypeRaw]}>
      {content}
    </ReactMarkdown>
  );
}
