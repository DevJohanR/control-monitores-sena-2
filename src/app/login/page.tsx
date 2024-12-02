"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import Logo from "@/components/01-atoms/Logo"; // Asegúrate de que el path sea correcto
import { FaGithub, FaBookOpen } from "react-icons/fa"; // Importa los íconos necesarios

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (
      email === "Demartinezf@sena.edu.co" &&
      password === "C7h9*K2j5"
    ) {
      localStorage.setItem("isAuthenticated", "true");
      router.push("/"); // Redirige a la página principal
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  const handleForgotPassword = () => {
    if (email === "desarrollador7777@gmail.com") {
      emailjs
        .send(
          "service_0jj8k8v", // Reemplaza con tu Service ID
          "template_16yo33q", // Reemplaza con tu Template ID
          {
            to_email: email,
            password: "ClaveSeguraMiSena7777*", // Contraseña enviada
          },
          "cjkjbGu4931eL6ado" // Reemplaza con tu User ID
        )
        .then(
          () => {
            setMessage(
              "La contraseña ha sido enviada a tu correo electrónico."
            );
            setError("");
          },
          (error) => {
            console.error("Error al enviar el correo:", error);
            setError("Hubo un problema al enviar el correo.");
          }
        );
    } else {
      setError("Por favor, ingresa el correo asociado a tu cuenta.");
    }
  };

  const handleDocumentationPage = () => {
    router.push("/documentacion-page");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center text-center">
        {/* Contenedor del logo */}
        <div className="mb-8">
          <Logo />
        </div>

        {/* Descripción */}
        <p className="max-w-xs text-lg text-gray-800 font-semibold leading-tight mb-4">
          <span className="text-blue-600 font-bold">Aplicación</span> para el{" "}
          <span className="font-bold">control</span> de horarios{" "}
          <span className="text-blue-600 font-bold">instructores</span>
        </p>

        {/* Botón de Documentación */}
        <button
          onClick={handleDocumentationPage}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out flex items-center gap-2 border-2 border-white hover:border-purple-700 mb-8"
        >
          <FaBookOpen className="text-lg" />
          Documentación
        </button>

        {/* Formulario */}
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={handleForgotPassword}
            className="w-full mt-4 text-sm text-blue-500 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-sm text-gray-500">
          <p className="italic flex items-center justify-center gap-2">
            <FaGithub className="text-gray-800" /> {/* Ícono de GitHub */}
            <a
              href="https://github.com/DevJohanR"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Desarrollado por DevJohanR - Analisis y Desarrollo de Software (2721397)
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
