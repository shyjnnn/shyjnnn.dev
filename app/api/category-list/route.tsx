/* eslint-disable @typescript-eslint/require-await */

import { NextResponse } from 'next/server';

import getCategoryList from '@/utils/getCategoryList';

export async function GET() {
  const categoryList = await getCategoryList();
  return NextResponse.json(categoryList);
}
