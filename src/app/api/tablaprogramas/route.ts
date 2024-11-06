// app/api/tablaprogramas/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const programas = await prisma.programa.findMany({
      include: {
        competencias: {
          include: {
            ra: true,
          },
        },
      },
    });
    return NextResponse.json(programas);
  } catch (error) {
    console.error("Error al obtener programas:", error);
    return NextResponse.json({ error: "Error al obtener programas" }, { status: 500 });
  }
}
