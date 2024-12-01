// src/components/02-molecules/Header/Header.tsx
"use client";

import React from 'react';

import Logo from '../01-atoms/Logo';
import Button from '../01-atoms/Button';
import { FaPlus,FaBookOpen, FaSignOutAlt} from 'react-icons/fa';
import { useRouter } from "next/navigation";


export default function Header() {
    const router = useRouter();

    const handleAddInstructor = () => {
        router.push("/formulario-instructor");
      };

      const handleManagePrograms = () => {
        router.push("/programas"); // Redireccionar a la nueva página
    };

    const handleAddFichas = () => {
        router.push("/formulario-ficha")
    }

    const handleAddArchivos = () => {
        router.push("/nube")
    }

    const handleDocumentationPage = () => {
        router.push("/documentacion-page");
      };
    
      const handleLogout = () => {
        // Aquí puedes agregar la lógica para cerrar sesión, como limpiar tokens o llamar a una API.
        console.log("Sesión cerrada");
        router.push("/login"); // Redirige al usuario a la página de inicio de sesión
    };

    return (
        <div className="fixed top-0 w-full flex justify-between items-center h-16 shadow-md bg-white px-6 z-50 text-gray-700">
            <span><Logo /></span>
 
            <div className="flex space-x-4">
            <Button 
                        text="Instructor" 
                        onClick={handleAddInstructor}
                        className="bg-blue-500 text-black hover:bg-blue-700 hover:text-white" 
                        icon={<FaPlus />} 
                    />

<Button 
                        text="Fichas" 
                        onClick={handleAddFichas} 
                        className="bg-blue-500 text-black hover:bg-blue-700 hover:text-white" 
                        icon={<FaPlus />} 
                    />

<Button
                    text="Programas"
                    onClick={handleManagePrograms}
                    className="bg-blue-500 text-black hover:bg-blue-700 hover:text-white"
                    icon={<FaPlus />}
                />

<Button
                    text="Archivos"
                    onClick={handleAddArchivos}
                    className="bg-blue-500 text-black hover:bg-blue-700 hover:text-white"
                    icon={<FaPlus />}
                />

{/* Botón de Documentación */}
<button
          onClick={handleDocumentationPage}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out flex items-center gap-2 border-2 border-white hover:border-purple-700"
        >
          <FaBookOpen className="text-lg" />
          Documentación
        </button>

         {/* Botón de Cerrar Sesión */}
         <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 ease-in-out flex items-center gap-2"
                >
                    <FaSignOutAlt className="text-lg" />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}
