// app/api/ra/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Crear un RA para una competencia específica
export async function POST(request: Request) {
  const { descripcionRA, competenciaId } = await request.json();

  if (!descripcionRA || !competenciaId) {
    return NextResponse.json({ error: "Descripción del RA y competenciaId son requeridos" }, { status: 400 });
  }

  try {
    const newRA = await prisma.rA.create({
      data: {
        descripcionRA,
        competencia: { connect: { idCompetencia: competenciaId } },
      },
    });
    return NextResponse.json(newRA);
  } catch (error) {
    console.error("Error al crear el RA:", error);
    return NextResponse.json({ error: "Error al crear el RA" }, { status: 500 });
  }
}
