/* eslint-disable @typescript-eslint/require-await */

import { NextResponse } from 'next/server';

import { getAllPostsList } from '@/utils/getAllPostList';

export async function GET() {
  const fileContents = await getAllPostsList();
  return NextResponse.json(fileContents);
}
