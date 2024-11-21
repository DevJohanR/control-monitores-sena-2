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


export async function PATCH(request: Request, {params}: {params:{idInstructor: string}}) {
  const {idInstructor} = params;
  const {nombreInstructor} = await request.json();

if(!nombreInstructor){
  return NextResponse.json({error: 'Nombre de l instructor es obligatorio'}, {status:400});
}
try{
  const updateInstructor = await prisma.instructor.update({
    where: {idInstructor: Number(idInstructor)},
    data: {nombreInstructor}, 
  })
  return(NextResponse.json(updateInstructor));
}catch(error){
  console.error('error al actualizar el instructor', error);
  return NextResponse.json({error: 'error al actualizar  el instructor'})
}

}


export async function DELETE(request: Request, { params }: { params: { idInstructor: string } }) {
  const { idInstructor } = params;

  try {
    // Convertimos el idInstructor a un número
    const id = Number(idInstructor);

    // Verificamos si la conversión fue exitosa
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID de instructor inválido' }, { status: 400 });
    }

    // Verificar si el instructor existe antes de intentar eliminarlo
    const instructor = await prisma.instructor.findUnique({
      where: { idInstructor: id },
    });

    if (!instructor) {
      return NextResponse.json({ error: 'Instructor no encontrado' }, { status: 404 });
    }

    // Eliminar el instructor
    const deleteInstructor = await prisma.instructor.delete({
      where: { idInstructor: id },
    });

    // Retornar una respuesta exitosa
    return NextResponse.json({ message: 'Instructor eliminado exitosamente', instructorEliminado: deleteInstructor });

  } catch (error) {
    console.error('Error al eliminar el instructor:', error);
    return NextResponse.json({ error: 'Error al eliminar el instructor' }, { status: 500 });
  }
}
