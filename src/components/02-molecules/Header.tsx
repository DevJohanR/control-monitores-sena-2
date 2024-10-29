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
                        text="RA" 
                        onClick={() => console.log('Profile button clicked')} 
                        className="bg-blue-500 text-black hover:bg-blue-700 hover:text-white" 
                        icon={<FaPlus />} 
                    />
            </div>
        </div>
    );
}
