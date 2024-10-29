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


export async function POST (request: Request){
  const {nombreInstructor} = await request.json();

  if(!nombreInstructor){
    return NextResponse.json({error: "Todos los campos son obligatorios"}, {status: 400 });
  }

  try{
    const newInstructor = await prisma.instructor.create({
      data:{
        nombreInstructor,
      }
    });
    return NextResponse.json(newInstructor);
  }catch (error) {
    console.error("Error al crear el instructor:", error);
    return NextResponse.json({ error: "Error al crear el instructor" }, { status: 500 });
  }
}