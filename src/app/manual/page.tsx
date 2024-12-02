"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaYoutube, FaListAlt, FaExclamationTriangle, FaCloud, FaHome } from "react-icons/fa";

export default function Manual() {
  const router = useRouter();
  const [showRequirements, setShowRequirements] = useState(false);

  const handleNavigateToTutorial = () => {
    window.open("https://youtu.be/Kn8G2I5SGjE", "_blank"); // Cambia por el enlace a tu tutorial
  };

  const toggleRequirements = () => {
    setShowRequirements(!showRequirements);
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleHome}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold italic transition-all duration-200"
      >
        <FaHome className="text-lg" />
        <span>Inicio</span>
      </button>
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-6">
        Panel de Información
      </h1>

      {/* Advertencia */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm mb-6 flex items-center gap-4">
        <FaExclamationTriangle className="text-yellow-500 text-3xl" />
        <p className="text-gray-800 leading-relaxed">
          Aunque esta aplicación puede funcionar utilizando herramientas gratuitas, se deben
          considerar las limitaciones, como recursos reducidos y el riesgo de interrupciones en
          momentos de alta demanda. Por eso, recomendamos las siguientes herramientas para
          garantizar un funcionamiento óptimo y constante.
        </p>
      </div>

      <div className="text-center mb-8 flex justify-center gap-4">
        <button
          onClick={toggleRequirements}
          className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-all flex items-center gap-2"
        >
          <FaListAlt className="text-lg" />
          Ver Requisitos de Funcionamiento
        </button>
        <button
          onClick={handleNavigateToTutorial}
          className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-all flex items-center gap-2"
        >
          <FaYoutube className="text-lg" />
          Tutorial para Cargar Horarios
        </button>
      </div>

      {showRequirements && (
        <div>
          {/* Vercel Section */}
          <section className="bg-white shadow-md rounded-lg p-6 mb-10">
            <h2 className="text-2xl font-semibold text-blue-500 flex items-center gap-2 mb-4">
              Vercel - Hosting Principal
            </h2>
            <Image
              src="/images/NEXTJSUPDATE.png"
              alt="Vercel Hosting"
              width={500}
              height={250}
              className="rounded-lg shadow-lg mx-auto mb-6"
            />
            <p className="text-gray-700 leading-relaxed mb-6">
              Vercel es la mejor opción para este proyecto de control de horarios, ya que
              proporciona un hosting confiable, escalable y rápido. Su velocidad de carga
              asegura que los usuarios puedan acceder al sistema sin interrupciones en cualquier
              momento. Gracias a su integración perfecta con Next.js, Vercel garantiza que este
              aplicativo opere de manera óptima las 24 horas del día.
            </p>
          </section>

          {/* Hostinger Section */}
          <section className="bg-white shadow-md rounded-lg p-6 mb-10">
            <h2 className="text-2xl font-semibold text-blue-500 flex items-center gap-2 mb-4">
              Hostinger - Base de Datos
            </h2>
            <Image
              src="/images/HOSTINGERUPDATE.png"
              alt="Hostinger Database"
              width={800}
              height={400}
              className="rounded-lg shadow-lg mx-auto mb-6"
            />
            <p className="text-gray-700 leading-relaxed mb-6">
              Hostinger es la mejor opción para gestionar la base de datos de este proyecto de
              control de horarios, gracias a sus consultas ilimitadas. Esto garantiza que todos
              los usuarios puedan acceder a la información en tiempo real, sin restricciones
              ni interrupciones, incluso en momentos de alta demanda. Su fiabilidad asegura
              una experiencia de usuario impecable.
            </p>
          </section>

          {/* EmailJS Section */}
          <section className="bg-white shadow-md rounded-lg p-6 mb-10">
            <h2 className="text-2xl font-semibold text-blue-500 flex items-center gap-2 mb-4">
              EmailJS - Recuperación de Contraseñas
            </h2>
            <Image
              src="/images/EMAILJS.png"
              alt="EmailJS Password Recovery"
              width={300}
              height={150}
              className="rounded-lg shadow-lg mx-auto mb-6"
            />
            <p className="text-gray-700 leading-relaxed mb-6">
              EmailJS asegura que, en caso de perder la contraseña, el administrador del sistema
              pueda recuperarla de manera rápida y segura. Es una herramienta ideal para este
              proyecto, ya que simplifica la gestión del correo electrónico, eliminando la
              necesidad de servidores adicionales para notificaciones.
            </p>
          </section>

          {/* Cloudinary Section */}
          <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-500 flex items-center gap-2 mb-4">
              <FaCloud /> Cloudinary - Gestión de Archivos PDF
            </h2>
            <Image
              src="/images/cloudinary.png"
              alt="Cloudinary"
              width={400}
              height={200}
              className="rounded-lg shadow-lg mx-auto mb-6"
            />
          <p className="text-gray-700 leading-relaxed mb-6">
  Este proyecto requiere obligatoriamente el uso de <strong>Cloudinary Pro</strong> para habilitar la funcionalidad de carga de archivos. La razón técnica detrás de esta necesidad radica en que Vercel, la plataforma utilizada para desplegar esta aplicación, no permite la carga directa de archivos al servidor. En su lugar, es necesario utilizar un servicio externo especializado como Cloudinary para gestionar el almacenamiento y procesamiento de archivos. Puedes consultar más detalles sobre las limitaciones de Vercel en su documentación oficial: 
  <a 
    href="https://vercel.com/docs/platform/limits#streaming-and-form-data" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-blue-500 underline"
  >
    Vercel Platform Limits
  </a>.
</p>
<p className="text-gray-700 leading-relaxed mb-6">
  <strong>Nota técnica:</strong> Sin la versión Pro de Cloudinary, las capacidades necesarias para este proyecto, como la generación de URLs seguras para archivos, el manejo de grandes cantidades de datos, y la garantía de disponibilidad en producción, no están habilitadas. Esto se debe a que la API en la versión gratuita tiene limitaciones estrictas que no permiten la integración adecuada en proyectos a escala.
</p>
<p className="text-gray-700 leading-relaxed mb-6">
  Por lo tanto, si no cuentas con Cloudinary Pro, la función de carga de archivos estará completamente inhabilitada, afectando directamente la experiencia del usuario y el propósito principal de esta aplicación.
</p>

          </section>
        </div>
      )}
    </div>
  );
}
