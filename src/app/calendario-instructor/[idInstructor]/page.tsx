'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CalendarioHorario from '@/components/02-molecules/CalendarioHorario';

interface Horario {
  idHorario: number;
  idInstructor: number;  // Ajustamos para utilizar el idInstructor
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
  instructor: Instructor;  // Relacionamos con el instructor
}

interface Instructor {
  idInstructor: number;
  nombre: string;  // El nombre del instructor que cargaremos desde la API
}

export default function CalendarioInstructor() {
  const { idInstructor } = useParams(); // Ahora estamos utilizando idInstructor en la URL
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [instructor, setInstructor] = useState<Instructor | null>(null); // Estado para almacenar los datos del instructor

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await fetch(`/api/horarios/instructor/${idInstructor}`);
        if (!response.ok) {
          throw new Error('Error al obtener los horarios');
        }
        const data: Horario[] = await response.json();
        setHorarios(data);
      } catch (error) {
        console.error('Error al cargar los horarios:', error);
      }
    };

    const fetchInstructor = async () => {
      try {
        const response = await fetch(`/api/instructores/${idInstructor}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del instructor');
        }
        const instructorData: Instructor = await response.json();
        setInstructor(instructorData);
      } catch (error) {
        console.error('Error al cargar el instructor:', error);
      }
    };

    fetchHorarios();
    fetchInstructor();
  }, [idInstructor]); // Volver a ejecutar cuando cambie el idInstructor

  return (
    <div>
      <h2>Calendario de Horarios de {instructor?.nombre || 'Instructor'}</h2>
      {/* Reutilizamos el componente de calendario */}
      <CalendarioHorario horarios={horarios} tipoFiltro="Instructor" />
    </div>
  );
}
