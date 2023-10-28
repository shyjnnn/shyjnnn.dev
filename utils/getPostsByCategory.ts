import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

import { PostInfo } from '@/types/api/data.types';

async function getPostsByCategory(category: string) {
  const categoryFolder = path.join(process.cwd(), '_posts', category);

  try {
    const fileNames = await fs.readdir(categoryFolder);

    const allPostsData = await Promise.all(
      fileNames.map(async (fileName) => {
        const id = fileName.replace(/\.md$/, '');

        const fullPath = path.join(categoryFolder, fileName);

        const fileContents = await fs.readFile(fullPath, 'utf-8');

        const matterResult = matter(fileContents);

        const PostInfo: PostInfo = {
          id,
          title: matterResult.data.title as string,
          date: matterResult.data.date as string,
          category: matterResult.data.category as string,
          en_category: category,
        };

        return PostInfo;
      })
    );

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    return error;
  }
}

export { getPostsByCategory };
