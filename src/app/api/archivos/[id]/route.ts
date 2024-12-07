import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DELETE - Eliminar un archivo (solo elimina el registro de la base de datos)
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const archivoId = parseInt(params.id, 10);

  try {
    // Buscar y eliminar el archivo de la base de datos
    const archivo = await prisma.archivo.findUnique({ where: { id: archivoId } });

    if (!archivo) {
      return NextResponse.json({ error: "Archivo no encontrado" }, { status: 404 });
    }

    await prisma.archivo.delete({ where: { id: archivoId } });

    return NextResponse.json({ message: "Registro eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el registro:", error);
    return NextResponse.json({ error: "Error al eliminar el registro" }, { status: 500 });
  }
}
