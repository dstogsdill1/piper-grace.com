import { NextRequest, NextResponse } from 'next/server';
import { sanityWriteClient } from '@/lib/sanity';

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();

    let result;

    switch (type) {
      case 'diary':
        result = await sanityWriteClient.create({
          _type: 'diaryEntry',
          title: data.title,
          content: data.content,
          mood: data.mood,
          date: new Date().toISOString(),
        });
        break;

      case 'horse':
        result = await sanityWriteClient.create({
          _type: 'horse',
          name: data.name,
          color: data.color,
          personality: data.personality,
          story: data.story,
        });
        break;

      case 'scrapbook':
        result = await sanityWriteClient.create({
          _type: 'scrapbookPage',
          title: data.title,
          content: data.content,
          stickers: data.stickers || [],
          backgroundColor: data.backgroundColor || '#fce7f3',
        });
        break;

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Sanity create error:', error);
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    await sanityWriteClient.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sanity delete error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
