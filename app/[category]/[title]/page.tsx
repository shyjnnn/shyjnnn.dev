import Giscus from '@/components/Giscus';
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
    <>
      <Title title={data.title} date={data.date} tags={stringToArray(data.tags)} />
      <>
        <PostContentBody content={content} />
        {tableOfContents.length !== 0 && (
          <TableOfContents tableOfContents={tableOfContents} />
        )}
      </>
      <Giscus />
    </>
  );
}
