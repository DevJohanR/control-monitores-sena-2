// app/calendario-ficha/[numeroFicha]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CalendarioFicha from '@/components/02-molecules/CalendarioFicha';
import { FaCalendarAlt } from 'react-icons/fa'; // Ícono para el título

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
    <div className="container mx-auto p-6">
    {/* Título estilizado */}
    <div className="flex items-center justify-center mb-8">
      <FaCalendarAlt className="text-blue-500 text-3xl mr-2" />
      <h2 className="text-3xl font-bold text-gray-700">
        Calendario de Horarios de la Ficha{" "}
        <span className="text-blue-500">{numeroFicha}</span>
      </h2>
    </div>

    {/* Componente de calendario */}
    <CalendarioFicha horarios={horarios} tipoFiltro="Ficha" />
  </div>
  );
}
