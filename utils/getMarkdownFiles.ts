import fs from 'fs/promises';
import path from 'path';

// Markdown 파일 가져오기 함수
async function getMarkdownFiles(category: string, title: string): Promise<string> {
  // 'post' 폴더의 경로

  const filePath = path.join(process.cwd(), '_posts', `${category}`, `${title}.mdx`);

  // Markdown 파일 읽기
  const fileContents = await fs.readFile(filePath, 'utf-8');

  return fileContents;
}

export { getMarkdownFiles };
