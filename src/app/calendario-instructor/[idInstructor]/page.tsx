"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CalendarioHorario from "@/components/02-molecules/CalendarioHorario";
import { FaCalendarAlt } from "react-icons/fa";

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

interface Instructor {
  idInstructor: number;
  nombreInstructor: string;
}

export default function CalendarioInstructor() {
  const { idInstructor } = useParams();
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [instructor, setInstructor] = useState<Instructor | null>(null);

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await fetch(`/api/horarios/instructor/${idInstructor}`);
        if (!response.ok) {
          throw new Error("Error al obtener los horarios");
        }
        const data: Horario[] = await response.json();

        console.log("Horarios con Instructor:", data);

        setHorarios(data);
      } catch (error) {
        console.error("Error al cargar los horarios:", error);
      }
    };

    const fetchInstructor = async () => {
      try {
        const response = await fetch(`/api/instructores/${idInstructor}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del instructor");
        }
        const instructorData: Instructor = await response.json();

        console.log("Datos del Instructor:", instructorData);

        setInstructor(instructorData);
      } catch (error) {
        console.error("Error al cargar el instructor:", error);
      }
    };

    fetchHorarios();
    fetchInstructor();
  }, [idInstructor]);

  return (
    <div className="container mx-auto p-6">
      {/* Título Mejorado */}
      <div className="flex items-center justify-center mb-8">
        <FaCalendarAlt className="text-blue-500 text-3xl mr-2" />
        <h2 className="text-3xl font-bold text-gray-700">
          Calendario de Horarios de{" "}
          <span className="text-blue-500">
            {instructor?.nombreInstructor || "Instructor"}
          </span>
        </h2>
      </div>

      {/* Componente de Calendario */}
      <CalendarioHorario horarios={horarios} tipoFiltro="Instructor" />
    </div>
  );
}
