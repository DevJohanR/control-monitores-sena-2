'use client';

import { useState, useEffect } from 'react';

// Definimos la interfaz del instructor y el horario
interface Instructor {
  idInstructor: number;
  nombreInstructor: string;
}

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
  numeroTrimestre: number;
  anoTrimestre: number;
  horaInicio: string;
  horaFin: string;
  instructor: Instructor;  // Relación con Instructor
}

export default function HorarioAmbiente({ nombreAmbiente }: { nombreAmbiente: string }) {
  const [horarios, setHorarios] = useState<Horario[]>([]); // Estado para almacenar los horarios por ambiente

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await fetch(`/api/horarios/ambiente/${nombreAmbiente}`);
        if (!response.ok) {
          throw new Error('Error al obtener los horarios por ambiente');
        }
        const data: Horario[] = await response.json();
        setHorarios(data);
      } catch (error) {
        console.error('Error al cargar los horarios:', error);
      }
    };

    if (nombreAmbiente) {
      fetchHorarios();
    }
  }, [nombreAmbiente]);

  if (horarios.length === 0) {
    return <div>No se encontraron horarios para este ambiente.</div>;
  }

  return (
    <div>
      <h2>Ambiente: {nombreAmbiente}</h2>
      <table>
        <thead>
          <tr>
            <th>Asignatura</th>
            <th>Ficha</th>
            <th>Número Ficha</th>
            <th>Tema</th>
            <th>Resultado de Aprendizaje (RA)</th>
            <th>Instructor</th> {/* Aquí se mostrará el nombre del instructor */}
            <th>Bloque</th>
            <th>Sede</th>
            <th>Jornada</th>
            <th>Número Trimestre</th>
            <th>Año Trimestre</th>
            <th>Hora de Inicio</th>
            <th>Hora de Fin</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr key={horario.idHorario}>
              <td>{horario.asignatura}</td>
              <td>{horario.nombreFicha}</td>
              <td>{horario.numeroFicha}</td>
              <td>{horario.tema}</td>
              <td>{horario.ra}</td>
              {/* Acceder correctamente al nombre del instructor */}
              <td>{horario.instructor?.nombreInstructor || 'Instructor no disponible'}</td>
              <td>{horario.bloque}</td>
              <td>{horario.sede}</td>
              <td>{horario.jornada}</td>
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
