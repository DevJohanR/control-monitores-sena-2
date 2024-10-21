import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Ruta para obtener todas las fichas disponibles
export async function GET() {
  try {
    const fichas = await prisma.horario.findMany({
      select: {
        numeroFicha: true,
        nombreFicha: true,
      },
      distinct: ['numeroFicha'], // Evitar duplicados
    });

    return NextResponse.json(fichas);
  } catch (error) {
    console.error('Error al obtener las fichas:', error);
    return NextResponse.json({ error: 'Error al obtener las fichas' }, { status: 500 });
  }
}
