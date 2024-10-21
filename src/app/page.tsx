"use client"
import { useState, useEffect } from 'react';
import FormularioHorario from "@/components/02-molecules/FormularioHorario";
import HorarioAmbiente from "@/components/02-molecules/HorarioAmbiente";
import HorarioFicha from "@/components/02-molecules/HorarioFicha";
import HorarioInstructor from "@/components/02-molecules/HorarioInstructor";

interface Ficha {
  numeroFicha: string;
  nombreFicha: string;
}

export default function Home() {
  const [fichas, setFichas] = useState<Ficha[]>([]); // Estado para almacenar las fichas
  const [selectedFicha, setSelectedFicha] = useState<string>(''); // Estado para la ficha seleccionada

  // Cargar las fichas desde la API
  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const response = await fetch('/api/fichas'); // Asegúrate de tener esta ruta configurada para obtener las fichas
        if (!response.ok) {
          throw new Error('Error al obtener las fichas');
        }
        const data: Ficha[] = await response.json();
        setFichas(data);
      } catch (error) {
        console.error('Error al cargar las fichas:', error);
      }
    };

    fetchFichas();
  }, []);

  const handleFichaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFicha(e.target.value); // Actualizar el estado con la ficha seleccionada
  };

  return (
    <div className="flex flex-col gap-12">
      <section>
        <h1>Gestión de Horarios</h1>
        <FormularioHorario />
      </section>

      <section>
        <h1>Horario Instructor</h1>
        <HorarioInstructor />
      </section>

      <section>
        <h1>Seleccionar Ficha</h1>
        {/* Select dinámico para elegir la ficha */}
        <select value={selectedFicha} onChange={handleFichaChange}>
          <option value="">Seleccione una Ficha</option>
          {fichas.map((ficha) => (
            <option key={ficha.numeroFicha} value={ficha.numeroFicha}>
              {ficha.nombreFicha} ({ficha.numeroFicha})
            </option>
          ))}
        </select>
      </section>

      <section>
        <h1>HORARIO FICHA</h1>
        {/* Solo mostramos el horario si se ha seleccionado una ficha */}
        {selectedFicha ? <HorarioFicha numeroFicha={selectedFicha} /> : <p>Seleccione una ficha para ver el horario</p>}
      </section>

      <section>
        <h1>Horarios por Ambiente</h1>
        <HorarioAmbiente nombreAmbiente="2" />
      </section>
    </div>
  );
}
