"use client";

import { useState, useEffect } from "react";

interface Archivo {
  id: number;
  nombre: string;
  ruta: string;
  programaPerteneciente: string;
  creado: string;
}

export default function ListaArchivos() {
  const [archivos, setArchivos] = useState<Archivo[]>([]);

  // Cargar archivos desde la API
  useEffect(() => {
    const fetchArchivos = async () => {
      const res = await fetch("/api/archivos"); // Cambia la ruta si es necesario
      const data = await res.json();
      setArchivos(data);
    };

    fetchArchivos();
  }, []);

  return (
    <div>
      <h1>Lista de Archivos Subidos.</h1>
      <ul>
        {archivos.map((archivo) => (
          <li key={archivo.id}>
            <a href={archivo.ruta} target="_blank" rel="noopener noreferrer">
              {archivo.ruta}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
