import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Inicializamos el cliente de Prisma
const prisma = new PrismaClient();

// Ruta dinámica para obtener horarios por nombre de ambiente
export async function GET(request: Request, { params }: { params: { nombreAmbiente: string } }) {
  const { nombreAmbiente } = params;

  try {
    // Buscar todos los horarios que coincidan con el nombre del ambiente
    const horarios = await prisma.horario.findMany({
      where: {
        nombreAmbiente: nombreAmbiente,
      },
    });

    if (horarios.length === 0) {
      return NextResponse.json({ error: 'No se encontraron horarios para este ambiente' }, { status: 404 });
    }

    return NextResponse.json(horarios);
  } catch (error) {
    console.error('Error al obtener los horarios por ambiente:', error);
    return NextResponse.json({ error: 'Error al obtener los horarios por ambiente' }, { status: 500 });
  }
}
