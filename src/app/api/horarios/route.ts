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


// Método POST: Crear un nuevo horario
export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Datos recibidos:", data);

    const {
      idInstructor,
      asignatura,
      nombreFicha,
      numeroFicha,
      tema,
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
    if (!asignatura || !nombreFicha || !numeroFicha || !tema || !ra || !nombreAmbiente || !bloque || !sede || !jornada || !diaSemana || !numeroTrimestre || !anoTrimestre || !horaInicio || !horaFin) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    // Crear el nuevo horario usando el idInstructor
    const newHorario = await prisma.horario.create({
      data: {
        asignatura,
        nombreFicha,
        numeroFicha,
        tema,
        ra,
        nombreAmbiente,
        bloque,
        sede,
        jornada,
        diaSemana,
        numeroTrimestre: parseInt(numeroTrimestre, 10),
        anoTrimestre: parseInt(anoTrimestre, 10),
        horaInicio: new Date(horaInicio), // Asegurarse de que sea un objeto Date válido
        horaFin: new Date(horaFin),       // Convertir la horaFin también a Date
        idInstructor: idInstructor,       // Relación con Instructor
      },
    });

    console.log("Nuevo horario creado:", newHorario);
    return NextResponse.json(newHorario);
  } catch (error) {
    console.error('Error detallado al crear el horario:', error);

    // Usar un type guard para asegurar que error es de tipo Error
    if (error instanceof Error) {
      return NextResponse.json({ error: `Error al crear el horario: ${error.message}` }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Error desconocido al crear el horario' }, { status: 500 });
    }
  }
}
