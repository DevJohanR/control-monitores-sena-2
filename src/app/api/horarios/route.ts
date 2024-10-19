import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Inicializamos el cliente de Prisma
const prisma = new PrismaClient();

// Método GET: Obtener todos los horarios
export async function GET() {
  try {
    const horarios = await prisma.horario.findMany(); // Consulta todos los horarios
    return NextResponse.json(horarios);
  } catch (error) {
    console.error('Error al obtener los horarios:', error);
    return NextResponse.json({ error: 'Error al obtener los horarios' }, { status: 500 });
  }
}

// Método POST: Crear un nuevo horario
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      nombreInstructor,
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

    // Asegúrate de que numeroTrimestre y anoTrimestre son números
    const newHorario = await prisma.horario.create({
      data: {
        nombreInstructor,
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
        numeroTrimestre: parseInt(numeroTrimestre, 10), // Convertir a número
        anoTrimestre: parseInt(anoTrimestre, 10),       // Convertir a número
        horaInicio: new Date(horaInicio),               // Asegurarse de que sea un objeto Date
        horaFin: new Date(horaFin),                     // Convertir la horaFin también
      },
    });

    return NextResponse.json(newHorario);
  } catch (error) {
    console.error('Error al crear el horario:', error);
    return NextResponse.json({ error: 'Error al crear el horario' }, { status: 500 });
  }
}
