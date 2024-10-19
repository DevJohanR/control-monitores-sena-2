import React from 'react';

interface Horario {
  diaSemana: string;
  jornada: string;
  asignatura: string;
  nombreInstructor: string;
  horaInicio: string;
  horaFin: string;
}

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const jornadas = ["Mañana", "Tarde", "Noche"];

const horarios: Horario[] = [
  {
    diaSemana: "Lunes",
    jornada: "Mañana",
    asignatura: "Matemáticas",
    nombreInstructor: "Johan Riascos",
    horaInicio: "08:00",
    horaFin: "12:00",
  },
  {
    diaSemana: "Martes",
    jornada: "Tarde",
    asignatura: "Ciencia de Datos",
    nombreInstructor: "Ana Pérez",
    horaInicio: "14:00",
    horaFin: "18:00",
  },
  // Agrega más horarios según sea necesario
];

export default function CalendarioHorarios() {
  const getHorarios = (dia: string, jornada: string) => {
    return horarios
      .filter((h) => h.diaSemana === dia && h.jornada === jornada)
      .map((h, index) => (
        <div key={index} className="p-2 bg-blue-100 rounded mb-2">
          <p><strong>{h.asignatura}</strong></p>
          <p>{h.nombreInstructor}</p>
          <p>{h.horaInicio} - {h.horaFin}</p>
        </div>
      ));
  };

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-xl font-bold mb-4">Horario Semanal</h2>
      <div className="grid grid-cols-7 gap-4 text-center">
        <div className="font-bold">Jornada</div>
        {diasSemana.map((dia) => (
          <div key={dia} className="font-bold">{dia}</div>
        ))}
      </div>
      {jornadas.map((jornada) => (
        <div key={jornada} className="grid grid-cols-7 gap-4 border-t border-gray-300 py-4">
          <div className="font-bold">{jornada}</div>
          {diasSemana.map((dia) => (
            <div key={dia} className="bg-gray-100 p-2 rounded">
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
}
