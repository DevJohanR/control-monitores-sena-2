import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Ruta para obtener un instructor específico por idInstructor
export async function GET(request: Request, { params }: { params: { idInstructor: string } }) {
  const { idInstructor } = params;

  try {
    // Buscar el instructor por ID
    const instructor = await prisma.instructor.findUnique({
      where: { idInstructor: Number(idInstructor) },
    });

    // Verificar si se encontró el instructor
    if (!instructor) {
      return NextResponse.json({ error: 'Instructor no encontrado' }, { status: 404 });
    }

    return NextResponse.json(instructor);
  } catch (error) {
    console.error('Error al obtener el instructor:', error);
    return NextResponse.json({ error: 'Error al obtener el instructor' }, { status: 500 });
  }
}
