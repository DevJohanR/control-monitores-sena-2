import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Inicializamos el cliente de Prisma
const prisma = new PrismaClient();

// Ruta dinámica para obtener una ficha específica por número de ficha
export async function GET(request: Request, { params }: { params: { numeroFicha: string } }) {
  const { numeroFicha } = params;

  try {
    // Buscar todos los horarios para esa ficha
    const horarios = await prisma.horario.findMany({
      where: { numeroFicha: numeroFicha },
      include: {
        instructor: true,  // Incluir los datos del instructor en cada horario
      },
    });

    if (horarios.length === 0) {
      return NextResponse.json({ error: 'No se encontraron horarios para esta ficha' }, { status: 404 });
    }

    return NextResponse.json(horarios); // Devolvemos un arreglo de horarios
  } catch (error) {
    console.error('Error al obtener la ficha:', error);
    return NextResponse.json({ error: 'Error al obtener la ficha' }, { status: 500 });
  }
}
