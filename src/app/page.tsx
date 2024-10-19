import CalendarioHorarios from "@/components/02-molecules/CalendarioHorarios";
import FormularioHorario from "@/components/02-molecules/FormularioHorario";
import HorarioAmbiente from "@/components/02-molecules/HorarioAmbiente";
import HorarioFicha from "@/components/02-molecules/HorarioFicha";
import HorarioInstructor from "@/components/02-molecules/HorarioInstructor";





export default function Home() {
  return (
    <div>
  <h1>Gestión de Horarios</h1>
      <FormularioHorario />
      <HorarioInstructor/>
      <h1>HORARIO FICHA</h1>
      <HorarioFicha numeroFicha="7777" />
      <h1>Horarios por Ambiente</h1>
      <HorarioAmbiente nombreAmbiente="2" />
      <h1>calendario</h1>
      <CalendarioHorarios />
    </div>
  );
}
