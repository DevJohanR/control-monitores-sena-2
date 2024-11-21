// app/api/programas/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Definir interfaces para los datos recibidos en el POST
interface RAData {
  descripcionRA: string;
  acronimoRA: string;
}

interface CompetenciaData {
  nombreCompetencia: string;
  ra: RAData[];
}

interface ProgramaData {
  nombrePrograma: string;
  competencias: CompetenciaData[];
}

export async function POST(request: Request) {
  const data: ProgramaData = await request.json();
  const { nombrePrograma, competencias } = data;

  try {
    const newPrograma = await prisma.programa.create({
      data: {
        nombrePrograma,
        competencias: {
          create: competencias.map((competencia: CompetenciaData) => ({
            nombreCompetencia: competencia.nombreCompetencia,
            ra: {
              create: competencia.ra.map((ra: RAData) => ({
                descripcionRA: ra.descripcionRA,
                acronimoRA: ra.acronimoRA, // Incluye acronimoRA
              })),
            },
          })),
        },
      },
      include: {
        competencias: {
          include: {
            ra: true,
          },
        },
      },
    });

    return NextResponse.json(newPrograma);
  } catch (error) {
    console.error("Error al crear el programa con competencias y RA:", error);
    return NextResponse.json({ error: "Error al crear el programa con competencias y RA" }, { status: 500 });
  }
}

// Obtener todos los programas
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
