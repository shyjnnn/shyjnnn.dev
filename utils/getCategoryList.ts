import fs from 'fs/promises';
import path from 'path';

export default async function getCategoryList() {
  const postFolder = path.join(process.cwd(), '_posts');
  const categoryLists = await fs.readdir(postFolder);

  return categoryLists.filter((category) => category != '.DS_Store');
}
