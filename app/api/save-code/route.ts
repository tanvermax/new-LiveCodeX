import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { codeStore } from '@/lib/codeStore'; // import the shared store

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    const codeId = nanoid();
    codeStore.set(codeId, code);

    return NextResponse.json({ link: `${process.env.BASE_URL}/code/${codeId}` });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save code' }, { status: 500 });
  }
}
