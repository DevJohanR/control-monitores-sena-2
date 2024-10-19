import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Ruta dinámica para obtener horarios por id del instructor
export async function GET(request: Request, { params }: { params: { idInstructor: string } }) {
  const { idInstructor } = params;

  try {
    // Buscar los horarios de ese instructor, incluyendo los datos del instructor
    const horarios = await prisma.horario.findMany({
      where: { idInstructor: Number(idInstructor) },  // Asegúrate de convertir el id a número
      include: {
        instructor: true,  // Incluir los datos del instructor
      },
    });

    if (horarios.length === 0) {
      return NextResponse.json({ error: 'No se encontraron horarios para este instructor' }, { status: 404 });
    }

    return NextResponse.json(horarios);
  } catch (error) {
    console.error('Error al obtener los horarios:', error);
    return NextResponse.json({ error: 'Error al obtener los horarios' }, { status: 500 });
  }
}
