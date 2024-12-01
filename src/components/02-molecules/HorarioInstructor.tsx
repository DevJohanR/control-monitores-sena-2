import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa'; // Ícono de eliminación
import Titulo from '../01-atoms/Titulo';

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
  instructor: Instructor;
}

interface Instructor {
  idInstructor: number;
  nombreInstructor: string;
}

export default function HorarioInstructor() {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);
  const [instructores, setInstructores] = useState<Instructor[]>([]); // Lista de instructores
  const [selectedInstructor, setSelectedInstructor] = useState<number | null>(null); // Instructor seleccionado
  const router = useRouter();

  // Cargar los horarios desde la API
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

          // Extraer y filtrar instructores únicos
          const uniqueInstructors = Array.from(
            new Map(data.map((item) => [item.instructor.idInstructor, item.instructor])).values()
          );
          setInstructores(uniqueInstructors);
        } else {
          setHorarios([]);
          setInstructores([]);
        }
      } catch (error) {
        console.error('Error al cargar los horarios:', error);
        setHorarios([]);
        setInstructores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHorarios();
  }, []);

  // Manejar la eliminación de un horario
  const handleDeleteHorario = async (idHorario: number) => {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este horario?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/horarios?idHorario=${idHorario}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el horario');
      }

      // Eliminar el horario del estado local
      setHorarios((prevHorarios) => prevHorarios.filter((horario) => horario.idHorario !== idHorario));
      alert('Horario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el horario:', error);
      alert('Error al eliminar el horario');
    }
  };

  // Redirigir al calendario del instructor
  const handleInstructorClick = (idInstructor: number) => {
    router.push(`/calendario-instructor/${idInstructor}`);
  };

  // Manejar el cambio del select y redirigir
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    if (selectedId) {
      router.push(`/calendario-instructor/${selectedId}`);
    }
  };

  if (loading) {
    return <p>Cargando horarios...</p>;
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <Titulo texto="Horario Instructores" />

      {/* Select para redirigir al calendario */}
      <div className="mb-6">
        <label htmlFor="selectInstructor" className="block mb-2 text-sm font-medium text-gray-700">
          Ver Calendario de Instructor:
        </label>
        <select
          id="selectInstructor"
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={handleSelectChange}
          defaultValue=""
        >
          <option value="" disabled>
            Seleccione un instructor
          </option>
          {instructores.map((instructor) => (
            <option key={instructor.idInstructor} value={instructor.idInstructor}>
              {instructor.nombreInstructor}
            </option>
          ))}
        </select>
      </div>


      <h3 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
  <span className="text-blue-500 mr-2">📋</span> Lista de Instructores Recientes
</h3>



      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-semibold">Instructor</th>
              <th className="p-3 text-left font-semibold">Programa</th>
              <th className="p-3 text-left font-semibold">Número Ficha</th>
              <th className="p-3 text-left font-semibold">Competencia</th>
              <th className="p-3 text-left font-semibold">RA</th>
              <th className="p-3 text-left font-semibold">Ambiente</th>
              <th className="p-3 text-left font-semibold">Jornada</th>
              <th className="p-3 text-left font-semibold">Día</th>
              <th className="p-3 text-left font-semibold">Trimestre</th>
              <th className="p-3 text-left font-semibold">Hora Inicio</th>
              <th className="p-3 text-left font-semibold">Hora Fin</th>
              <th className="p-3 text-center font-semibold">Acciones</th>
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
                <td className="p-3">{horario.ra}</td>
                <td className="p-3">{horario.nombreAmbiente}</td>
                <td className="p-3">{horario.jornada}</td>
                <td className="p-3">{horario.diaSemana}</td>
                <td className="p-3">{horario.numeroTrimestre}</td>
                <td className="p-3">{new Date(horario.horaInicio).toLocaleString()}</td>
                <td className="p-3">{new Date(horario.horaFin).toLocaleString()}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDeleteHorario(horario.idHorario)}
                    className="text-red-500 hover:text-red-700"
                    title="Eliminar horario"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
