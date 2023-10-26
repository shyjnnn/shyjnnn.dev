import PostContentBody from '@/components/shared/PostContentBody';
import { getPost } from '@/services/getPost';

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
  console.log(data);
  return (
    <div>
      <PostContentBody content={content} />
    </div>
  );
}
