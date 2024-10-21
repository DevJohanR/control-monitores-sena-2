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
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold text-blue-500 mb-4 border-b-2 border-blue-500 pb-2">
        Ficha: {horario.nombreFicha} ({horario.numeroFicha})
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-semibold">Instructor</th>
              <th className="p-3 text-left font-semibold">Asignatura</th>
              <th className="p-3 text-left font-semibold">Tema</th>
              <th className="p-3 text-left font-semibold">RA</th>
              <th className="p-3 text-left font-semibold">Ambiente</th>
              <th className="p-3 text-left font-semibold">Bloque</th>
              <th className="p-3 text-left font-semibold">Sede</th>
              <th className="p-3 text-left font-semibold">Jornada</th>
              <th className="p-3 text-left font-semibold">Día</th>
              <th className="p-3 text-left font-semibold">Trimestre</th>
              <th className="p-3 text-left font-semibold">Hora Inicio</th>
              <th className="p-3 text-left font-semibold">Hora Fin</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t bg-white hover:bg-blue-50">
              <td className="p-3">{horario.instructor?.nombreInstructor || 'Instructor no disponible'}</td>
              <td className="p-3">{horario.asignatura}</td>
              <td className="p-3">{horario.tema}</td>
              <td className="p-3">{horario.ra}</td>
              <td className="p-3">{horario.nombreAmbiente}</td>
              <td className="p-3">{horario.bloque}</td>
              <td className="p-3">{horario.sede}</td>
              <td className="p-3">{horario.jornada}</td>
              <td className="p-3">{horario.diaSemana}</td>
              <td className="p-3">{horario.numeroTrimestre}</td>
              <td className="p-3">{new Date(horario.horaInicio).toLocaleString()}</td>
              <td className="p-3">{new Date(horario.horaFin).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
