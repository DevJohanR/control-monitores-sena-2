import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todas las fichas
export async function GET() {
  try {
    const fichas = await prisma.ficha.findMany();
    return NextResponse.json(fichas);
  } catch (error) {
    console.error('Error al obtener las fichas:', error);
    return NextResponse.json({ error: 'Error al obtener las fichas' }, { status: 500 });
  }
}

// Crear una nueva ficha
export async function POST(request: Request) {
  const { numeroFicha } = await request.json();

  if (!numeroFicha) {
    return NextResponse.json(
      { error: 'El número de ficha es obligatorio' },
      { status: 400 }
    );
  }

  try {
    const nuevaFicha = await prisma.ficha.create({
      data: { numeroFicha },
    });
    return NextResponse.json(nuevaFicha);
  } catch (error) {
    console.error('Error al crear la ficha:', error);
    return NextResponse.json({ error: 'Error al crear la ficha' }, { status: 500 });
  }
}
