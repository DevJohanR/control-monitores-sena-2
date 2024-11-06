// app/api/programas/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  console.log("Datos recibidos en el backend:", JSON.stringify(data, null, 2)); // Depuración para ver datos

  const { nombrePrograma, competencias } = data;

  if (!nombrePrograma) {
    return NextResponse.json({ error: "Nombre del programa es requerido" }, { status: 400 });
  }

  if (!Array.isArray(competencias) || competencias.length === 0) {
    return NextResponse.json({ error: "Al menos una competencia es requerida" }, { status: 400 });
  }

  try {
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

    console.log("Programa creado con competencias y RA:", JSON.stringify(newPrograma, null, 2)); // Depuración
    return NextResponse.json(newPrograma);
  } catch (error) {
    console.error("Error al crear el programa con competencias y RA:", error);
    return NextResponse.json({ error: "Error al crear el programa con competencias y RA" }, { status: 500 });
  }
}
