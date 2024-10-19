'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Horario {
  idHorario: number;
  asignatura: string;
  nombreFicha: string;
  numeroFicha: string;
  tema: string;
  ra: string;
  nombreAmbiente: string;
  bloque: string;
  sede: string;
  jornada: string;
  diaSemana: string;
  numeroTrimestre: number;
  anoTrimestre: number;
  horaInicio: string;
  horaFin: string;
  instructor: Instructor;  // El instructor ya viene incluido
}

interface Instructor {
  idInstructor: number;
  nombreInstructor: string;  // El nombre del instructor que cargaremos desde la API
}

export default function HorarioInstructor() {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const router = useRouter();

  // Fetch para obtener los horarios con los instructores incluidos
  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await fetch('/api/horarios');
        const data: Horario[] = await response.json();
        
        // Verificar si los datos llegan correctamente
        console.log('Horarios con Instructor:', data);
        setHorarios(data);
      } catch (error) {
        console.error('Error al cargar los horarios:', error);
      }
    };

    fetchHorarios();
  }, []);

  const handleInstructorClick = (idInstructor: number) => {
    router.push(`/calendario-instructor/${idInstructor}`);
  };

  return (
    <div>
      <h2>Horario Instructores</h2>
      <table>
        <thead>
          <tr>
            <th>Instructor</th>
            <th>Asignatura</th>
            <th>Ficha</th>
            <th>Número Ficha</th>
            <th>Tema</th>
            <th>Ambiente</th>
            <th>Jornada</th>
            <th>Día</th>
            <th>Trimestre</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr key={horario.idHorario}>
              <td
                className="cursor-pointer text-blue-500"
                onClick={() => handleInstructorClick(horario.instructor.idInstructor)}
              >
                {horario.instructor.nombreInstructor || 'Desconocido'} {/* Mostrar el nombre del instructor */}
              </td>
              <td>{horario.asignatura}</td>
              <td>{horario.nombreFicha}</td>
              <td>{horario.numeroFicha}</td>
              <td>{horario.tema}</td>
              <td>{horario.nombreAmbiente}</td>
              <td>{horario.jornada}</td>
              <td>{horario.diaSemana}</td>
              <td>{horario.numeroTrimestre}</td>
              <td>{new Date(horario.horaInicio).toLocaleString()}</td>
              <td>{new Date(horario.horaFin).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
