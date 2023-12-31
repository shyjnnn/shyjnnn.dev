import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

import { PostInfo } from '@/types/api/data.types';

async function getAllPostsList() {
  const postFolder = path.join(process.cwd(), '__posts');

  const allPosts: PostInfo[] = [];

  try {
    const categoryFolders = await fs.readdir(postFolder);

    for (const category of categoryFolders) {
      if (category === '.DS_Store') {
        // .DS_Store 파일이면 스킵
        continue;
      }
      const categoryFolder = path.join(postFolder, category);
      const fileNames = await fs.readdir(categoryFolder);

      for (const fileName of fileNames) {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(categoryFolder, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf-8');
        const matterResult = matter(fileContents);

        const postLists: PostInfo = {
          id,
          title: matterResult.data.title as string,
          date: matterResult.data.date as Date,
          category: matterResult.data.category as string,
          en_category: category,
          thumbnail: matterResult.data?.thumbnail as string,
          summary: matterResult.data?.summary as string,
        };

        allPosts.push(postLists);
      }
    }
    return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    return error;
  }
}

export { getAllPostsList };
