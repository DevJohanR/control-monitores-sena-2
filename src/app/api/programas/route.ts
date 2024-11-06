// app/api/programas/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { nombrePrograma, competencias } = data;

    // Validaciones básicas
    if (!nombrePrograma) {
      return NextResponse.json({ error: "Nombre del programa es requerido" }, { status: 400 });
    }

    if (!Array.isArray(competencias) || competencias.length === 0) {
      return NextResponse.json({ error: "Al menos una competencia es requerida" }, { status: 400 });
    }

    // Validar cada competencia y sus RA
    for (const competencia of competencias) {
      if (!competencia.nombreCompetencia || !Array.isArray(competencia.ra) || competencia.ra.length === 0) {
        return NextResponse.json({ error: "Cada competencia debe tener un nombre y al menos un RA" }, { status: 400 });
      }
    }

    // Crear el programa junto con competencias y RA asociados
    const newPrograma = await prisma.programa.create({
      data: {
        nombrePrograma,
        competencias: {
          create: competencias.map((competencia) => ({
            nombreCompetencia: competencia.nombreCompetencia,
            ra: {
              create: competencia.ra.map((descripcionRA: string) => ({
                descripcionRA,
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

    console.log("Programa creado con competencias y RA:", JSON.stringify(newPrograma, null, 2));
    return NextResponse.json(newPrograma);
  } catch (error) {
    console.error("Error al crear el programa con competencias y RA:", error);
    return NextResponse.json({ error: "Error al crear el programa con competencias y RA" }, { status: 500 });
  }
}


// Obtener todos los programas
export async function GET() {
  try {
    const programas = await prisma.programa.findMany();
    return NextResponse.json(programas);
  } catch (error) {
    console.error("Error al obtener programas:", error);
    return NextResponse.json({ error: "Error al obtener programas" }, { status: 500 });
  }
}