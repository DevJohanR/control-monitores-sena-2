import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// POST - Subir un archivo
export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get("file") as File;
    const programaPerteneciente = data.get("programaPerteneciente") as string;

    if (!file || !programaPerteneciente) {
      return NextResponse.json(
        { error: "Archivo o programa no proporcionados" },
        { status: 400 }
      );
    }

    // Normalizar nombre del archivo y programa
    const programa = programaPerteneciente.toUpperCase().trim();

    // Verificar si ya existe un archivo para este programa
    const existingArchivo = await prisma.archivo.findFirst({
      where: { programaPerteneciente: programa },
    });

    if (existingArchivo) {
      return NextResponse.json(
        { error: "Ya existe un archivo para este programa. Por favor, elimínalo primero." },
        { status: 409 } // Código 409: Conflicto
      );
    }

    // Normalizar nombre del archivo
    const fileName = `${Date.now()}-${file.name}`.toUpperCase().trim().replace(/\s+/g, "_");

    // Ruta de la carpeta `uploads`
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Crear la carpeta `uploads` si no existe
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Guardar el nuevo archivo
    const filePath = path.join(uploadDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    // Registrar el archivo en la base de datos
    const newArchivo = await prisma.archivo.create({
      data: {
        nombre: fileName,
        ruta: `/uploads/${fileName}`,
        programaPerteneciente: programa,
      },
    });

    return NextResponse.json({
      message: "Archivo subido con éxito",
      archivo: newArchivo,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al procesar el archivo" },
      { status: 500 }
    );
  }
}
