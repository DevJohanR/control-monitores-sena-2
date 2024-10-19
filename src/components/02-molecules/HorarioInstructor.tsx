'use client';

import { useState, useEffect } from 'react';

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
            <th>Número Trimestre</th>
            <th>Año Trimestre</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr key={horario.idHorario}>
              <td>{horario.nombreInstructor}</td>
              <td>{horario.asignatura}</td>
              <td>{horario.nombreFicha}</td>
              <td>{horario.numeroFicha}</td>
              <td>{horario.tema}</td>
              <td>{horario.ra}</td>
              <td>{horario.nombreAmbiente}</td>
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
