import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Ruta dinámica para obtener horarios por nombre del instructor
export async function GET(request: Request, { params }: { params: { nombreInstructor: string } }) {
  const { nombreInstructor } = params;

  try {
    const horarios = await prisma.horario.findMany({
      where: {
        nombreInstructor: nombreInstructor,
      },
    });

    if (!horarios.length) {
      return NextResponse.json({ error: 'No se encontraron horarios para este instructor' }, { status: 404 });
    }

    return NextResponse.json(horarios);
  } catch (error) {
    console.error('Error al obtener los horarios:', error);
    return NextResponse.json({ error: 'Error al obtener los horarios' }, { status: 500 });
  }
}
