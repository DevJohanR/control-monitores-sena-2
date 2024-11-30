'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormularioHorario from "@/components/02-molecules/FormularioHorario";
import HorarioAmbiente from "@/components/02-molecules/HorarioAmbiente";
import HorarioFicha from "@/components/02-molecules/HorarioFicha";
import HorarioInstructor from "@/components/02-molecules/HorarioInstructor";
import Header from '@/components/02-molecules/Header';

interface Ficha {
  numeroFicha: string;
  nombreFicha: string;
}

interface Ambiente {
  idAmbiente: string;
  nombreAmbiente: string;
}

export default function Home() {
  const [fichas, setFichas] = useState<Ficha[]>([]);
  const [selectedFicha, setSelectedFicha] = useState<string>('');
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [selectedAmbiente, setSelectedAmbiente] = useState<string>('');
  const router = useRouter();

  // Redirigir al login si el usuario no está autenticado
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push('/login'); // Redirige al login si no está autenticado
    }
  }, [router]);

  // Cargar las fichas desde la API
  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const response = await fetch('/api/fichas');
        if (!response.ok) {
          throw new Error('Error al obtener las fichas');
        }
        const data = await response.json();

        console.log('Datos de fichas recibidos:', data);

        if (Array.isArray(data)) {
          setFichas(data);
        } else {
          throw new Error('Formato inesperado de los datos');
        }
      } catch (error) {
        console.error('Error al cargar las fichas:', error);
      }
    };

    fetchFichas();
  }, []);

  // Cargar los ambientes desde la API
  useEffect(() => {
    const fetchAmbientes = async () => {
      try {
        const response = await fetch('/api/ambientes');
        if (!response.ok) {
          throw new Error('Error al obtener los ambientes');
        }
        const data: Ambiente[] = await response.json();

        console.log('Datos de ambientes recibidos:', data);

        setAmbientes(data);
      } catch (error) {
        console.error('Error al cargar los ambientes:', error);
      }
    };

    fetchAmbientes();
  }, []);

  const handleFichaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFicha(e.target.value);
  };

  const handleAmbienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAmbiente(e.target.value);
  };

  // Verificar unicidad de claves
  useEffect(() => {
    const areFichasUnique = fichas.length === new Set(fichas.map(f => f.numeroFicha)).size;
    const areAmbientesUnique = ambientes.length === new Set(ambientes.map(a => a.idAmbiente)).size;

    if (!areFichasUnique) {
      console.warn('Las claves de fichas no son únicas.');
    }

    if (!areAmbientesUnique) {
      console.warn('Las claves de ambientes no son únicas.');
    }
  }, [fichas, ambientes]);

  return (
    <>
      <Header />
      <div className="flex flex-col gap-12 mt-12">
        <section>
          <FormularioHorario />
        </section>

        <section>
          <HorarioInstructor />
        </section>

        <section className='container mx-auto my-8 px-4'>
          {/* Select dinámico para elegir la ficha */}
          <div className="flex items-center space-x-4 p-2">
            <label htmlFor="ficha" className="text-sm font-medium text-gray-700 min-w-max">
              Seleccione una Ficha
            </label>
            <select
              id="ficha"
              value={selectedFicha}
              onChange={handleFichaChange}
              required
              className="p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione una Ficha</option>
              {fichas.map((ficha, index) => (
                <option key={`${ficha.numeroFicha}-${index}`} value={ficha.numeroFicha}>
                  {ficha.nombreFicha} ({ficha.numeroFicha})
                </option>
              ))}
            </select>
          </div>

          {/* Solo mostramos el horario si se ha seleccionado una ficha */}
          {selectedFicha ? (
            <HorarioFicha numeroFicha={selectedFicha} />
          ) : (
            <p className="text-sm italic text-gray-500">
              Seleccione una ficha para ver el horario
            </p>
          )}
        </section>

        <section className='container mx-auto my-8 px-4'>
          {/* Select dinámico para elegir el ambiente */}
          <div className="flex items-center space-x-4 p-2">
            <label htmlFor="ambiente" className="text-sm font-medium text-gray-700 min-w-max">
              Seleccione un Ambiente
            </label>
            <select
              id="ambiente"
              value={selectedAmbiente}
              onChange={handleAmbienteChange}
              required
              className="p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione un Ambiente</option>
              {ambientes.map((ambiente, index) => (
                <option key={`${ambiente.idAmbiente}-${index}`} value={ambiente.idAmbiente}>
                  {ambiente.nombreAmbiente}
                </option>
              ))}
            </select>
          </div>

          {/* Solo mostramos el horario si se ha seleccionado un ambiente */}
          {selectedAmbiente ? (
            <HorarioAmbiente nombreAmbiente={selectedAmbiente} />
          ) : (
            <p className="text-sm italic text-gray-500">
              Seleccione un ambiente para ver el horario
            </p>
          )}
        </section>
      </div>
    </>
  );
}
