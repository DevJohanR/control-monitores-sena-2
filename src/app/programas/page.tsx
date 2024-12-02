"use client";

import { useState } from "react";
import TablaProgramas from "@/components/02-molecules/TablaProgramas";
import Header from "@/components/02-molecules/Header";

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
  const [programa, setPrograma] = useState("");
  const [competencias, setCompetencias] = useState<CompetenciaData[]>([
    { nombreCompetencia: "", ra: [{ descripcionRA: "", acronimoRA: "RA1" }] },
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
    setCompetencias([
      ...competencias,
      { nombreCompetencia: "", ra: [{ descripcionRA: "", acronimoRA: "RA1" }] },
    ]);
  };

  const addRA = (competenciaIndex: number) => {
    const newCompetencias = [...competencias];
    const raIndex = newCompetencias[competenciaIndex].ra.length + 1;
    newCompetencias[competenciaIndex].ra.push({
      descripcionRA: "",
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
      const response = await fetch("/api/programas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Programa creado exitosamente");
        setPrograma("");
        setCompetencias([{ nombreCompetencia: "", ra: [{ descripcionRA: "", acronimoRA: "RA1" }] }]);
      } else {
        const errorData = await response.json();
        alert(`Error al crear el programa: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error en el envío del formulario:", error);
    }
  };

  return (
    <>
    <Header/>
   
    <div className="container mx-auto my-8 px-4 mt-20">
      {/* Título estilizado */}
      <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Agregar Programa</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
        {/* Input para el nombre del programa */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="nombrePrograma">
            Nombre del Programa
          </label>
          <input
            type="text"
            id="nombrePrograma"
            placeholder="Ingrese el nombre del programa"
            value={programa}
            onChange={handleProgramaChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        {/* Competencias y RAs */}
        {competencias.map((competencia, i) => (
          <div key={i} className="border border-gray-300 rounded-lg p-4 space-y-4">
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor={`competencia-${i}`}
              >
                Competencia {i + 1}
              </label>
              <input
                type="text"
                id={`competencia-${i}`}
                placeholder={`Competencia ${i + 1}`}
                value={competencia.nombreCompetencia}
                onChange={(e) => handleCompetenciaChange(i, e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>

            {/* RAs dentro de la competencia */}
            {competencia.ra.map((ra, j) => (
              <div key={j} className="flex items-center gap-4">
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor={`ra-${i}-${j}`}
                  >
                    Resultado de Aprendizaje (RA) {j + 1}
                  </label>
                  <input
                    type="text"
                    id={`ra-${i}-${j}`}
                    placeholder={`RA ${j + 1}`}
                    value={ra.descripcionRA}
                    onChange={(e) => handleRAChange(i, j, e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                  />
                </div>
                <span className="text-gray-500 font-semibold">{ra.acronimoRA}</span>
              </div>
            ))}

            {/* Botón para agregar más RAs */}
            <button
              type="button"
              onClick={() => addRA(i)}
              className="text-blue-500 hover:underline font-semibold"
            >
              + Agregar RA
            </button>
          </div>
        ))}

        {/* Botón para agregar más competencias */}
        <button
          type="button"
          onClick={addCompetencia}
          className="text-blue-500 hover:underline font-semibold"
        >
          + Agregar Competencia
        </button>

        {/* Botón para guardar el programa */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Guardar Programa
          </button>
        </div>
      </form>

      {/* Tabla de programas */}
      <div className="mt-10">
        <TablaProgramas />
      </div>
    </div>
    </>
  );
}
