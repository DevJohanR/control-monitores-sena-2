'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CalendarioHorario from '@/components/02-molecules/CalendarioHorario';

interface Horario {
  idHorario: number;
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
  instructor: {
    nombreInstructor: string;
  };
}

export default function CalendarioFicha() {
  const { numeroFicha } = useParams();
  const [horarios, setHorarios] = useState<Horario[]>([]);

  // Fetch para obtener los horarios por ficha
  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await fetch(`/api/horarios/${numeroFicha}`);
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
  }, [numeroFicha]);

  return (
    <div>
      <h2>Calendario de Horarios de la Ficha {numeroFicha}</h2>
      <CalendarioHorario horarios={horarios} tipoFiltro="Ficha" />
    </div>
  );
}
