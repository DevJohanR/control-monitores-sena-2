import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Ruta para obtener todos los ambientes únicos de la tabla Horario
export async function GET() {
  try {
    // Consulta para obtener los ambientes únicos de la tabla Horario
    const ambientes = await prisma.horario.findMany({
      select: {
        nombreAmbiente: true,  // Solo traemos el nombre del ambiente
      },
      distinct: ['nombreAmbiente'],  // Evitamos duplicados
    });

    // Retornamos los ambientes únicos
    return NextResponse.json(ambientes);
  } catch (error) {
    console.error('Error al obtener los ambientes:', error);
    return NextResponse.json({ error: 'Error al obtener los ambientes' }, { status: 500 });
  }
}
