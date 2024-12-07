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

  // Cargar programas y archivos al inicio
  useEffect(() => {
    console.log("Inicializando componente...");
    fetchProgramas();
    fetchArchivos();
  }, []);

  const fetchProgramas = async () => {
    console.log("Obteniendo programas...");
    try {
      const res = await fetch("/api/programas");
      if (!res.ok) {
        console.error("Error al obtener programas:", res.statusText);
        return;
      }
      const data = await res.json();
      console.log("Programas obtenidos:", data);
      setProgramas(data);
    } catch (error) {
      console.error("Error en fetchProgramas:", error);
    }
  };

  const fetchArchivos = async () => {
    console.log("Obteniendo archivos...");
    try {
      // Añadir timestamp para evitar posibles problemas de caché
      const res = await fetch(`/api/archivos?timestamp=${Date.now()}`);
      if (!res.ok) {
        console.error("Error al obtener archivos:", res.statusText);
        return;
      }
      const data = await res.json();
      console.log("Archivos obtenidos:", data);
      setArchivos(data);
    } catch (error) {
      console.error("Error en fetchArchivos:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      console.log("Archivo seleccionado:", e.target.files[0]);
    }
  };

  const handleProgramaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrograma(e.target.value);
    console.log("Programa seleccionado:", e.target.value);
  };

  const handleUpload = async () => {
    if (!file || !selectedPrograma) {
      setMessage("Por favor, selecciona un archivo y un programa.");
      console.warn("Intento de subida sin archivo o programa.");
      return;
    }

    try {
      console.log("Subiendo archivo:", file.name, "para el programa:", selectedPrograma);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("programaPerteneciente", selectedPrograma);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Respuesta de subida:", data);

      if (res.ok) {
        setMessage("Archivo subido con éxito!");
        console.log("Actualizando lista de archivos...");
        await fetchArchivos();
        // Limpiar el formulario
        setFile(null);
        setSelectedPrograma("");
      } else if (res.status === 409) {
        setMessage(data.error);
      } else {
        setMessage("Error al subir el archivo.");
      }
    } catch (error) {
      console.error("Error en handleUpload:", error);
      setMessage("Error al subir el archivo.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      console.log("Eliminando archivo con id:", id);
      const res = await fetch(`/api/archivos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage("Archivo eliminado con éxito!");
        console.log("Actualizando lista de archivos...");
        await fetchArchivos();
      } else {
        console.error("Error al eliminar el archivo:", res.statusText);
        setMessage("Error al eliminar el archivo.");
      }
    } catch (error) {
      console.error("Error en handleDelete:", error);
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
