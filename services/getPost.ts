import { BASE_URL } from '@/constants/api';
import { BlogPost } from '@/types/api/data.types';

export const getPost = async ({
  category,
  title,
}: {
  category: string;
  title: string;
}): Promise<BlogPost | Error> => {
  const URL = `${BASE_URL}/api/post/${category}/${title}`;

  try {
    const res = await fetch(URL, { cache: 'force-cache' });
    if (!res.ok) {
      throw new Error('게시물을 가져오는 것에 실패했습니다.');
    }
    const post: BlogPost = (await res.json()) as BlogPost;
    return post;
  } catch (error) {
    console.error('알 수 없는 에러가 발생했습니다.', error);
    throw error;
  }
};
