import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener una ficha específica
export async function GET(request: Request, { params }: { params: { idFicha: string } }) {
  const { idFicha } = params;

  try {
    const ficha = await prisma.ficha.findUnique({
      where: { idFicha: Number(idFicha) },
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

// Actualizar una ficha específica
export async function PATCH(request: Request, { params }: { params: { idFicha: string } }) {
  const { idFicha } = params;
  const { numeroFicha } = await request.json();

  if (!numeroFicha) {
    return NextResponse.json(
      { error: 'El número de ficha es obligatorio' },
      { status: 400 }
    );
  }

  try {
    const fichaActualizada = await prisma.ficha.update({
      where: { idFicha: Number(idFicha) },
      data: { numeroFicha },
    });

    return NextResponse.json(fichaActualizada);
  } catch (error) {
    console.error('Error al actualizar la ficha:', error);
    return NextResponse.json({ error: 'Error al actualizar la ficha' }, { status: 500 });
  }
}

// Eliminar una ficha específica
export async function DELETE(request: Request, { params }: { params: { idFicha: string } }) {
  const { idFicha } = params;

  try {
    await prisma.ficha.delete({
      where: { idFicha: Number(idFicha) },
    });
    return NextResponse.json({ message: 'Ficha eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la ficha:', error);
    return NextResponse.json({ error: 'Error al eliminar la ficha' }, { status: 500 });
  }
}
