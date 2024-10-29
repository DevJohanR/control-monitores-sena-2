// app/calendario-ambiente/[nombreAmbiente]/HorarioAmbiente.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importamos useRouter para redirección
import { AiOutlineCalendar } from 'react-icons/ai'; // Importamos el ícono de calendario

// Definimos la interfaz del instructor y el horario
interface Instructor {
  idInstructor: number;
  nombreInstructor: string;
}

interface Horario {
  idHorario: number;
  nombrePrograma: string;
  numeroFicha: string;
  competencia: string;
  ra: string;
  nombreAmbiente: string;
  bloque: string;
  sede: string;
  jornada: string;
  numeroTrimestre: number;
  anoTrimestre: number;
  horaInicio: string;
  horaFin: string;
  instructor: Instructor;
}

export default function HorarioAmbiente({ nombreAmbiente }: { nombreAmbiente: string }) {
  const [horarios, setHorarios] = useState<Horario[]>([]); // Estado para almacenar los horarios por ambiente
  const router = useRouter(); // Usamos useRouter para la navegación

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

  const handleCalendarClick = () => {
    router.push(`/calendario-ambiente/${nombreAmbiente}`);
  };

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
              <th className="p-3 text-left font-semibold">Programa</th>
              <th className="p-3 text-left font-semibold">Número Ficha</th>
              <th className="p-3 text-left font-semibold">Competencia</th>
              <th className="p-3 text-left font-semibold">RA</th>
              <th className="p-3 text-left font-semibold">Instructor</th>
              <th className="p-3 text-left font-semibold">Bloque</th>
              <th className="p-3 text-left font-semibold">Sede</th>
              <th className="p-3 text-left font-semibold">Jornada</th>
              <th className="p-3 text-left font-semibold">Trimestre</th>
              <th className="p-3 text-left font-semibold">Año</th>
              <th className="p-3 text-left font-semibold">Hora Inicio</th>
              <th className="p-3 text-left font-semibold">Hora Fin</th>
              <th className="p-3 text-center font-semibold">Calendario</th> {/* Nueva columna para el ícono */}
            </tr>
          </thead>
          <tbody>
            {horarios.map((horario) => (
              <tr
                key={`${horario.idHorario}-${horario.instructor?.idInstructor ?? 'sin-instructor'}`} // Combinación única de idHorario e idInstructor
                className="border-t bg-white hover:bg-blue-50"
              >
                <td className="p-3">{horario.nombrePrograma}</td> {/* Cambiado de nombreFicha a nombrePrograma */}
                <td className="p-3">{horario.numeroFicha}</td>
                <td className="p-3">{horario.competencia}</td> {/* Cambiado de tema a competencia */}
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
                <td className="p-3 text-center">
                  <AiOutlineCalendar
                    className="text-blue-500 cursor-pointer"
                    size={24}
                    title="Ver calendario"
                    onClick={handleCalendarClick} // Manejador de clic para redirección
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
