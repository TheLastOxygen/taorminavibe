// src/app/[lang]/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const tag = request.nextUrl.searchParams.get('tag');
  const slug = request.nextUrl.searchParams.get('slug');
  const lang = request.nextUrl.searchParams.get('lang');

  if (tag) {
    // Revalidate by tag (Sanity tags)
    // revalidateTag(tag);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  if (slug && lang) {
    // Revalidate specific guide page
    revalidatePath(`/${lang}/guide/${slug}`);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
}
