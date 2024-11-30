import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Método GET: Obtener todos los horarios
export async function GET() {
  try {
    const horarios = await prisma.horario.findMany({
      include: {
        instructor: true,  // Incluir los datos del instructor en cada horario
      },
    });

    // Asegúrate de devolver un array vacío si no hay resultados
    return NextResponse.json(horarios || []); 
  } catch (error) {
    console.error('Error al obtener los horarios:', error);
    return NextResponse.json({ error: 'Error al obtener los horarios' }, { status: 500 });
  }
}


// Método POST: Crear un nuevo horario con validación de solapamientos
export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Datos recibidos:", data);

    const {
      idInstructor,
      nombrePrograma,
      numeroFicha,
      competencia,
      ra,
      nombreAmbiente,
      bloque,
      sede,
      jornada,
      diaSemana,
      numeroTrimestre,
      anoTrimestre,
      horaInicio,
      horaFin,
    } = data;

    // Validar que el idInstructor esté presente
    if (!idInstructor) {
      return NextResponse.json({ error: 'ID del instructor es requerido' }, { status: 400 });
    }

    // Validar los campos requeridos
    if (
      !nombrePrograma ||
      !numeroFicha ||
      !competencia ||
      !ra ||
      !nombreAmbiente ||
      !bloque ||
      !sede ||
      !jornada ||
      !diaSemana ||
      !numeroTrimestre ||
      !anoTrimestre ||
      !horaInicio ||
      !horaFin
    ) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    // Convertir las fechas
    const inicio = new Date(horaInicio);
    const fin = new Date(horaFin);

    // Validar solapamientos por instructor
    const instructorOverlap = await prisma.horario.findFirst({
      where: {
        idInstructor,
        diaSemana,
        OR: [
          { horaInicio: { lte: fin }, horaFin: { gte: inicio } }, // Rango solapado
        ],
      },
    });

    if (instructorOverlap) {
      return NextResponse.json(
        { error: 'El instructor ya tiene un horario asignado en este rango de tiempo.' },
        { status: 400 }
      );
    }

    // Validar solapamientos por ambiente, considerando la sede
    // Se asegura que solo se detecten solapamientos dentro de la misma sede y con el mismo ambiente.
    const ambienteOverlap = await prisma.horario.findFirst({
      where: {
        nombreAmbiente,
        sede, // Validación específica por sede
        diaSemana,
        OR: [
          { horaInicio: { lte: fin }, horaFin: { gte: inicio } }, // Rango solapado
        ],
      },
    });

    if (ambienteOverlap) {
      return NextResponse.json(
        { error: 'El ambiente ya está reservado en este rango de tiempo en esta sede.' },
        { status: 400 }
      );
    }

    // Validar solapamientos por ficha
    const fichaOverlap = await prisma.horario.findFirst({
      where: {
        numeroFicha,
        diaSemana,
        OR: [
          { horaInicio: { lte: fin }, horaFin: { gte: inicio } }, // Rango solapado
        ],
      },
    });

    if (fichaOverlap) {
      return NextResponse.json(
        { error: 'La ficha ya tiene un horario asignado en este rango de tiempo.' },
        { status: 400 }
      );
    }

    // Si no hay solapamientos, crear el nuevo horario
    const newHorario = await prisma.horario.create({
      data: {
        nombrePrograma,
        numeroFicha,
        competencia,
        ra,
        nombreAmbiente,
        bloque,
        sede,
        jornada,
        diaSemana,
        numeroTrimestre: parseInt(numeroTrimestre, 10),
        anoTrimestre: parseInt(anoTrimestre, 10),
        horaInicio: inicio,
        horaFin: fin,
        idInstructor,
      },
    });

    console.log("Nuevo horario creado:", newHorario);
    return NextResponse.json(newHorario);
  } catch (error) {
    console.error('Error detallado al crear el horario:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Error al crear el horario: ${error.message}` },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: 'Error desconocido al crear el horario' },
        { status: 500 }
      );
    }
  }
}




// Método DELETE: Eliminar un horario
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idHorario = searchParams.get('idHorario');

    if (!idHorario) {
      return NextResponse.json({ error: 'ID del horario es requerido' }, { status: 400 });
    }

    await prisma.horario.delete({
      where: {
        idHorario: parseInt(idHorario, 10),
      },
    });

    return NextResponse.json({ message: 'Horario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el horario:', error);
    return NextResponse.json({ error: 'Error al eliminar el horario' }, { status: 500 });
  }
}