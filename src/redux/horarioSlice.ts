import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface HorarioState {
  horarios: Horario[];
}

const initialState: HorarioState = {
  horarios: [],
};

const horarioSlice = createSlice({
  name: 'horarios',
  initialState,
  reducers: {
    setHorarios(state, action: PayloadAction<Horario[]>) {
      state.horarios = action.payload;
    },
    deleteHorario(state, action: PayloadAction<number>) {
      state.horarios = state.horarios.filter((horario) => horario.idHorario !== action.payload);
    },
  },
});

export const { setHorarios, deleteHorario } = horarioSlice.actions;
export default horarioSlice.reducer;
