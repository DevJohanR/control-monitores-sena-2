// app/calendario-ambiente/[nombreAmbiente]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CalendarioAmbiente from '@/components/02-molecules/CalendarioAmbiente';

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
  instructor: {
    nombreInstructor: string;
  };
}

export default function CalendarioAmbientePage() {
  const { nombreAmbiente } = useParams();
  const [horarios, setHorarios] = useState<Horario[]>([]);

  useEffect(() => {
    console.log('Nombre del Ambiente obtenido de la URL:', nombreAmbiente);

    const fetchHorarios = async () => {
      try {
        const response = await fetch(`/api/horarios/ambiente/${nombreAmbiente}`);
        if (!response.ok) {
          throw new Error('Error al obtener los horarios');
        }
        const data: Horario[] = await response.json();
        
        console.log('Respuesta de la API:', response);
        console.log('Horarios por Ambiente:', data);

        setHorarios(data);
      } catch (error) {
        console.error('Error al cargar los horarios:', error);
      }
    };

    fetchHorarios();
  }, [nombreAmbiente]);

  return (
    <div>
      <h2>Calendario de Horarios del Ambiente {nombreAmbiente}</h2>
      <CalendarioAmbiente horarios={horarios} tipoFiltro="Ambiente" />
    </div>
  );
}
