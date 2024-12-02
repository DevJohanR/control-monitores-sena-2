"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "@/components/02-molecules/Header";

// Define la interfaz para una ficha
interface Ficha {
  idFicha: number;
  numeroFicha: string;
}

export default function FormularioFicha() {
  const [numeroFicha, setNumeroFicha] = useState<string>(""); // Estado para el número de ficha
  const [fichas, setFichas] = useState<Ficha[]>([]); // Estado para las fichas

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/cargarficha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numeroFicha }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar la ficha");
      }

      const newFicha: Ficha = await response.json();
      toast.success("Ficha agregada con éxito");
      setFichas([...fichas, newFicha]); // Agregar nueva ficha al estado
      setNumeroFicha(""); // Limpia el input después de agregar
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar la ficha");
    }
  };

  const fetchFichas = async () => {
    try {
      const response = await fetch("/api/cargarficha");
      if (!response.ok) {
        throw new Error("Error al obtener las fichas");
      }
      const data: Ficha[] = await response.json();
      setFichas(data); // Inicializa el estado con las fichas obtenidas
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener fichas");
    }
  };

  const deleteFicha = async (id: number) => {
    try {
      const response = await fetch(`/api/cargarficha/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la ficha");
      }

      toast.success("Ficha eliminada con éxito");

      setFichas((prevFichas) =>
        prevFichas.filter((ficha) => ficha.idFicha !== id)
      );
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la ficha");
    }
  };

  const updateFicha = async (id: number) => {
    const nuevoNumero = prompt("Ingrese el nuevo número de ficha:");
    if (!nuevoNumero) {
      toast.error("El número de ficha no puede estar vacío");
      return;
    }

    try {
      const response = await fetch(`/api/cargarficha/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numeroFicha: nuevoNumero }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la ficha");
      }

      const updatedFicha: Ficha = await response.json();
      toast.success("Ficha actualizada con éxito");

      setFichas((prevFichas) =>
        prevFichas.map((ficha) =>
          ficha.idFicha === id
            ? { ...ficha, numeroFicha: updatedFicha.numeroFicha }
            : ficha
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la ficha");
    }
  };

  useEffect(() => {
    fetchFichas(); // Cargar fichas al montar el componente
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto my-8 px-4 mt-20">
        <h2 className="text-2xl font-bold text-blue-500 mb-4 border-b-2 border-blue-500 pb-2">
          Agregar Ficha
        </h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="numeroFicha"
            >
              Número de Ficha
            </label>
            <input
              id="numeroFicha"
              type="text"
              placeholder="Número de Ficha"
              value={numeroFicha}
              onChange={(e) => setNumeroFicha(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar Ficha
          </button>
        </form>

        <h3 className="text-xl font-bold mb-4">Lista de Fichas</h3>
        <ul className="bg-white shadow-md rounded px-4 py-4">
          {fichas.map((ficha) => (
            <li
              key={ficha.idFicha}
              className="flex justify-between items-center mb-2 p-2 border-b border-gray-300"
            >
              <span className="text-gray-800">{ficha.numeroFicha}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => updateFicha(ficha.idFicha)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
                >
                  Actualizar
                </button>
                <button
                  onClick={() => deleteFicha(ficha.idFicha)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
