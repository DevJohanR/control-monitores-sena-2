// app/api/competencias/[programaId]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener competencias de un programa específico
export async function GET(request: Request, { params }: { params: { programaId: string } }) {
  try {
    const competencias = await prisma.competencia.findMany({
      where: { programaId: Number(params.programaId) },
      include: { ra: true },
    });
    return NextResponse.json(competencias);
  } catch (error) {
    console.error("Error al obtener competencias:", error);
    return NextResponse.json({ error: "Error al obtener competencias" }, { status: 500 });
  }
}
