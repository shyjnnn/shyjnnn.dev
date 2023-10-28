import fs from 'fs/promises';
import path from 'path';

export default async function getCategoryList() {
  const postFolder = path.join(process.cwd(), '__posts');
  const categoryLists = await fs.readdir(postFolder);

  let totalMdCount = 0;

  const fileCounts = await Promise.all(
    categoryLists.map(async (category) => {
      if (category !== '.DS_Store') {
        const files = await fs.readdir(path.join(postFolder, category));
        const mdFiles = files.filter((file) => path.extname(file) === '.md');
        const categoryMdCount = mdFiles.length;
        totalMdCount += categoryMdCount;
        return [category, categoryMdCount];
      }
    })
  );

  const filteredCounts = fileCounts.filter(Boolean);

  filteredCounts.unshift(['all', totalMdCount]);

  return filteredCounts;
}
