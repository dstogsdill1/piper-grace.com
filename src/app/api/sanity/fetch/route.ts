import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    let query = '';
    
    switch (type) {
      case 'diary':
        query = `*[_type == "diaryEntry"] | order(_createdAt desc)`;
        break;
      case 'horses':
        query = `*[_type == "horse"] | order(_createdAt desc)`;
        break;
      case 'photos':
        query = `*[_type == "photo"] | order(_createdAt desc)`;
        break;
      case 'scrapbook':
        query = `*[_type == "scrapbookPage"] | order(_createdAt desc)`;
        break;
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const data = await sanityClient.fetch(query);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
