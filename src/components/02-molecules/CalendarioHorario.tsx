import React from 'react';

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
  /*instructor: {
    nombreInstructor: string;
  };*/
}

interface CalendarioHorarioProps {
  horarios: Horario[];
  tipoFiltro: string;
}

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"];
const jornadas = ["Manana", "Tarde", "Noche"];

const CalendarioHorario: React.FC<CalendarioHorarioProps> = ({ horarios, tipoFiltro }) => {
  
  const getHorarios = (dia: string, jornada: string) => {
    return horarios
      .filter((h) => h.diaSemana === dia && h.jornada === jornada)
      .map((h, index) => (
        <div key={index} className="p-2 bg-blue-100 rounded mb-2">
          <p><strong>{h.nombrePrograma}</strong></p>
          <p>{h.numeroFicha}</p>
          <p>{h.competencia}</p>
          <p>{h.ra}</p>
          {/*<p>{h.instructor?.nombreInstructor || 'Desconocido'}</p>*/}
          <p>{`Bloque: ${h.bloque}, Ambiente: ${h.nombreAmbiente}, Sede: ${h.sede}`}</p>
          <p>{`Hora: ${new Date(h.horaInicio).toLocaleString()} - ${new Date(h.horaFin).toLocaleString()}`}</p>
        </div>
      ));
  };

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-xl font-bold mb-4">{`Horario por ${tipoFiltro}`}</h2>
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
};

export default CalendarioHorario;
