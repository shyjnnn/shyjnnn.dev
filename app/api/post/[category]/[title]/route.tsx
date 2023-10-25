/* eslint-disable @typescript-eslint/require-await */
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

import { getMarkdownFiles } from '@/utils/getMarkdownFiles';

export async function GET(
  request: Request,
  { params }: { params: { category: string; title: string } }
) {
  const { category, title } = params;

  const fileContents = await getMarkdownFiles(category, title);
  const matterResult = matter(fileContents);

  return NextResponse.json(matterResult);
}
