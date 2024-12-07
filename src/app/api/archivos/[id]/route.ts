import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const prisma = new PrismaClient();
const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_PUBLIC_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME!;

// DELETE - Eliminar un archivo
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const archivoId = parseInt(params.id, 10);

  try {
    // Buscar el archivo en la base de datos
    const archivo = await prisma.archivo.findUnique({
      where: { id: archivoId },
    });

    if (!archivo) {
      return NextResponse.json({ error: "Archivo no encontrado" }, { status: 404 });
    }

    // Obtener la clave del archivo desde la URL
    const fileKey = archivo.ruta.split("/").pop();
    if (!fileKey) {
      return NextResponse.json({ error: "Clave del archivo no encontrada" }, { status: 500 });
    }

    // Eliminar el archivo de S3
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: fileKey }));

    // Eliminar el registro de la base de datos
    await prisma.archivo.delete({ where: { id: archivoId } });

    return NextResponse.json({ message: "Archivo eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el archivo:", error);
    return NextResponse.json({ error: "Error al eliminar el archivo" }, { status: 500 });
  }
}
