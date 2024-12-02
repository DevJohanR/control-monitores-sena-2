// src/app/layout.tsx
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Control de Horarios",
  description: "Aplicación web interactiva que muestra los horarios de los instructores en un calendario semanal organizado por jornadas y días.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
