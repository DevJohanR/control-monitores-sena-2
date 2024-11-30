'use client';
// JOAHNN

import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

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
  acronimoRA: string;
}

export default function TablaProgramas() {
  const [programas, setProgramas] = useState<Programa[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para manejar el modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProgramaId, setSelectedProgramaId] = useState<number | null>(null);
  const [newCompetencia, setNewCompetencia] = useState('');
  const [newRA, setNewRA] = useState<{ descripcionRA: string; acronimoRA: string }[]>([
    { descripcionRA: '', acronimoRA: 'RA1' },
  ]);

  // Cargar programas desde la API
  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await fetch('/api/tablaprogramas');
        if (!response.ok) throw new Error('Error al obtener los programas');
        const data: Programa[] = await response.json();
        setProgramas(data);
        console.log('Programas cargados:', data);
      } catch (error) {
        console.error('Error al cargar los programas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgramas();
  }, []);

  const handleDeletePrograma = async (idPrograma: number) => {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este programa?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/competencias/${idPrograma}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Programa eliminado correctamente');
        setProgramas((prevProgramas) =>
          prevProgramas.filter((programa) => programa.idPrograma !== idPrograma)
        );
      } else {
        const errorData = await response.json();
        alert(`Error al eliminar el programa: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error al eliminar el programa:', error);
      alert('Error al eliminar el programa');
    }
  };

  const handleAddRA = () => {
    const newRAIndex = newRA.length + 1;
    setNewRA([...newRA, { descripcionRA: '', acronimoRA: `RA${newRAIndex}` }]);
  };

  const handleSaveCompetencia = async () => {
    if (!selectedProgramaId || newCompetencia === '' || newRA.length === 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(`/api/competencias/${selectedProgramaId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreCompetencia: newCompetencia,
          ra: newRA,
        }),
      });

      if (response.ok) {
        alert('Competencia agregada exitosamente');
        setNewCompetencia('');
        setNewRA([{ descripcionRA: '', acronimoRA: 'RA1' }]);
        setShowModal(false);
      } else {
        const errorData = await response.json();
        alert(`Error al agregar la competencia: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error al agregar la competencia:', error);
    }
  };

  if (loading) return <p>Cargando programas...</p>;

  if (programas.length === 0) return <p>No se encontraron programas.</p>;

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Listado de Programas</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left text-gray-700 font-semibold border-b">Programa</th>
            <th className="py-3 px-6 text-left text-gray-700 font-semibold border-b">Competencia</th>
            <th className="py-3 px-6 text-left text-gray-700 font-semibold border-b">Acrónimo RA</th>
            <th className="py-3 px-6 text-left text-gray-700 font-semibold border-b">Resultado de Aprendizaje (RA)</th>
            <th className="py-3 px-6 text-center text-gray-700 font-semibold border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {programas.map((programa) => (
            <React.Fragment key={programa.idPrograma}>
              {programa.competencias.map((competencia, i) => (
                <React.Fragment key={competencia.idCompetencia}>
                  <tr className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    {i === 0 && (
                      <td
                        rowSpan={programa.competencias.length}
                        className="py-3 px-6 border-b text-gray-800 font-semibold align-top cursor-pointer hover:text-blue-500"
                        onClick={() => {
                          setSelectedProgramaId(programa.idPrograma);
                          setShowModal(true);
                        }}
                      >
                        {programa.nombrePrograma}
                      </td>
                    )}
                    <td className="py-3 px-6 border-b text-gray-800 font-semibold align-top">
                      {competencia.nombreCompetencia}
                    </td>
                    <td className="py-3 px-6 border-b text-gray-600">
                      <ul className="list-disc list-inside space-y-1">
                        {competencia.ra.map((ra) => (
                          <li key={ra.idRA}>{ra.acronimoRA}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3 px-6 border-b text-gray-600">
                      <ul className="list-disc list-inside space-y-1">
                        {competencia.ra.map((ra) => (
                          <li key={ra.idRA}>{ra.descripcionRA}</li>
                        ))}
                      </ul>
                    </td>
                    {i === 0 && (
                      <td
                        rowSpan={programa.competencias.length}
                        className="py-3 px-6 border-b text-center align-top"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Evitar conflicto con el modal
                            handleDeletePrograma(programa.idPrograma);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    )}
                  </tr>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4">Agregar Competencia al Programa</h3>
            <input
              type="text"
              placeholder="Nombre de la Competencia"
              value={newCompetencia}
              onChange={(e) => setNewCompetencia(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            {newRA.map((ra, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Descripción RA ${index + 1}`}
                  value={ra.descripcionRA}
                  onChange={(e) => {
                    const updatedRA = [...newRA];
                    updatedRA[index].descripcionRA = e.target.value;
                    setNewRA(updatedRA);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <span>{ra.acronimoRA}</span>
              </div>
            ))}
            <button onClick={handleAddRA} className="text-blue-500 hover:underline mb-4">
              + Agregar RA
            </button>
            <div className="flex gap-4">
              <button
                onClick={handleSaveCompetencia}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Guardar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
