"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CalendarioAmbiente from '@/components/02-molecules/CalendarioAmbiente';
import { FaCalendarAlt } from 'react-icons/fa'; // Ícono para el título
import Header from '@/components/02-molecules/Header';
import html2canvas from 'html2canvas'; // Importamos html2canvas

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

  // Función para exportar el calendario como imagen
  const exportarAImagen = async () => {
    const input = document.getElementById('calendario');
    if (!input) return;

    // Opciones para html2canvas
    const options = {
      scale: 2, // Aumenta la resolución de la imagen
      useCORS: true, // Habilita CORS para cargar fuentes e imágenes externas
    };

    // Captura el contenido del div con id 'calendario'
    const canvas = await html2canvas(input, options);

    // Convierte el canvas a una imagen en formato PNG
    const imgData = canvas.toDataURL('image/png');

    // Crea un enlace temporal para descargar la imagen
    const link = document.createElement('a');
    link.href = imgData;
    link.download = `Calendario_${nombreAmbiente}.png`;
    link.click();
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 mt-16">
        {/* Botón para exportar a imagen */}
        <div className="flex justify-end mb-4">
          <button
            onClick={exportarAImagen}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Exportar a Imagen
          </button>
        </div>

        {/* Envolver el título y el calendario dentro del div con id 'calendario' */}
        <div id="calendario">
          {/* Título estilizado */}
          <div className="flex items-center justify-center mb-8">
            <FaCalendarAlt className="text-blue-500 text-3xl mr-2" />
            <h2 className="text-3xl font-bold text-gray-700">
              Calendario de Horarios del Ambiente{' '}
              <span className="text-blue-500">{nombreAmbiente}</span>
            </h2>
          </div>

          {/* Componente de calendario */}
          <CalendarioAmbiente horarios={horarios} tipoFiltro="Ambiente" />
        </div>
      </div>
    </>
  );
}
