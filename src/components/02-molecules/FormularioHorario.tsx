'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

// Definimos la estructura de los datos del formulario
interface HorarioFormData {
  nombreInstructor: string;
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
  const [formData, setFormData] = useState<HorarioFormData>({
    nombreInstructor: '',
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: name === 'numeroTrimestre' || name === 'anoTrimestre' ? parseInt(value, 10) : value,
    });
  };
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/horarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Horario guardado exitosamente');
        setFormData({
          nombreInstructor: '',
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
        alert('Error al guardar el horario');
      }
    } catch (error) {
      console.error('Error en el envío del formulario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombreInstructor" value={formData.nombreInstructor} onChange={handleChange} placeholder="Nombre Instructor" required />
      <input type="text" name="asignatura" value={formData.asignatura} onChange={handleChange} placeholder="Asignatura" required />
      <input type="text" name="nombreFicha" value={formData.nombreFicha} onChange={handleChange} placeholder="Nombre Ficha" required />
      <input type="text" name="numeroFicha" value={formData.numeroFicha} onChange={handleChange} placeholder="Número Ficha" required />
      <input type="text" name="tema" value={formData.tema} onChange={handleChange} placeholder="Tema" required />
      <input type="text" name="ra" value={formData.ra} onChange={handleChange} placeholder="Resultado de Aprendizaje" required />
      <input type="text" name="nombreAmbiente" value={formData.nombreAmbiente} onChange={handleChange} placeholder="Nombre Ambiente" required />
      <input type="text" name="bloque" value={formData.bloque} onChange={handleChange} placeholder="Bloque" required />
      <input type="text" name="sede" value={formData.sede} onChange={handleChange} placeholder="Sede" required />
      <input type="text" name="jornada" value={formData.jornada} onChange={handleChange} placeholder="Jornada" required />
      <input type="text" name="diaSemana" value={formData.diaSemana} onChange={handleChange} placeholder="Día de la Semana" required />
      <input type="number" name="numeroTrimestre" value={formData.numeroTrimestre} onChange={handleChange} placeholder="Número Trimestre" required />
      <input type="number" name="anoTrimestre" value={formData.anoTrimestre} onChange={handleChange} placeholder="Año Trimestre" required />
      <input type="datetime-local" name="horaInicio" value={formData.horaInicio} onChange={handleChange} required />
      <input type="datetime-local" name="horaFin" value={formData.horaFin} onChange={handleChange} required />
      <button type="submit">Guardar Horario</button>
    </form>
  );
}
