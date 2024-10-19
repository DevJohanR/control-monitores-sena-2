'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Horario {
  idHorario: number;
  idInstructor: number; // Usamos idInstructor ahora
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
}

interface Instructor {
  idInstructor: number;
  nombre: string;
}

export default function HorarioInstructor() {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [instructores, setInstructores] = useState<Instructor[]>([]); // Estado para los instructores
  const router = useRouter();

  useEffect(() => {
    // Cargar los instructores
    const fetchInstructores = async () => {
      const response = await fetch('/api/instructores');
      const data: Instructor[] = await response.json();
      setInstructores(data);
    };

    // Cargar los horarios
    const fetchHorarios = async () => {
      const response = await fetch('/api/horarios');
      const data: Horario[] = await response.json();
      setHorarios(data);
    };

    fetchInstructores();
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
                onClick={() => handleInstructorClick(horario.idInstructor)}
              >
                {instructores.find(inst => inst.idInstructor === horario.idInstructor)?.nombre || 'Desconocido'}
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
