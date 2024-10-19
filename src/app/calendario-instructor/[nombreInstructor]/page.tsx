'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CalendarioHorario from '@/components/02-molecules/CalendarioHorario';


interface Horario {
  idHorario: number;
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

export default function CalendarioInstructor() {
  const { nombreInstructor } = useParams(); // Obtenemos el nombre del instructor desde la URL
  const [horarios, setHorarios] = useState<Horario[]>([]); // Estado para almacenar los horarios

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await fetch(`/api/horarios/instructor/${nombreInstructor}`);
        if (!response.ok) {
          throw new Error('Error al obtener los horarios');
        }
        const data: Horario[] = await response.json();
        setHorarios(data);
      } catch (error) {
        console.error('Error al cargar los horarios:', error);
      }
    };

    fetchHorarios();
  }, [nombreInstructor]); // Ejecutar de nuevo si el nombre del instructor cambia

  return (
    <div>
      <h2>Calendario de Horarios de {nombreInstructor}</h2>
      {/* Reutilizamos el componente de calendario */}
      <CalendarioHorario horarios={horarios} tipoFiltro="Instructor" />
    </div>
  );
}
