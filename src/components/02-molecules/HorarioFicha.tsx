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
  diaSemana: string;
  numeroTrimestre: number;
  anoTrimestre: number;
  horaInicio: string;
  horaFin: string;
  instructor: Instructor;  // Relación con Instructor
}

export default function HorarioFicha({ numeroFicha }: { numeroFicha: string }) {
  const [horario, setHorario] = useState<Horario | null>(null); // Estado para almacenar el horario de una ficha específica

  useEffect(() => {
    const fetchHorario = async () => {
      try {
        const response = await fetch(`/api/horarios/${numeroFicha}`);
        if (!response.ok) {
          throw new Error('Error al obtener el horario de la ficha');
        }
        const data: Horario = await response.json();
        setHorario(data);
      } catch (error) {
        console.error('Error al cargar el horario:', error);
      }
    };

    if (numeroFicha) {
      fetchHorario();
    }
  }, [numeroFicha]);

  if (!horario) {
    return <div>Cargando información de la ficha...</div>;
  }

  return (
    <div>
      <h2>Ficha: {horario.nombreFicha} ({horario.numeroFicha})</h2>
      {/* Asegúrate de acceder al instructor correctamente */}
      <p><strong>Instructor:</strong> {horario.instructor?.nombreInstructor || 'Instructor no disponible'}</p>
      <p><strong>Tema:</strong> {horario.tema}</p>
      <p><strong>Resultado de Aprendizaje (RA):</strong> {horario.ra}</p>
      <p><strong>Ambiente:</strong> {horario.nombreAmbiente}</p>
      <p><strong>Bloque:</strong> {horario.bloque}</p>
      <p><strong>Sede:</strong> {horario.sede}</p>
      <p><strong>Jornada:</strong> {horario.jornada}</p>
      <p><strong>Número Trimestre:</strong> {horario.numeroTrimestre}</p>
      <p><strong>Año Trimestre:</strong> {horario.anoTrimestre}</p>
      <p><strong>Hora de Inicio:</strong> {new Date(horario.horaInicio).toLocaleString()}</p>
      <p><strong>Hora de Fin:</strong> {new Date(horario.horaFin).toLocaleString()}</p>
    </div>
  );
}
