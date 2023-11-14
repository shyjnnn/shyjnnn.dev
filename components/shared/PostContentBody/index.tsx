'use client';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { MarkdownComponents } from '../MarkdownComponents';

export default function PostContentBody({ content }: { content: string }) {
  return (
    <ReactMarkdown components={MarkdownComponents} rehypePlugins={[rehypeRaw, remarkGfm]}>
      {content}
    </ReactMarkdown>
  );
}
