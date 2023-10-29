const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
export const getCategories = async (): Promise<[string, number][] | Error> => {
  const URL = `https://${BASE_URL}/api/category-list`;
  console.log(URL);

  try {
    const res = await fetch(URL, { cache: 'force-cache' });
    if (!res.ok) {
      throw new Error('게시물을 가져오는 것에 실패했습니다.');
    }
    const categories = (await res.json()) as [string, number][];
    return categories;
  } catch (error) {
    console.error('알 수 없는 에러가 발생했습니다.', error);
    throw error;
  }
};
