// src/components/02-molecules/Header/Header.tsx
"use client";

import React from 'react';

import Logo from '../01-atoms/Logo';
import Button from '../01-atoms/Button';
import { FaPlus } from 'react-icons/fa';
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


            </div>
        </div>
    );
}
