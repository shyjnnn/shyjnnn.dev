import { BASE_URL } from '@/constants/api';
import { PostInfo } from '@/types/api/data.types';

export const getPostsList = async (category: string): Promise<PostInfo[] | Error> => {
  const URL =
    category !== 'all'
      ? `${BASE_URL}/api/category/${category}`
      : `${BASE_URL}/api/category`;

  try {
    const res = await fetch(URL, { cache: 'force-cache' });
    if (!res.ok) {
      throw new Error('게시물을 가져오는 것에 실패했습니다.');
    }
    const posts = (await res.json()) as PostInfo[];
    return posts;
  } catch (error) {
    console.error('알 수 없는 에러가 발생했습니다.', error);
    throw error;
  }
};
