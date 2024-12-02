// app/api/competencias/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define los tipos para las competencias y RA
interface Ra {
  descripcionRA: string;
  acronimoRA: string;
}

interface Competencia {
  nombreCompetencia: string;
  ra: Ra[];
}

// Obtener todos los programas con competencias y RA
export async function GET() {
  try {
    const programas = await prisma.programa.findMany({
      include: {
        competencias: {
          include: {
            ra: true, // Incluye los RA para cada competencia
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

// Crear un nuevo programa con competencias y RA
export async function POST(request: Request) {
  const data = await request.json();
  const { nombrePrograma, competencias }: { nombrePrograma: string; competencias: Competencia[] } = data;

  try {
    const newPrograma = await prisma.programa.create({
      data: {
        nombrePrograma,
        competencias: {
          create: competencias.map((competencia) => ({
            nombreCompetencia: competencia.nombreCompetencia,
            ra: {
              create: competencia.ra.map((ra) => ({
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
