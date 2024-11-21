// app/api/ra/[competenciaId]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener RA para una competencia específica
export async function GET(request: Request, { params }: { params: { competenciaId: string } }) {
  try {
    const resultados = await prisma.rA.findMany({
      where: { competenciaId: Number(params.competenciaId) },
    });
    return NextResponse.json(resultados);
  } catch (error) {
    console.error("Error al obtener los RA:", error);
    return NextResponse.json({ error: "Error al obtener los RA" }, { status: 500 });
  }
}


