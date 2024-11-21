"use client";

import { useState, useEffect } from "react";

interface Programa {
  idPrograma: number;
  nombrePrograma: string;
}

interface Archivo {
  id: number;
  nombre: string;
  ruta: string;
  programaPerteneciente: string;
  creado: string;
}

export default function Archivos() {
  const [programas, setProgramas] = useState<Programa[]>([]);
  const [archivos, setArchivos] = useState<Archivo[]>([]);
  const [selectedPrograma, setSelectedPrograma] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  // Cargar programas disponibles
  useEffect(() => {
    fetchProgramas();
    fetchArchivos();
  }, []);

  const fetchProgramas = async () => {
    const res = await fetch("/api/programas");
    const data = await res.json();
    setProgramas(data);
  };

  const fetchArchivos = async () => {
    const res = await fetch("/api/archivos");
    const data = await res.json();
    setArchivos(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleProgramaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrograma(e.target.value);
  };

  const handleUpload = async () => {
    if (!file || !selectedPrograma) {
      setMessage("Por favor, selecciona un archivo y un programa.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("programaPerteneciente", selectedPrograma);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Archivo subido con éxito!");
      fetchArchivos();
      // Limpiar el formulario
      setFile(null);
      setSelectedPrograma("");
    } else if (res.status === 409) {
      setMessage(data.error); // Mensaje: Ya existe un archivo para este programa
    } else {
      setMessage(data.error || "Error al subir el archivo.");
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/archivos/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setMessage("Archivo eliminado con éxito!");
      fetchArchivos();
    } else {
      setMessage("Error al eliminar el archivo.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Archivos</h1>

      {/* Formulario para subir archivo */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Subir Archivo</h2>

        {/* Select para elegir programa */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Selecciona un Programa
          </label>
          <select
            value={selectedPrograma}
            onChange={handleProgramaChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="" disabled>
              Selecciona un programa
            </option>
            {programas.map((programa) => (
              <option key={programa.idPrograma} value={programa.nombrePrograma}>
                {programa.nombrePrograma}
              </option>
            ))}
          </select>
        </div>

        {/* Input para seleccionar archivo */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Selecciona un Archivo
          </label>
          <input
            type="file"
            className="border border-gray-300 rounded-lg p-2 w-full"
            onChange={handleFileChange}
          />
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleUpload}
        >
          Subir Archivo
        </button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </div>

      {/* Tabla para listar archivos */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2">Programa</th>
              <th className="px-4 py-2">Nombre del Archivo</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {archivos.map((archivo) => (
              <tr key={archivo.id} className="border-t">
                <td className="px-4 py-2">{archivo.programaPerteneciente}</td>
                <td className="px-4 py-2">
                  <a
                    href={archivo.ruta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {archivo.nombre}
                  </a>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-lg mr-2"
                    onClick={() => handleDelete(archivo.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
