'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

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
    <form onSubmit={handleSubmit}>
      {/* Select para los instructores */}
      <div>
        <label htmlFor="idInstructor">Seleccione un Instructor</label>
        <select
          name="idInstructor"
          value={formData.idInstructor}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un Instructor</option>
          {instructores.length > 0 ? (
            instructores.map((instructor) => (
              <option key={instructor.idInstructor} value={instructor.idInstructor}>
                {instructor.nombreInstructor} {/* Cambiado a nombreInstructor */}
              </option>
            ))
          ) : (
            <option disabled>Cargando instructores...</option>
          )}
        </select>
      </div>

      {/* Otros campos del formulario */}
      <input type="text" name="asignatura" value={formData.asignatura} onChange={handleChange} placeholder="Asignatura" required />
      <input type="text" name="nombreFicha" value={formData.nombreFicha} onChange={handleChange} placeholder="Nombre Ficha" required />
      <input type="text" name="numeroFicha" value={formData.numeroFicha} onChange={handleChange} placeholder="Número Ficha" required />
      <input type="text" name="tema" value={formData.tema} onChange={handleChange} placeholder="Tema" required />
      <input type="text" name="ra" value={formData.ra} onChange={handleChange} placeholder="Resultado de Aprendizaje" required />
      <input type="text" name="nombreAmbiente" value={formData.nombreAmbiente} onChange={handleChange} placeholder="Nombre Ambiente" required />
      <input type="text" name="bloque" value={formData.bloque} onChange={handleChange} placeholder="Bloque" required />
      <input type="text" name="sede" value={formData.sede} onChange={handleChange} placeholder="Sede" required />
      <select name="jornada" value={formData.jornada} onChange={handleChange} required>
  <option value="">Seleccione una Jornada</option>
  <option value="Manana">Mañana</option>  {/* Enviamos "Manana" a la base de datos */}
  <option value="Tarde">Tarde</option>
  <option value="Noche">Noche</option>
</select>
      <input type="text" name="diaSemana" value={formData.diaSemana} onChange={handleChange} placeholder="Día de la Semana" required />
      <input type="number" name="numeroTrimestre" value={formData.numeroTrimestre} onChange={handleChange} placeholder="Número Trimestre" required />
      <input type="number" name="anoTrimestre" value={formData.anoTrimestre} onChange={handleChange} placeholder="Año Trimestre" required />
      <input type="datetime-local" name="horaInicio" value={formData.horaInicio} onChange={handleChange} required />
      <input type="datetime-local" name="horaFin" value={formData.horaFin} onChange={handleChange} required />
      
      <button type="submit">Guardar Horario</button>
    </form>
  );
}
