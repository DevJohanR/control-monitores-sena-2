'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineCalendar } from 'react-icons/ai';

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
  diaSemana: string;
  numeroTrimestre: number;
  anoTrimestre: number;
  horaInicio: string;
  horaFin: string;
  instructor: Instructor | null;
}

export default function HorarioFicha({ numeroFicha }: { numeroFicha: string }) {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        console.log('Fetching horarios para la ficha:', numeroFicha);
        const response = await fetch(`/api/horarios/${numeroFicha}`);
        if (!response.ok) {
          throw new Error('Error al obtener los horarios de la ficha');
        }
        const data: Horario[] = await response.json();
        console.log('Horarios recibidos para la ficha:', data);
        setHorarios(data);
      } catch (error) {
        console.error('Error al cargar los horarios:', error);
      }
    };

    if (numeroFicha) {
      fetchHorarios();
    }
  }, [numeroFicha]);

  const handleNavigation = () => {
    router.push(`/calendario-ficha/${numeroFicha}`);
  };

  if (horarios.length === 0) {
    return <div>Cargando información de la ficha...</div>;
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold text-blue-500 mb-4 border-b-2 border-blue-500 pb-2">
        Ficha: {horarios[0]?.nombrePrograma} ({horarios[0]?.numeroFicha})
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-semibold">Instructor</th>
              <th className="p-3 text-left font-semibold">Competencia</th>
              <th className="p-3 text-left font-semibold">RA</th>
              <th className="p-3 text-left font-semibold">Ambiente</th>
              <th className="p-3 text-left font-semibold">Bloque</th>
              <th className="p-3 text-left font-semibold">Sede</th>
              <th className="p-3 text-left font-semibold">Jornada</th>
              <th className="p-3 text-left font-semibold">Día</th>
              <th className="p-3 text-left font-semibold">Trimestre</th>
              <th className="p-3 text-left font-semibold">Hora Inicio</th>
              <th className="p-3 text-left font-semibold">Hora Fin</th>
              <th className="p-3 text-left font-semibold">Calendario</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((horario) => (
              <tr
                key={`${horario.idHorario}-${horario.instructor?.idInstructor ?? 'sin-instructor'}`}
                className="border-t bg-white hover:bg-blue-50"
              >
                <td className="p-3">{horario.instructor?.nombreInstructor || 'Instructor no disponible'}</td>
                <td className="p-3">{horario.competencia}</td>
                <td className="p-3">{horario.ra}</td>
                <td className="p-3">{horario.nombreAmbiente}</td>
                <td className="p-3">{horario.bloque}</td>
                <td className="p-3">{horario.sede}</td>
                <td className="p-3">{horario.jornada}</td>
                <td className="p-3">{horario.diaSemana}</td>
                <td className="p-3">{horario.numeroTrimestre}</td>
                <td className="p-3">{new Date(horario.horaInicio).toLocaleString()}</td>
                <td className="p-3">{new Date(horario.horaFin).toLocaleString()}</td>
                <td className="p-3 text-center">
                  <AiOutlineCalendar
                    className="text-blue-500 cursor-pointer"
                    size={24}
                    onClick={handleNavigation}
                    title="Ver calendario"
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
