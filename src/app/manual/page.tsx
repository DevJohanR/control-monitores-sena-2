"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FaYoutube,
  FaListAlt,
  FaExclamationTriangle,
  FaCloud,
  FaHome,
  FaCreditCard,
  FaCheckCircle,

} from "react-icons/fa";

export default function Manual() {
  const router = useRouter();
  const [showRequirements, setShowRequirements] = useState(false);

  const handleNavigateToTutorial = () => {
    window.open("https://youtu.be/Kn8G2I5SGjE", "_blank");
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
          Herramientas y Configuración Recomendadas
        </button>
        <button
          onClick={handleNavigateToTutorial}
          className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-all flex items-center gap-2"
        >
          <FaYoutube className="text-lg" />
          Tutorial para Cargar Horarios
        </button>
      </div>

      {/* Nueva sección de alerta */}
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-lg mb-8 flex items-start gap-4">
        <FaCreditCard className="text-red-600 text-4xl" />
        <div>
          <h2 className="text-xl font-bold text-red-600 mb-2">
            ¡Importante para adquirir los servicios recomendados!
          </h2>
          <p className="text-gray-800 leading-relaxed">
            Los servicios mencionados a continuación, como AWS S3, Hostinger y EmailJS, requieren
            una <strong>suscripción con tarjeta de crédito</strong>. Ten en cuenta que estas empresas
            cobran en <strong>dólares</strong>, y algunos servicios podrían tener costos adicionales
            dependiendo del uso. Es importante planificar el presupuesto para evitar sorpresas
            en la facturación.
          </p>
        </div>
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

          {/* AWS S3 Section */}
          <section className="bg-white shadow-md rounded-lg p-6 mb-10">
            <h2 className="text-2xl font-semibold text-blue-500 flex items-center gap-2 mb-4">
              <FaCloud /> AWS S3 - Almacenamiento de Archivos
            </h2>
            <Image
              src="/images/cloudinary.png"
              alt="AWS S3 Storage"
              width={400}
              height={200}
              className="rounded-lg shadow-lg mx-auto mb-6"
            />
            <p className="text-gray-700 leading-relaxed mb-6">
              Este proyecto utiliza <strong>AWS S3</strong> para gestionar el almacenamiento de archivos PDF debido a su fiabilidad y escalabilidad. AWS S3 incluye una capa gratuita de 12 meses con 5 GB de almacenamiento, 20,000 solicitudes GET, y 2,000 solicitudes PUT o LIST. Esto hace que sea ideal para proyectos pequeños o en fase de pruebas.
              <a
                href="https://aws.amazon.com/s3/pricing/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Consulta los precios de AWS S3 aquí
              </a>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Importante:</strong> Para habilitar las operaciones de escritura, lectura, y eliminación de archivos, se requiere configurar las políticas de acceso en el bucket de S3. Asegúrate de incluir permisos como <code>s3:PutObject</code>, <code>s3:GetObject</code>, y <code>s3:DeleteObject</code>. También puedes habilitar el <em>bloqueo de acceso público</em> para mayor seguridad.
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

          {/* Nueva sección destacada */}
          <section className="bg-gray-900 text-white shadow-md rounded-lg p-6 mb-10">
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
              <FaCheckCircle className="text-green-500" /> Uso de GitHub y Personalización
            </h2>
            <p className="leading-relaxed mb-4">
              Este proyecto ha sido diseñado para producción, lo que significa que está optimizado
              para ser desplegado en un entorno accesible para usuarios finales, con un rendimiento
              confiable y configuraciones específicas. Sin embargo, también puedes adaptarlo a un
              entorno local siguiendo estas recomendaciones:
            </p>
            <ul className="list-disc pl-6 text-gray-300">
              <li className="mb-2">Haz un <strong>fork</strong> del repositorio en GitHub.</li>
              <li className="mb-2">
                Configura el archivo <code>.env</code> con las credenciales de servicios.
              </li>
              <li className="mb-2">
                Instala las siguientes herramientas necesarias:
                <ul className="list-disc pl-4 mt-2">
                  <li className="mb-1">
                    <a
                      href="https://nodejs.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Node.js
                    </a> (ejecuta el backend y frontend).
                  </li>
                  <li className="mb-1">
                    <a
                      href="https://www.mysql.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      MySQL
                    </a> (base de datos).
                  </li>
                  <li className="mb-1">
                    <a
                      href="https://code.visualstudio.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Visual Studio Code
                    </a> (editor de código recomendado).
                  </li>
                  <li className="mb-1">
                    <a
                      href="https://www.typescriptlang.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      TypeScript
                    </a> (compatibilidad con el código del proyecto).
                  </li>
                </ul>
              </li>
              <li className="mb-2">Ejecuta el proyecto localmente con <code>npm run dev</code>.</li>
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
