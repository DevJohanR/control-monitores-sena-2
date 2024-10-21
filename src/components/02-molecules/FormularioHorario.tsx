'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Titulo from '../01-atoms/Titulo';

// Definimos la estructura de los datos del formulario
interface Instructor {
  idInstructor: number;
  nombreInstructor: string;
}

interface HorarioFormData {
  idInstructor: number;
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

export default function FormularioHorario() {
  const [instructores, setInstructores] = useState<Instructor[]>([]); // Estado para almacenar los instructores
  const [formData, setFormData] = useState<HorarioFormData>({
    idInstructor: 0,
    asignatura: '',
    nombreFicha: '',
    numeroFicha: '',
    tema: '',
    ra: '',
    nombreAmbiente: '',
    bloque: '',
    sede: '',
    jornada: '',
    diaSemana: '',
    numeroTrimestre: 0,
    anoTrimestre: 0,
    horaInicio: '',
    horaFin: ''
  });

  // Cargar los instructores desde la API
  useEffect(() => {
    const fetchInstructores = async () => {
      try {
        const response = await fetch('/api/instructores');
        if (!response.ok) {
          throw new Error('Error al obtener los instructores');
        }
        const data: Instructor[] = await response.json();
        console.log('Instructores cargados:', data); // Verificar en consola
        setInstructores(data);
      } catch (error) {
        console.error('Error al cargar los instructores:', error); // Manejo del error
      }
    };

    fetchInstructores();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Convertir idInstructor a número
    const updatedFormData = {
      ...formData,
      idInstructor: parseInt(formData.idInstructor.toString(), 10), // Asegurarse de que sea un número
    };

    console.log('Datos enviados:', updatedFormData); // Verifica los datos antes de enviarlos

    try {
      const response = await fetch('/api/horarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData), // Enviar los datos actualizados con idInstructor como número
      });

      if (response.ok) {
        alert('Horario guardado exitosamente');
        setFormData({
          idInstructor: 0,
          asignatura: '',
          nombreFicha: '',
          numeroFicha: '',
          tema: '',
          ra: '',
          nombreAmbiente: '',
          bloque: '',
          sede: '',
          jornada: '',
          diaSemana: '',
          numeroTrimestre: 0,
          anoTrimestre: 0,
          horaInicio: '',
          horaFin: ''
        });
      } else {
        const errorData = await response.json(); // Obtener la respuesta de error
        console.error('Error al guardar el horario:', errorData);
        alert(`Error al guardar el horario: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error en el envío del formulario:', error);
    }
  };

  return (
<form className="container mx-auto my-8 px-4" onSubmit={handleSubmit}>
  <Titulo texto="Crear Horarios" />
  
  {/* Ajustamos el layout para que el select del instructor ocupe toda una fila */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
    
    {/* Select para los instructores, ocupando una fila completa */}
    <div className="col-span-4 flex gap-4 items-center">
      <label htmlFor="idInstructor" className="text-sm font-medium text-gray-700">
        Seleccione un Instructor
      </label>
      <select
        name="idInstructor"
        value={formData.idInstructor}
        onChange={handleChange}
        required
        className="w-full lg:w-96 p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione un Instructor</option>
        {instructores.length > 0 ? (
          instructores.map((instructor) => (
            <option key={instructor.idInstructor} value={instructor.idInstructor}>
              {instructor.nombreInstructor}
            </option>
          ))
        ) : (
          <option disabled>Cargando instructores...</option>
        )}
      </select>
    </div>

    {/* Otros campos del formulario */}
    <input
      type="text"
      name="asignatura"
      value={formData.asignatura}
      onChange={handleChange}
      placeholder="Asignatura"
      required
      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="text"
      name="nombreFicha"
      value={formData.nombreFicha}
      onChange={handleChange}
      placeholder="Nombre Ficha"
      required
      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="text"
      name="numeroFicha"
      value={formData.numeroFicha}
      onChange={handleChange}
      placeholder="Número Ficha"
      required
      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="text"
      name="tema"
      value={formData.tema}
      onChange={handleChange}
      placeholder="Tema"
      required
      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="text"
      name="ra"
      value={formData.ra}
      onChange={handleChange}
      placeholder="Resultado de Aprendizaje"
      required
      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="text"
      name="nombreAmbiente"
      value={formData.nombreAmbiente}
      onChange={handleChange}
      placeholder="Nombre Ambiente"
      required
      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="text"
      name="bloque"
      value={formData.bloque}
      onChange={handleChange}
      placeholder="Bloque"
      required
      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="text"
      name="sede"
      value={formData.sede}
      onChange={handleChange}
      placeholder="Sede"
      required
      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <select
      name="jornada"
      value={formData.jornada}
      onChange={handleChange}
      required
      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Seleccione una Jornada</option>
      <option value="Manana">Mañana</option>
      <option value="Tarde">Tarde</option>
      <option value="Noche">Noche</option>
    </select>

    <input
      type="text"
      name="diaSemana"
      value={formData.diaSemana}
      onChange={handleChange}
      placeholder="Día de la Semana"
      required
      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="number"
      name="numeroTrimestre"
      value={formData.numeroTrimestre}
      onChange={handleChange}
      placeholder="Número Trimestre"
      required
      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="number"
      name="anoTrimestre"
      value={formData.anoTrimestre}
      onChange={handleChange}
      placeholder="Año Trimestre"
      required
      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="datetime-local"
      name="horaInicio"
      value={formData.horaInicio}
      onChange={handleChange}
      required
      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="datetime-local"
      name="horaFin"
      value={formData.horaFin}
      onChange={handleChange}
      required
      className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <button
    type="submit"
    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
  >
    Guardar Horario
  </button>
</form>


  );
}
