"use client";

import React from "react";

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

interface CalendarioHorarioProps {
  horarios: Horario[];
  tipoFiltro: string;
}

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const jornadas = ["Mañana", "Tarde", "Noche"];

const CalendarioHorario: React.FC<CalendarioHorarioProps> = ({ horarios, tipoFiltro }) => {
  const getHorarios = (dia: string, jornada: string) => {
    return horarios
      .filter((h) => h.diaSemana === dia && h.jornada === jornada)
      .map((h, index) => (
        <div
          key={index}
          className="p-3 bg-blue-100 rounded-lg mb-2 shadow-md border-l-4 border-blue-500"
        >
          <p className="font-bold text-blue-600">{h.nombrePrograma}</p>
          <p className="text-sm text-gray-700">
            <strong>Ficha:</strong> {h.numeroFicha}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Competencia:</strong> {h.competencia}
          </p>
          <p className="text-sm text-gray-700">
            <strong>RA:</strong> {h.ra}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Ambiente:</strong> {h.nombreAmbiente} - Bloque {h.bloque}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Sede:</strong> {h.sede}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Hora:</strong>{" "}
            {new Date(h.horaInicio).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            -{" "}
            {new Date(h.horaFin).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      ));
  };

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-xl font-bold mb-4">{`Horario por ${tipoFiltro}`}</h2>
      <div className="grid grid-cols-7 gap-4 text-center">
        <div className="font-bold text-gray-700">Jornada</div>
        {diasSemana.map((dia) => (
          <div key={dia} className="font-bold text-gray-700">
            {dia}
          </div>
        ))}
      </div>
      {jornadas.map((jornada) => (
        <div key={jornada} className="grid grid-cols-7 gap-4 border-t border-gray-300 py-4">
          <div className="font-bold text-gray-700">{jornada}</div>
          {diasSemana.map((dia) => (
            <div
              key={dia}
              className="bg-gray-100 p-4 rounded-lg shadow-sm text-gray-600 text-sm"
            >
              {getHorarios(dia, jornada).length > 0 ? (
                getHorarios(dia, jornada)
              ) : (
                <p className="text-gray-500">Sin clases</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CalendarioHorario;
