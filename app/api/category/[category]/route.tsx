/* eslint-disable @typescript-eslint/require-await */

import { NextResponse } from 'next/server';

import { getPostsByCategory } from '@/utils/getPostsByCategory';

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  const { category } = params;

  const fileContents = await getPostsByCategory(category);
  return NextResponse.json(fileContents);
}
