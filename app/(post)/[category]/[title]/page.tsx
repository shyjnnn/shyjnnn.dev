import Layout from '@/components/shared/Layout';
import PostContentBody from '@/components/shared/PostContentBody';
import TableOfContents from '@/components/TableOfContents';
import { getPost } from '@/services/getPost';
import { getMarkdownToc } from '@/utils/getMarkdownTOC';

export default async function Post({
  params,
}: {
  params: { category: string; title: string };
}) {
  const { category, title } = params;
  const post = await getPost({
    category,
    title,
  });

  if (post instanceof Error) {
    return <></>;
  }

  const { content, data } = post;
  console.log(data); // NOTE : 제거해야함
  const tableOfContents = getMarkdownToc(content);
  console.log(tableOfContents);
  return (
    <Layout tag='main' className='flex'>
      <article>
        <PostContentBody content={content} />
      </article>
      <TableOfContents tableOfContents={tableOfContents} />
    </Layout>
  );
}
