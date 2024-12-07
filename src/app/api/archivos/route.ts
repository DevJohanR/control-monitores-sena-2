import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Listar todos los archivos
export async function GET() {
  try {
    console.log("Iniciando conexión con la base de datos...");

    // Consultar todos los archivos ordenados por la fecha de creación descendente
    const archivos = await prisma.archivo.findMany({
      orderBy: { creado: "desc" },
    });

    console.log("Archivos obtenidos exitosamente:", archivos);

    // Respuesta exitosa
    return NextResponse.json(archivos);
  } catch (error) {
    console.error("Error al listar los archivos:", error);

    // Respuesta de error en caso de fallo
    return NextResponse.json(
      { error: "Error al listar los archivos" },
      { status: 500 }
    );
  }
}
