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


//AQUI
// Agregar una nueva competencia con RA a un programa existente
export async function POST(request: Request, { params }: { params: { programaId: string } }) {
  const programaId = Number(params.programaId);

  if (isNaN(programaId)) {
    return NextResponse.json({ error: 'El ID del programa debe ser un número válido' }, { status: 400 });
  }

  const { nombreCompetencia, ra } = await request.json();

  if (!nombreCompetencia || !Array.isArray(ra) || ra.length === 0) {
    return NextResponse.json(
      { error: 'El nombre de la competencia y al menos un RA son requeridos' },
      { status: 400 }
    );
  }

  try {
    // Verificar si el programa existe
    const programa = await prisma.programa.findUnique({
      where: { idPrograma: programaId },
    });

    if (!programa) {
      return NextResponse.json({ error: 'El programa no existe' }, { status: 404 });
    }

    // Agregar la nueva competencia con los RA
    const nuevaCompetencia = await prisma.competencia.create({
      data: {
        nombreCompetencia,
        programa: { connect: { idPrograma: programaId } },
        ra: {
          create: ra.map((resultado: { descripcionRA: string; acronimoRA: string }) => ({
            descripcionRA: resultado.descripcionRA,
            acronimoRA: resultado.acronimoRA,
          })),
        },
      },
      include: { ra: true },
    });

    return NextResponse.json(nuevaCompetencia, { status: 201 });
  } catch (error) {
    console.error('Error al agregar competencia:', error);
    return NextResponse.json({ error: 'Error al agregar la competencia' }, { status: 500 });
  }
}

