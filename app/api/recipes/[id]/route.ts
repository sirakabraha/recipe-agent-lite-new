import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: any) {
  const { prisma } = await import('@/lib/db'); // 👈
  const id = params?.id as string;

  const r = await prisma.recipe.findUnique({
    where: { id },
    include: { ingredients: true },
  });
  if (!r) return NextResponse.json({ error: 'not found' }, { status: 404 });

  const factor = r.currentServings / r.baseServings;
  const ingredients = r.ingredients.map((i: any) => ({
    ...i,
    gramsScaled: i.gramsBase * factor,
  }));

  return NextResponse.json({ ...r, ingredients });
}