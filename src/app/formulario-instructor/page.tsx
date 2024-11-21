"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function FormularioInstructor() {
  const [nombre, setNombre] = useState("");
  const [instructores, setInstructores] = useState([]); // Estado para los instructores
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

      const newInstructor = await response.json();
      toast.success("Instructor agregado con éxito");
      setInstructores([...instructores, newInstructor]); // Agregar nuevo instructor al estado directamente
      setNombre(""); // Limpia el input después de agregar
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar el instructor");
    }
  };

  const fetchInstructores = async () => {
    try {
      const response = await fetch("/api/instructores");
      if (!response.ok) {
        throw new Error("Error al obtener los instructores");
      }
      const data = await response.json();
      setInstructores(data); // Inicializa el estado con los instructores obtenidos
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener instructores");
    }
  };

  const deleteInstructor = async (id: number) => {
    try {
      const response = await fetch(`/api/instructores/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el instructor");
      }

      toast.success("Instructor eliminado con éxito");

      // Actualizamos el estado eliminando el instructor del arreglo sin recargar
      setInstructores((prevInstructores) =>
        prevInstructores.filter((instructor) => instructor.idInstructor !== id)
      );
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el instructor");
    }
  };

  const updateInstructor = async (id: number) => {
    const nuevoNombre = prompt("Ingrese el nuevo nombre del instructor:");
    if (!nuevoNombre) {
      toast.error("El nombre no puede estar vacío");
      return;
    }

    try {
      const response = await fetch(`/api/instructores/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreInstructor: nuevoNombre }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el instructor");
      }

      const updatedInstructor = await response.json();
      toast.success("Instructor actualizado con éxito");

      // Actualizamos el estado directamente en tiempo real
      setInstructores((prevInstructores) =>
        prevInstructores.map((instructor) =>
          instructor.idInstructor === id
            ? { ...instructor, nombreInstructor: updatedInstructor.nombreInstructor } // Actualizamos solo el nombre del instructor que cambió
            : instructor // Mantenemos los demás instructores igual
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el instructor");
    }
  };

  useEffect(() => {
    fetchInstructores(); // Cargar instructores al montar el componente
  }, []);

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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Guardar Instructor
        </button>
      </form>

      <h3 className="text-xl font-bold mb-4">Lista de Instructores</h3>
      <ul className="bg-white shadow-md rounded px-4 py-4">
        {instructores.map((instructor: { idInstructor: number; nombreInstructor: string }) => (
          <li
            key={instructor.idInstructor}
            className="flex justify-between items-center mb-2 p-2 border-b border-gray-300"
          >
            <span className="text-gray-800">{instructor.nombreInstructor}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => updateInstructor(instructor.idInstructor)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
              >
                Actualizar
              </button>
              <button
                onClick={() => deleteInstructor(instructor.idInstructor)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
