import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  // Limpiar las tablas antes de insertar datos nuevos
  await prisma.horario.deleteMany();
  await prisma.instructor.deleteMany();
  await prisma.ficha.deleteMany();
  await prisma.ambiente.deleteMany();
  await prisma.diasSemana.deleteMany();
  await prisma.jornadas.deleteMany();

  // Crear días de la semana
  await prisma.diasSemana.createMany({
    data: [
      { dia: 'Lunes' },
      { dia: 'Martes' },
      { dia: 'Miércoles' },
      { dia: 'Jueves' },
      { dia: 'Viernes' },
      { dia: 'Sábado' },
    ],
  });

  // Crear jornadas
  await prisma.jornadas.createMany({
    data: [
      { jornada: 'Mañana' },
      { jornada: 'Tarde' },
      { jornada: 'Noche' },
    ],
  });

  // Crear instructores
  await prisma.instructor.createMany({
    data: [
      {
        nombre: 'Alfredo Bermejo',
        asignatura: 'Inteligencia Empresarial',
        ficha: '2929143',
        tema: 'Planificación estratégica',
        ra: '1,2,3',
        ambiente: '1',
        bloque: '5',
        sede: 'Centro Empresarial',
      },
      {
        nombre: 'María Pérez',
        asignatura: 'Derecho Penal',
        ficha: '7777143',
        tema: 'Procedimiento Penal Colombiano',
        ra: '1',
        ambiente: '10',
        bloque: '6',
        sede: 'Centro Jurídico',
      },
      {
        nombre: 'Carlos Rodríguez',
        asignatura: 'Programación Web',
        ficha: '9912143',
        tema: 'Desarrollo Full Stack con Next.js',
        ra: '2,3,4',
        ambiente: '15',
        bloque: '3',
        sede: 'Centro de Tecnología',
      },
      // Nuevos instructores
      {
        nombre: 'Luisa Martínez',
        asignatura: 'Diseño Gráfico',
        ficha: '1234567',
        tema: 'Diseño con Adobe Illustrator',
        ra: '2,3',
        ambiente: '20',
        bloque: '4',
        sede: 'Centro de Diseño',
      },
      {
        nombre: 'Jorge Gómez',
        asignatura: 'Redes y Telecomunicaciones',
        ficha: '7654321',
        tema: 'Implementación de Redes',
        ra: '1,4',
        ambiente: '12',
        bloque: '2',
        sede: 'Centro de Redes',
      },
      {
        nombre: 'Ana Ramírez',
        asignatura: 'Administración de Empresas',
        ficha: '3456789',
        tema: 'Gestión de Recursos Humanos',
        ra: '3,5',
        ambiente: '8',
        bloque: '1',
        sede: 'Centro Administrativo',
      },
    ],
  });

  // Crear fichas con el campo numeroFicha añadido
  await prisma.ficha.createMany({
    data: [
      {
        idInstructor: 1, // Alfredo Bermejo
        numeroFicha: 2929143,
        tema: 'Planificación estratégica',
        ra: '1,2,3',
        ambiente: '1',
        bloque: '5',
        sede: 'Centro Empresarial',
      },
      {
        idInstructor: 2, // María Pérez
        numeroFicha: 7777143,
        tema: 'Procedimiento Penal Colombiano',
        ra: '1',
        ambiente: '10',
        bloque: '6',
        sede: 'Centro Jurídico',
      },
      {
        idInstructor: 3, // Carlos Rodríguez
        numeroFicha: 9912143,
        tema: 'Desarrollo Full Stack con Next.js',
        ra: '2,3,4',
        ambiente: '15',
        bloque: '3',
        sede: 'Centro de Tecnología',
      },
      // Fichas para los nuevos instructores
      {
        idInstructor: 4, // Luisa Martínez
        numeroFicha: 1234567,
        tema: 'Diseño con Adobe Illustrator',
        ra: '2,3',
        ambiente: '20',
        bloque: '4',
        sede: 'Centro de Diseño',
      },
      {
        idInstructor: 5, // Jorge Gómez
        numeroFicha: 7654321,
        tema: 'Implementación de Redes',
        ra: '1,4',
        ambiente: '12',
        bloque: '2',
        sede: 'Centro de Redes',
      },
      {
        idInstructor: 6, // Ana Ramírez
        numeroFicha: 3456789,
        tema: 'Gestión de Recursos Humanos',
        ra: '3,5',
        ambiente: '8',
        bloque: '1',
        sede: 'Centro Administrativo',
      },
    ],
  });

  // Crear ambientes
  await prisma.ambiente.createMany({
    data: [
      {
        asignatura: 'Inteligencia Empresarial',
        ficha: '2929143',
        tema: 'Planificación estratégica',
        ra: '1,2,3',
        idInstructor: 1,
        bloque: '5',
        sede: 'Centro Empresarial',
      },
      {
        asignatura: 'Derecho Penal',
        ficha: '7777143',
        tema: 'Procedimiento Penal Colombiano',
        ra: '1',
        idInstructor: 2,
        bloque: '6',
        sede: 'Centro Jurídico',
      },
      {
        asignatura: 'Programación Web',
        ficha: '9912143',
        tema: 'Desarrollo Full Stack con Next.js',
        ra: '2,3,4',
        idInstructor: 3,
        bloque: '3',
        sede: 'Centro de Tecnología',
      },
      {
        asignatura: 'Diseño Gráfico',
        ficha: '1234567',
        tema: 'Diseño con Adobe Illustrator',
        ra: '2,3',
        idInstructor: 4,
        bloque: '4',
        sede: 'Centro de Diseño',
      },
      {
        asignatura: 'Redes y Telecomunicaciones',
        ficha: '7654321',
        tema: 'Implementación de Redes',
        ra: '1,4',
        idInstructor: 5,
        bloque: '2',
        sede: 'Centro de Redes',
      },
      {
        asignatura: 'Administración de Empresas',
        ficha: '3456789',
        tema: 'Gestión de Recursos Humanos',
        ra: '3,5',
        idInstructor: 6,
        bloque: '1',
        sede: 'Centro Administrativo',
      },
    ],
  });

  // Crear horarios para todos los instructores, incluyendo las condiciones especiales para los nuevos
  await prisma.horario.createMany({
    data: [
      // Alfredo Bermejo (Mañana)
      { idInstructor: 1, idFicha: 1, idAmbiente: 1, idDiaSemana: 1, idJornada: 1, horarioInicio: new Date('2024-10-18T08:00:00Z'), horaFin: new Date('2024-10-18T12:00:00Z') },
      { idInstructor: 1, idFicha: 1, idAmbiente: 1, idDiaSemana: 2, idJornada: 1, horarioInicio: new Date('2024-10-19T08:00:00Z'), horaFin: new Date('2024-10-19T12:00:00Z') },

      // María Pérez (Tarde)
      { idInstructor: 2, idFicha: 2, idAmbiente: 2, idDiaSemana: 1, idJornada: 2, horarioInicio: new Date('2024-10-18T14:00:00Z'), horaFin: new Date('2024-10-18T18:00:00Z') },

      // Carlos Rodríguez (Noche)
      { idInstructor: 3, idFicha: 3, idAmbiente: 3, idDiaSemana: 1, idJornada: 3, horarioInicio: new Date('2024-10-18T18:00:00Z'), horaFin: new Date('2024-10-18T22:00:00Z') },

      // Luisa Martínez (Mañana y Noche)
      { idInstructor: 4, idFicha: 4, idAmbiente: 4, idDiaSemana: 1, idJornada: 1, horarioInicio: new Date('2024-10-18T08:00:00Z'), horaFin: new Date('2024-10-18T12:00:00Z') },
      { idInstructor: 4, idFicha: 4, idAmbiente: 4, idDiaSemana: 1, idJornada: 3, horarioInicio: new Date('2024-10-18T18:00:00Z'), horaFin: new Date('2024-10-18T22:00:00Z') },

      // Jorge Gómez (Noche y Mañana en días alternos)
      { idInstructor: 5, idFicha: 5, idAmbiente: 5, idDiaSemana: 1, idJornada: 3, horarioInicio: new Date('2024-10-18T18:00:00Z'), horaFin: new Date('2024-10-18T22:00:00Z') },
      { idInstructor: 5, idFicha: 5, idAmbiente: 5, idDiaSemana: 2, idJornada: 1, horarioInicio: new Date('2024-10-19T08:00:00Z'), horaFin: new Date('2024-10-19T12:00:00Z') },

      // Ana Ramírez (Viernes y Sábado, solo mañanas)
      { idInstructor: 6, idFicha: 6, idAmbiente: 6, idDiaSemana: 5, idJornada: 1, horarioInicio: new Date('2024-10-22T08:00:00Z'), horaFin: new Date('2024-10-22T12:00:00Z') },
      { idInstructor: 6, idFicha: 6, idAmbiente: 6, idDiaSemana: 6, idJornada: 1, horarioInicio: new Date('2024-10-23T08:00:00Z'), horaFin: new Date('2024-10-23T12:00:00Z') },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
