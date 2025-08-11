import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { prisma } = await import('@/lib/db'); // 👈 das erwartet lib/db.ts im Root
  const body = await req.json();
  const r = await prisma.recipe.create({
    data: {
      title: String(body.title || 'Rezept'),
      baseServings: Number(body.baseServings || 2),
      currentServings: Number(body.baseServings || 2),
      instructionsMd: String(body.instructionsMd || ''),
      ingredients: {
        create: (body.ingredients || []).map((x: any) => ({
          name: String(x.name),
          gramsBase: Number(x.gramsBase || 0),
        })),
      },
    },
    include: { ingredients: true },
  });
  return NextResponse.json(r, { status: 201 });
}