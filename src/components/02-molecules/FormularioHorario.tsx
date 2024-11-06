'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Titulo from '../01-atoms/Titulo';

interface Instructor {
  idInstructor: number;
  nombreInstructor: string;
}

interface Programa {
  idPrograma: number;
  nombrePrograma: string;
}

interface Competencia {
  idCompetencia: number;
  nombreCompetencia: string;
}

interface RA {
  idRA: number;
  descripcionRA: string;
}

interface HorarioFormData {
  idInstructor: number;
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

export default function FormularioHorario() {
  const [instructores, setInstructores] = useState<Instructor[]>([]);
  const [programas, setProgramas] = useState<Programa[]>([]);
  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  const [raOptions, setRAOptions] = useState<RA[]>([]);

  const [selectedPrograma, setSelectedPrograma] = useState<number | null>(null);
  const [selectedCompetencia, setSelectedCompetencia] = useState<number | null>(null);

  const [formData, setFormData] = useState<HorarioFormData>({
    idInstructor: 0,
    nombrePrograma: '',
    numeroFicha: '',
    competencia: '',
    ra: '',
    nombreAmbiente: '',
    bloque: '',
    sede: '',
    jornada: '',
    diaSemana: '',
    numeroTrimestre: 0,
    anoTrimestre: 0,
    horaInicio: '',
    horaFin: ''
  });

  // Cargar instructores desde la API
  useEffect(() => {
    const fetchInstructores = async () => {
      try {
        const response = await fetch('/api/instructores');
        if (!response.ok) throw new Error('Error al obtener los instructores');
        const data: Instructor[] = await response.json();
        setInstructores(data);
      } catch (error) {
        console.error('Error al cargar los instructores:', error);
      }
    };
    fetchInstructores();
  }, []);

  // Cargar programas desde la API
  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await fetch('/api/programas');
        if (!response.ok) throw new Error('Error al obtener los programas');
        const data: Programa[] = await response.json();
        setProgramas(data);
      } catch (error) {
        console.error('Error al cargar los programas:', error);
      }
    };
    fetchProgramas();
  }, []);

  // Cargar competencias del programa seleccionado y actualizar formData
  useEffect(() => {
    if (selectedPrograma) {
      const fetchCompetencias = async () => {
        try {
          const response = await fetch(`/api/competencias/${selectedPrograma}`);
          if (!response.ok) throw new Error('Error al obtener competencias');
          const data: Competencia[] = await response.json();
          setCompetencias(data);
        } catch (error) {
          console.error('Error al cargar las competencias:', error);
        }
      };
      fetchCompetencias();

      const programa = programas.find((p) => p.idPrograma === selectedPrograma);
      setFormData((prev) => ({
        ...prev,
        nombrePrograma: programa ? programa.nombrePrograma : ''
      }));
    } else {
      setCompetencias([]);
      setFormData((prev) => ({ ...prev, nombrePrograma: '' }));
    }
  }, [selectedPrograma, programas]);

  // Cargar RA de la competencia seleccionada y actualizar formData
  useEffect(() => {
    if (selectedCompetencia) {
      const fetchRA = async () => {
        try {
          const response = await fetch(`/api/ra/${selectedCompetencia}`);
          if (!response.ok) throw new Error('Error al obtener RA');
          const data: RA[] = await response.json();
          setRAOptions(data);
        } catch (error) {
          console.error('Error al cargar los RA:', error);
        }
      };
      fetchRA();

      const competencia = competencias.find((c) => c.idCompetencia === selectedCompetencia);
      setFormData((prev) => ({
        ...prev,
        competencia: competencia ? competencia.nombreCompetencia : ''
      }));
    } else {
      setRAOptions([]);
      setFormData((prev) => ({ ...prev, competencia: '' }));
    }
  }, [selectedCompetencia, competencias]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Convertir campos a los tipos esperados por Prisma
    const updatedFormData = {
      ...formData,
      idInstructor: parseInt(formData.idInstructor.toString(), 10),
      numeroTrimestre: parseInt(formData.numeroTrimestre.toString(), 10),
      anoTrimestre: parseInt(formData.anoTrimestre.toString(), 10),
      horaInicio: new Date(formData.horaInicio),
      horaFin: new Date(formData.horaFin),
    };

    try {
      const response = await fetch('/api/horarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        alert('Horario guardado exitosamente');
        setFormData({
          idInstructor: 0,
          nombrePrograma: '',
          numeroFicha: '',
          competencia: '',
          ra: '',
          nombreAmbiente: '',
          bloque: '',
          sede: '',
          jornada: '',
          diaSemana: '',
          numeroTrimestre: 0,
          anoTrimestre: 0,
          horaInicio: '',
          horaFin: ''
        });
      } else {
        const errorData = await response.json();
        alert(`Error al guardar el horario: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error en el envío del formulario:', error);
    }
  };

  return (
    <form className="container mx-auto my-8 px-4" onSubmit={handleSubmit}>
      <Titulo texto="Crear Horarios" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="col-span-4 flex gap-4 items-center">
          <label htmlFor="idInstructor" className="text-sm font-medium text-gray-700">Seleccione un Instructor</label>
          <select
            name="idInstructor"
            value={formData.idInstructor}
            onChange={handleChange}
            required
            className="w-full lg:w-96 p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccione un Instructor</option>
            {instructores.map(instructor => (
              <option key={instructor.idInstructor} value={instructor.idInstructor}>
                {instructor.nombreInstructor}
              </option>
            ))}
          </select>
        </div>

        <select
          name="nombrePrograma"
          value={selectedPrograma || ''}
          onChange={(e) => setSelectedPrograma(Number(e.target.value))}
          required
          className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione un Programa</option>
          {programas.map((programa) => (
            <option key={programa.idPrograma} value={programa.idPrograma}>
              {programa.nombrePrograma}
            </option>
          ))}
        </select>

        {selectedPrograma && (
          <select
            name="competencia"
            value={selectedCompetencia || ''}
            onChange={(e) => setSelectedCompetencia(Number(e.target.value))}
            required
            className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccione una Competencia</option>
            {competencias.map((competencia) => (
              <option key={competencia.idCompetencia} value={competencia.idCompetencia}>
                {competencia.nombreCompetencia}
              </option>
            ))}
          </select>
        )}

        {selectedCompetencia && (
          <select
            name="ra"
            value={formData.ra}
            onChange={handleChange}
            required
            className="w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccione un RA</option>
            {raOptions.map((ra) => (
              <option key={ra.idRA} value={ra.descripcionRA}>
                {ra.descripcionRA}
              </option>
            ))}
          </select>
        )}

        {/* Campos adicionales del formulario */}
        <input type="text" name="numeroFicha" placeholder="Número Ficha" onChange={handleChange} value={formData.numeroFicha} required className="w-full p-1.5 border border-gray-300 rounded-md" />
        <input type="text" name="nombreAmbiente" placeholder="Nombre Ambiente" onChange={handleChange} value={formData.nombreAmbiente} required className="w-full p-1.5 border border-gray-300 rounded-md" />
        <input type="text" name="bloque" placeholder="Bloque" onChange={handleChange} value={formData.bloque} required className="w-full p-1.5 border border-gray-300 rounded-md" />
        <input type="text" name="sede" placeholder="Sede" onChange={handleChange} value={formData.sede} required className="w-full p-1.5 border border-gray-300 rounded-md" />
        <select name="jornada" onChange={handleChange} value={formData.jornada} required className="w-full p-1.5 border border-gray-300 rounded-md">
          <option value="">Seleccione una Jornada</option>
          <option value="Manana">Mañana</option>
          <option value="Tarde">Tarde</option>
          <option value="Noche">Noche</option>
        </select>
        <input type="text" name="diaSemana" placeholder="Día de la Semana" onChange={handleChange} value={formData.diaSemana} required className="w-full p-1.5 border border-gray-300 rounded-md" />
        <input type="number" name="numeroTrimestre" placeholder="Número Trimestre" onChange={handleChange} value={formData.numeroTrimestre} required className="w-full p-1.5 border border-gray-300 rounded-md" />
        <input type="number" name="anoTrimestre" placeholder="Año Trimestre" onChange={handleChange} value={formData.anoTrimestre} required className="w-full p-1.5 border border-gray-300 rounded-md" />
        <input type="datetime-local" name="horaInicio" onChange={handleChange} value={formData.horaInicio} required className="w-full p-1.5 border border-gray-300 rounded-md" />
        <input type="datetime-local" name="horaFin" onChange={handleChange} value={formData.horaFin} required className="w-full p-1.5 border border-gray-300 rounded-md" />
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">Guardar Horario</button>
    </form>
  );
}
