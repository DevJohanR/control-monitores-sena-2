import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Titulo from '../01-atoms/Titulo';

interface Horario {
  idHorario: number;
  nombrePrograma: string;
  numeroFicha: string;
  competencia: string;
  ra: string;  // Incluimos la propiedad de "RA"
  nombreAmbiente: string;
  bloque: string;
  sede: string;
  jornada: string;
  diaSemana: string;
  numeroTrimestre: number;
  anoTrimestre: number;
  horaInicio: string;
  horaFin: string;
  instructor: Instructor;
}

interface Instructor {
  idInstructor: number;
  nombreInstructor: string;
}

export default function HorarioInstructor() {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await fetch('/api/horarios');
        if (!response.ok) {
          throw new Error('Error al obtener los horarios');
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setHorarios(data);
        } else {
          setHorarios([]);
        }
      } catch (error) {
        console.error('Error al cargar los horarios:', error);
        setHorarios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHorarios();
  }, []);

  const handleInstructorClick = (idInstructor: number) => {
    router.push(`/calendario-instructor/${idInstructor}`);
  };

  if (loading) {
    return <p>Cargando horarios...</p>;
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <Titulo texto="Horario Instructores" />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-semibold">Instructor</th>
              <th className="p-3 text-left font-semibold">Programa</th>
              <th className="p-3 text-left font-semibold">Número Ficha</th>
              <th className="p-3 text-left font-semibold">Competencia</th>
              <th className="p-3 text-left font-semibold">RA</th> {/* Nueva columna para RA */}
              <th className="p-3 text-left font-semibold">Ambiente</th>
              <th className="p-3 text-left font-semibold">Jornada</th>
              <th className="p-3 text-left font-semibold">Día</th>
              <th className="p-3 text-left font-semibold">Trimestre</th>
              <th className="p-3 text-left font-semibold">Hora Inicio</th>
              <th className="p-3 text-left font-semibold">Hora Fin</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((horario, index) => (
              <tr
                key={horario.idHorario}
                className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50`}
              >
                <td
                  className="p-3 cursor-pointer text-blue-500 hover:underline"
                  onClick={() => handleInstructorClick(horario.instructor.idInstructor)}
                >
                  {horario.instructor.nombreInstructor || 'Desconocido'}
                </td>
                <td className="p-3">{horario.nombrePrograma}</td>
                <td className="p-3">{horario.numeroFicha}</td>
                <td className="p-3">{horario.competencia}</td>
                <td className="p-3">{horario.ra}</td> {/* Mostrar los RA */}
                <td className="p-3">{horario.nombreAmbiente}</td>
                <td className="p-3">{horario.jornada}</td>
                <td className="p-3">{horario.diaSemana}</td>
                <td className="p-3">{horario.numeroTrimestre}</td>
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
