'use client';
import { useRouter } from "next/navigation";
import { FaHome } from 'react-icons/fa';


import { FaCheckCircle, FaExclamationCircle, FaLightbulb, FaClipboardCheck, FaGithub, FaBook } from "react-icons/fa";

export default function Validaciones() {

  const router = useRouter();

  const handleNavigateToGithub = () => {
    window.open("https://github.com/DevJohanR/control-monitores-sena-2", "_blank");
  };

  const handleNavigateToManual = () => {
    router.push("/manual");
  };

  const handleHome = () => {
    router.push("/");
};



  return (
 
    <div className="container mx-auto px-4 py-8 ">
           <button
                onClick={handleHome}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold italic transition-all duration-200"
            >
                <FaHome className="text-lg" />
                <span>Inicio</span>
            </button>
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-6">
        Documentación de Validaciones
      </h1>
    
       
     
{/* Botones en línea */}
<div className="flex justify-center gap-4 mb-8">
        <button
          onClick={handleNavigateToGithub}
          className="bg-gray-900 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-800 flex items-center gap-2"
        >
          <FaGithub className="text-lg" />
          Código Fuente
        </button>
        <button
          onClick={handleNavigateToManual}
          className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 flex items-center gap-2"
        >
          <FaBook className="text-lg" />
          Manual
        </button>
      </div>





      {/* Validación por Instructor */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-blue-500 flex items-center gap-2 mb-4">
          <FaCheckCircle className="text-green-500" />
          1. Validación por Instructor
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          La validación garantiza que:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            <strong>Un instructor no pueda tener horarios que se solapen</strong> en el mismo día y rango de tiempo. Esto asegura que un instructor no sea asignado a dos actividades simultáneamente.
          </li>
          <li>
            Si el instructor está asignado a una sede en un horario específico, automáticamente no podrá estar en otra sede al mismo tiempo. Esto se debe a que la validación ya verifica cualquier solapamiento en la agenda del instructor a nivel global.
          </li>
        </ul>
        <p className="text-gray-700">
          <strong>Por lo tanto:</strong> No es necesario incluir la sede en la validación del instructor, porque el sistema ya impide que un instructor esté asignado a dos horarios superpuestos, sin importar en qué sede ocurra.
        </p>
      </section>

      {/* Validación por Ambiente */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-blue-500 flex items-center gap-2 mb-4">
          <FaExclamationCircle className="text-yellow-500" />
          2. Validación por Ambiente
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          La validación asegura que:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            <strong>Un ambiente no puede ser utilizado para más de un horario al mismo tiempo en una misma sede.</strong> Esto previene que el mismo espacio físico (como un laboratorio, aula o taller) sea reservado por dos actividades diferentes que se solapen en el mismo rango horario.
          </li>
          <li>
            Si los nombres de los ambientes son únicos a nivel global, esta validación es suficiente.
          </li>
        </ul>
        <p className="text-gray-700 mb-4">
          <strong>Sin embargo:</strong> Si los nombres de los ambientes pueden repetirse entre sedes (por ejemplo, ambas sedes tienen un Laboratorio 1), se incluyó la sede como criterio adicional en la validación. Esto asegura que los solapamientos solo se detecten dentro de la misma sede.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Por ejemplo:</strong>
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>En Sede A, Laboratorio 1 está reservado el lunes de 8:00 a 10:00.</li>
          <li>En Sede B, también hay un Laboratorio 1, pero puede ser reservado el mismo lunes de 8:00 a 10:00 porque pertenece a una sede diferente.</li>
        </ul>
        <p className="text-gray-700">
          Con la validación por sede, no se detectarán falsos solapamientos entre ambientes que pertenecen a sedes distintas.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
          <h3 className="text-lg font-semibold text-yellow-700 flex items-center gap-2">
            <FaLightbulb className="text-yellow-500" />
            Nota Importante
          </h3>
          <p className="text-gray-700">
            Esta validación adicional asegura que cada ambiente sea gestionado correctamente, incluso si hay nombres duplicados en diferentes sedes.
          </p>
        </div>
      </section>

      {/* Validación por Ficha */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-blue-500 flex items-center gap-2 mb-4">
          <FaCheckCircle className="text-green-500" />
          3. Validación por Ficha
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          La validación asegura que:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            <strong>Una ficha específica no pueda tener horarios que se solapen</strong> en el mismo día y rango de tiempo. Esto significa que los estudiantes de una ficha no estarán asignados a dos actividades diferentes al mismo tiempo.
          </li>
          <li>
            Como una ficha siempre pertenece a un único programa o grupo dentro de una sede, automáticamente queda asociada a esa sede.
          </li>
        </ul>
        <p className="text-gray-700">
          <strong>Por lo tanto:</strong> No es necesario incluir la sede en la validación de las fichas, porque las validaciones actuales ya garantizan que no habrá solapamientos en los horarios de una ficha, independientemente de la sede.
        </p>
      </section>

      {/* Resumen General */}
      <section className="bg-gray-50 shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-blue-500 flex items-center gap-2 mb-4">
          <FaCheckCircle className="text-green-500" />
          Resumen General
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          El sistema utiliza validaciones que aseguran que no haya solapamientos de horarios a nivel global, considerando lo siguiente:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Los <strong>instructores</strong> no pueden estar en dos lugares al mismo tiempo.</li>
          <li>Los <strong>ambientes</strong> no pueden ser reservados para más de un horario simultáneamente dentro de la misma sede.</li>
          <li>Las <strong>fichas</strong> no pueden participar en dos actividades diferentes al mismo tiempo, ya que cada ficha es única en el sistema.</li>
        </ul>
      </section>

      {/* Pruebas Aplicadas */}
      <section className="bg-blue-50 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-blue-500 flex items-center gap-2 mb-4">
          <FaClipboardCheck className="text-blue-500" />
          Pruebas Aplicadas
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Se realizaron pruebas exhaustivas para validar el correcto funcionamiento de todas las reglas implementadas en el sistema:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            <strong>Instructores:</strong> Se verificó que no puedan asignarse horarios que se solapen para un mismo instructor. Todos los horarios válidos fueron creados correctamente.
          </li>
          <li>
            <strong>Ambientes:</strong> Se probó que los solapamientos solo ocurran dentro de la misma sede. Horarios en ambientes con nombres duplicados en sedes distintas fueron aceptados.
          </li>
          <li>
            <strong>Fichas:</strong> Se confirmó que no haya solapamientos en los horarios de una misma ficha. Los horarios válidos fueron registrados sin problemas.
          </li>
          <li>
            <strong>Casos Generales:</strong> Los mensajes de error fueron claros para entradas inválidas (campos vacíos, horarios solapados o fechas inconsistentes). Los datos válidos se procesaron correctamente.
          </li>
        </ul>
        <div className="bg-blue-100 border-l-4 border-blue-400 p-4 mt-4">
          <p className="text-gray-700">
            Estas pruebas aseguran que el sistema cumple con todas las reglas de negocio establecidas y maneja los casos esperados de manera eficiente.
          </p>
        </div>
      </section>
    </div>
    
  );
}
