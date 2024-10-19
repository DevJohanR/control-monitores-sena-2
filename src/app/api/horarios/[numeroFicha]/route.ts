import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Inicializamos el cliente de Prisma
const prisma = new PrismaClient();

// Ruta dinámica para obtener una ficha específica por número de ficha
export async function GET(request: Request, { params }: { params: { numeroFicha: string } }) {
  const { numeroFicha } = params;

  try {
    const ficha = await prisma.horario.findFirst({
      where: { numeroFicha: numeroFicha },
      include: {
        instructor: true,  // Incluir los datos del instructor
      },
    });

    if (!ficha) {
      return NextResponse.json({ error: 'Ficha no encontrada' }, { status: 404 });
    }

    return NextResponse.json(ficha);
  } catch (error) {
    console.error('Error al obtener la ficha:', error);
    return NextResponse.json({ error: 'Error al obtener la ficha' }, { status: 500 });
  }
}
