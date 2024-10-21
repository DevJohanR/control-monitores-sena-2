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
    return (
      <p className="text-sm italic text-gray-500">
        No se encontraron horarios para este ambiente.
      </p>
    );
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold text-blue-500 mb-4 border-b-2 border-blue-500 pb-2">
        Ambiente: {nombreAmbiente}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-semibold">Asignatura</th>
              <th className="p-3 text-left font-semibold">Ficha</th>
              <th className="p-3 text-left font-semibold">Número Ficha</th>
              <th className="p-3 text-left font-semibold">Tema</th>
              <th className="p-3 text-left font-semibold">RA</th>
              <th className="p-3 text-left font-semibold">Instructor</th>
              <th className="p-3 text-left font-semibold">Bloque</th>
              <th className="p-3 text-left font-semibold">Sede</th>
              <th className="p-3 text-left font-semibold">Jornada</th>
              <th className="p-3 text-left font-semibold">Trimestre</th>
              <th className="p-3 text-left font-semibold">Año</th>
              <th className="p-3 text-left font-semibold">Hora Inicio</th>
              <th className="p-3 text-left font-semibold">Hora Fin</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((horario) => (
              <tr
                key={horario.idHorario}
                className="border-t bg-white hover:bg-blue-50"
              >
                <td className="p-3">{horario.asignatura}</td>
                <td className="p-3">{horario.nombreFicha}</td>
                <td className="p-3">{horario.numeroFicha}</td>
                <td className="p-3">{horario.tema}</td>
                <td className="p-3">{horario.ra}</td>
                <td className="p-3">
                  {horario.instructor?.nombreInstructor || 'Instructor no disponible'}
                </td>
                <td className="p-3">{horario.bloque}</td>
                <td className="p-3">{horario.sede}</td>
                <td className="p-3">{horario.jornada}</td>
                <td className="p-3">{horario.numeroTrimestre}</td>
                <td className="p-3">{horario.anoTrimestre}</td>
                <td className="p-3">{new Date(horario.horaInicio).toLocaleString()}</td>
                <td className="p-3">{new Date(horario.horaFin).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
