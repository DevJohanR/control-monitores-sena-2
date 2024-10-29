import React from 'react';
import { ReactNode } from 'react'; // Importamos ReactNode para el tipo del icono

interface ButtonProps {
  text: string;
  onClick?: () => void; // Función que se ejecutará cuando se haga clic en el botón
  className?: string; // Permite agregar clases adicionales de Tailwind para personalizar el estilo
  icon?: ReactNode; // Ícono opcional que se mostrará dentro del botón
}

// El componente Button acepta props según la interfaz ButtonProps
export default function Button({ text, onClick, className = '', icon }: ButtonProps) {
  return (
    <button
      className={`bg-slate-300 text-[10px] pl-5 pr-5 pt-2 pb-2 rounded-xl flex items-center space-x-2 ${className}`}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>} {/* Si icon está definido, lo renderiza */}
      <span>{text}</span>
    </button>
  );
}
