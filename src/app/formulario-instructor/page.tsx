// app/formulario-instructor/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"; // Importar toast

export default function FormularioInstructor() {
  const [nombre, setNombre] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/instructores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreInstructor: nombre }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el instructor");
      }

      // Mostrar notificación de éxito
      toast.success("Instructor agregado con éxito");

      // Redirigir después de un breve retraso
      setTimeout(() => {
        router.push("/"); // Redirige a la página principal
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar el instructor");
    }
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold text-blue-500 mb-4 border-b-2 border-blue-500 pb-2">
        Agregar Instructor
      </h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre del Instructor
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar Instructor
          </button>
          <button
            type="button"
            onClick={() => router.back()} // Navegar hacia atrás
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
