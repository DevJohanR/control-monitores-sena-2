import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Listar todos los archivos
export async function GET() {
  try {
    const archivos = await prisma.archivo.findMany({
      orderBy: { creado: "desc" },
    });
    return NextResponse.json(archivos);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al listar los archivos" },
      { status: 500 }
    );
  }
}
