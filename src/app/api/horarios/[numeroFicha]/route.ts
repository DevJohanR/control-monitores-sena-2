import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { numeroFicha: string } }) {
  const { numeroFicha } = params;
  console.log('Número de Ficha recibido en la API:', numeroFicha); // Debug

  try {
    const horarios = await prisma.horario.findMany({
      where: { numeroFicha: numeroFicha },
      include: {
        instructor: true,
      },
    });

    console.log('Horarios obtenidos para la ficha:', horarios); // Debug

    if (horarios.length === 0) {
      return NextResponse.json({ error: 'No se encontraron horarios para esta ficha' }, { status: 404 });
    }

    return NextResponse.json(horarios);
  } catch (error) {
    console.error('Error al obtener la ficha:', error);
    return NextResponse.json({ error: 'Error al obtener la ficha' }, { status: 500 });
  }
}
