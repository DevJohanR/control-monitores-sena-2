import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// DELETE - Eliminar un archivo
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const archivoId = parseInt(params.id, 10);

  try {
    const archivo = await prisma.archivo.findUnique({
      where: { id: archivoId },
    });

    if (!archivo) {
      return NextResponse.json({ error: "Archivo no encontrado" }, { status: 404 });
    }

    // Eliminar archivo físico
    const filePath = path.join(process.cwd(), "public", archivo.ruta);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error("Error al eliminar el archivo físico:", error);
    }

    // Eliminar registro en la base de datos
    await prisma.archivo.delete({ where: { id: archivoId } });

    return NextResponse.json({ message: "Archivo eliminado con éxito" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al eliminar el archivo" },
      { status: 500 }
    );
  }
}
