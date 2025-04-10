import { NextResponse } from 'next/server';
import { codeStore } from '@/lib/codeStore'; // import the shared store

export async function GET(req: Request, { params }: { params: { codeId: string } }) {
  const codeId = params.codeId;
  const code = codeStore.get(codeId);

  if (code) {
    return NextResponse.json({ code });
  } else {
    return NextResponse.json({ message: 'Code not found.' }, { status: 404 });
  }
}
