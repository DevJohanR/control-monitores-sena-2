'use client';

import React, { useState, useEffect } from 'react';

// Definir las interfaces para los datos
interface Programa {
  idPrograma: number;
  nombrePrograma: string;
  competencias: Competencia[];
}

interface Competencia {
  idCompetencia: number;
  nombreCompetencia: string;
  ra: RA[];
}

interface RA {
  idRA: number;
  descripcionRA: string;
}

export default function TablaProgramas() {
  const [programas, setProgramas] = useState<Programa[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar programas desde la API
  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await fetch('/api/tablaprogramas');
        if (!response.ok) throw new Error('Error al obtener los programas');
        const data: Programa[] = await response.json();
        setProgramas(data);
        console.log("Programas cargados:", data); // Depuración
      } catch (error) {
        console.error('Error al cargar los programas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgramas();
  }, []);

  if (loading) return <p>Cargando programas...</p>;

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Listado de Programas</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left text-gray-700 font-semibold border-b">Programa</th>
            <th className="py-3 px-6 text-left text-gray-700 font-semibold border-b">Competencia</th>
            <th className="py-3 px-6 text-left text-gray-700 font-semibold border-b">Resultado de Aprendizaje (RA)</th>
          </tr>
        </thead>
        <tbody>
          {programas.map((programa) => (
            <React.Fragment key={programa.idPrograma}>
              {/* Agrupar competencias y RA para cada programa */}
              {programa.competencias.map((competencia, i) => (
                <React.Fragment key={competencia.idCompetencia}>
                  <tr className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    {/* Solo mostrar el nombre del programa en la primera fila del grupo */}
                    {i === 0 && (
                      <td
                        rowSpan={programa.competencias.length}
                        className="py-3 px-6 border-b text-gray-800 font-semibold align-top"
                        style={{ verticalAlign: 'top' }}
                      >
                        {programa.nombrePrograma}
                      </td>
                    )}
                    <td className="py-3 px-6 border-b text-gray-800 font-semibold align-top">
                      {competencia.nombreCompetencia}
                    </td>
                    <td className="py-3 px-6 border-b text-gray-600">
                      {/* Mostrar los RA en una lista ordenada */}
                      <ul className="list-disc list-inside space-y-1">
                        {competencia.ra.length > 0 ? (
                          competencia.ra.map((ra) => (
                            <li key={ra.idRA} className="text-gray-700">{ra.descripcionRA}</li>
                          ))
                        ) : (
                          <li className="italic text-gray-400">Sin RA</li>
                        )}
                      </ul>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
