import Giscus from '@/components/Giscus';
import Layout from '@/components/shared/Layout';
import PostContentBody from '@/components/shared/PostContentBody';
import Title from '@/components/shared/Title';
import TableOfContents from '@/components/TableOfContents';
import { getPost } from '@/services/getPost';
import { getMarkdownToc } from '@/utils/getMarkdownTOC';
import { stringToArray } from '@/utils/stringToArray';

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
  const tableOfContents = getMarkdownToc(content);
  return (
    <Layout className='head'>
      <Title title={data.title} date={data.date} tags={stringToArray(data.tags)} />
      <Layout tag='main' className='flex'>
        <Layout tag='article'>
          <PostContentBody content={content} />
        </Layout>
        <TableOfContents tableOfContents={tableOfContents} />
      </Layout>
      <Giscus />
    </Layout>
  );
}
