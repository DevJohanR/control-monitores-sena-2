"use client";

import { useState } from 'react';
import TablaProgramas from '@/components/02-molecules/TablaProgramas';


export default function GestionProgramas() {
    const [programa, setPrograma] = useState('');
    const [competencias, setCompetencias] = useState([{ nombre: '', ras: [''] }]);

    const handleProgramaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrograma(e.target.value);
        console.log("Nombre del programa:", e.target.value); // Depuración
    };

    const handleCompetenciaChange = (index: number, value: string) => {
        const newCompetencias = [...competencias];
        newCompetencias[index].nombre = value;
        setCompetencias(newCompetencias);
        console.log(`Competencia ${index + 1} actualizada:`, value); // Depuración
    };

    const handleRAChange = (competenciaIndex: number, raIndex: number, value: string) => {
        const newCompetencias = [...competencias];
        newCompetencias[competenciaIndex].ras[raIndex] = value;
        setCompetencias(newCompetencias);
        console.log(`RA ${raIndex + 1} para Competencia ${competenciaIndex + 1} actualizada:`, value); // Depuración
    };

    const addCompetencia = () => {
        setCompetencias([...competencias, { nombre: '', ras: [''] }]);
        console.log("Competencia agregada. Estado actual de competencias:", competencias); // Depuración
    };

    const addRA = (competenciaIndex: number) => {
        const newCompetencias = [...competencias];
        newCompetencias[competenciaIndex].ras.push('');
        setCompetencias(newCompetencias);
        console.log(`RA agregado para Competencia ${competenciaIndex + 1}. Estado actual:`, newCompetencias); // Depuración
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            nombrePrograma: programa,
            competencias: competencias.map((comp) => ({
                nombreCompetencia: comp.nombre,
                ra: comp.ras,
            })),
        };

        console.log("Datos a enviar al backend:", JSON.stringify(data, null, 2)); // Depuración antes del envío

        try {
            const response = await fetch('/api/programas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Programa creado exitosamente:", await response.json()); // Depuración después de respuesta exitosa
                alert('Programa creado exitosamente');
                setPrograma('');
                setCompetencias([{ nombre: '', ras: [''] }]);
            } else {
                const errorData = await response.json();
                console.error("Error en la respuesta del servidor:", errorData);
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
                            value={competencia.nombre}
                            onChange={(e) => handleCompetenciaChange(i, e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {competencia.ras.map((ra, j) => (
                            <input
                                key={j}
                                type="text"
                                placeholder={`RA ${j + 1}`}
                                value={ra}
                                onChange={(e) => handleRAChange(i, j, e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        ))}
                        <button
                            type="button"
                            onClick={() => addRA(i)}
                            className="text-blue-500 hover:underline"
                        >
                            + Agregar RA
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addCompetencia}
                    className="text-blue-500 hover:underline"
                >
                    + Agregar Competencia
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Guardar Programa
                </button>
            </form>
               {/* Tabla para mostrar programas existentes */}
      <TablaProgramas />
        </div>
    );
}
