// app/calendario-ficha/[numeroFicha]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CalendarioFicha from '@/components/02-molecules/CalendarioFicha';

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
}

export default function CalendarioFichaPage() {
  const { numeroFicha } = useParams();
  const [horarios, setHorarios] = useState<Horario[]>([]);

  useEffect(() => {
    console.log('Número de Ficha obtenido de la URL:', numeroFicha);

    const fetchHorarios = async () => {
        try {
          const response = await fetch(`/api/horarios/${numeroFicha}`); // Cambio en la URL
          if (!response.ok) {
            throw new Error('Error al obtener los horarios');
          }
          const data: Horario[] = await response.json();
          
          console.log('Respuesta de la API:', response);
          console.log('Horarios por Ficha:', data);
      
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
      <CalendarioFicha horarios={horarios} tipoFiltro="Ficha" />
    </div>
  );
}
