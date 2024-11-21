'use client';
//joahn

import { useState } from 'react';
import TablaProgramas from '@/components/02-molecules/TablaProgramas';

// Definimos las interfaces para los datos
interface ProgramaData {
  nombrePrograma: string;
  competencias: CompetenciaData[];
}

interface CompetenciaData {
  nombreCompetencia: string;
  ra: RAData[];
}

interface RAData {
  descripcionRA: string;
  acronimoRA: string;
}

export default function GestionProgramas() {
  const [programa, setPrograma] = useState('');
  const [competencias, setCompetencias] = useState<CompetenciaData[]>([
    { nombreCompetencia: '', ra: [{ descripcionRA: '', acronimoRA: 'RA1' }] },
  ]);

  const handleProgramaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrograma(e.target.value);
  };

  const handleCompetenciaChange = (index: number, value: string) => {
    const newCompetencias = [...competencias];
    newCompetencias[index].nombreCompetencia = value;
    setCompetencias(newCompetencias);
  };

  const handleRAChange = (competenciaIndex: number, raIndex: number, value: string) => {
    const newCompetencias = [...competencias];
    newCompetencias[competenciaIndex].ra[raIndex].descripcionRA = value;
    setCompetencias(newCompetencias);
  };

  const addCompetencia = () => {
    setCompetencias([...competencias, { nombreCompetencia: '', ra: [{ descripcionRA: '', acronimoRA: 'RA1' }] }]);
  };

  const addRA = (competenciaIndex: number) => {
    const newCompetencias = [...competencias];
    const raIndex = newCompetencias[competenciaIndex].ra.length + 1;
    newCompetencias[competenciaIndex].ra.push({
      descripcionRA: '',
      acronimoRA: `RA${raIndex}`, // Asignación del acrónimo
    });
    setCompetencias(newCompetencias);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: ProgramaData = {
      nombrePrograma: programa,
      competencias: competencias.map((competencia) => ({
        nombreCompetencia: competencia.nombreCompetencia,
        ra: competencia.ra.map((ra) => ({
          descripcionRA: ra.descripcionRA,
          acronimoRA: ra.acronimoRA,
        })),
      })),
    };

    console.log("Datos a enviar al backend:", data);

    try {
      const response = await fetch('/api/programas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Programa creado exitosamente');
        setPrograma('');
        setCompetencias([{ nombreCompetencia: '', ra: [{ descripcionRA: '', acronimoRA: 'RA1' }] }]);
      } else {
        const errorData = await response.json();
        alert(`Error al crear el programa: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error en el envío del formulario:', error);
    }
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Agregar Programa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre del Programa"
          value={programa}
          onChange={handleProgramaChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        {competencias.map((competencia, i) => (
          <div key={i} className="space-y-2">
            <input
              type="text"
              placeholder={`Competencia ${i + 1}`}
              value={competencia.nombreCompetencia}
              onChange={(e) => handleCompetenciaChange(i, e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {competencia.ra.map((ra, j) => (
              <div key={j} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`RA ${j + 1}`}
                  value={ra.descripcionRA}
                  onChange={(e) => handleRAChange(i, j, e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <span className="text-gray-500">{ra.acronimoRA}</span>
              </div>
            ))}
            <button type="button" onClick={() => addRA(i)} className="text-blue-500 hover:underline">
              + Agregar RA
            </button>
          </div>
        ))}

        <button type="button" onClick={addCompetencia} className="text-blue-500 hover:underline">
          + Agregar Competencia
        </button>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Guardar Programa
        </button>
      </form>
      <TablaProgramas/>
    </div>
  );
}
