import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const instructores = await prisma.instructor.findMany();
    return NextResponse.json(instructores);
  } catch (error) {
    console.error('Error al obtener los instructores:', error); // Usar la variable 'error'
    return NextResponse.json({ error: 'Error al obtener los instructores' }, { status: 500 });
  }
}
