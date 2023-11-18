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
      <div className='relative gap-8 lg:flex'>
        <article
          className={`w-full prose prose-neutral md:max-w-none font-spoqa dark:prose-dark ${
            tableOfContents.length !== 0 ? 'lg:max-w-3xl' : ''
          }`}>
          <PostContentBody
            content={content}
            thumbnail={data?.thumbnail ? data.thumbnail : undefined}
          />
        </article>
        {tableOfContents.length !== 0 && (
          <nav className='mt-12 ml-auto'>
            <TableOfContents tableOfContents={tableOfContents} />
          </nav>
        )}
      </div>
      <Giscus />
    </>
  );
}
