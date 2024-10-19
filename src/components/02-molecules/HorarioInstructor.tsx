'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Usamos el hook de enrutamiento de Next.js

// Definimos la interfaz del horario
interface Horario {
  idHorario: number;
  nombreInstructor: string;
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

export default function HorarioInstructor() {
  const [horarios, setHorarios] = useState<Horario[]>([]); // Estado para almacenar los horarios
  const router = useRouter(); // Para manejar la navegación

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await fetch('/api/horarios');
        if (!response.ok) {
          throw new Error('Error al obtener los horarios');
        }
        const data: Horario[] = await response.json();
        setHorarios(data);
      } catch (error) {
        console.error('Error al cargar los horarios:', error);
      }
    };

    fetchHorarios();
  }, []); // Se ejecuta una vez cuando el componente se monta

  // Función para manejar el clic en el nombre del instructor
  const handleInstructorClick = (instructor: string) => {
    // Navega a la página de calendario del instructor
    router.push(`/calendario-instructor/${instructor}`);
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
            <th>Resultado de Aprendizaje (RA)</th>
            <th>Ambiente</th>
            <th>Bloque</th>
            <th>Sede</th>
            <th>Jornada</th>
            <th>Día de la Semana</th>
            <th>Número Trimestre</th>
            <th>Año Trimestre</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr key={horario.idHorario}>
              <td 
                className="cursor-pointer text-blue-500"
                onClick={() => handleInstructorClick(horario.nombreInstructor)}
              >
                {horario.nombreInstructor}
              </td>
              <td>{horario.asignatura}</td>
              <td>{horario.nombreFicha}</td>
              <td>{horario.numeroFicha}</td>
              <td>{horario.tema}</td>
              <td>{horario.ra}</td>
              <td>{horario.nombreAmbiente}</td>
              <td>{horario.bloque}</td>
              <td>{horario.sede}</td>
              <td>{horario.jornada}</td>
              <td>{horario.diaSemana}</td> 
              <td>{horario.numeroTrimestre}</td>
              <td>{horario.anoTrimestre}</td>
              <td>{new Date(horario.horaInicio).toLocaleString()}</td>
              <td>{new Date(horario.horaFin).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
