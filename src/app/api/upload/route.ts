import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const prisma = new PrismaClient();
const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_PUBLIC_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME!;

// POST - Subir un archivo
export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get("file") as File;
    const programaPerteneciente = data.get("programaPerteneciente") as string;

    if (!file || !programaPerteneciente) {
      return NextResponse.json({ error: "Archivo o programa no proporcionados" }, { status: 400 });
    }

    // Verificar si ya existe un archivo para este programa
    const existingArchivo = await prisma.archivo.findFirst({
      where: { programaPerteneciente },
    });

    if (existingArchivo) {
      return NextResponse.json(
        { error: "Ya existe un archivo para este programa. Por favor, elimínalo primero." },
        { status: 409 }
      );
    }

    // Crear un nombre único para el archivo
    const fileName = `${Date.now()}-${file.name}`.toUpperCase().replace(/\s+/g, "_");

    // Subir el archivo a S3
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    // Generar la URL del archivo
    const fileUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${fileName}`;

    // Guardar el archivo en la base de datos
    const newArchivo = await prisma.archivo.create({
      data: {
        nombre: fileName,
        ruta: fileUrl,
        programaPerteneciente,
      },
    });

    return NextResponse.json({ message: "Archivo subido con éxito", archivo: newArchivo });
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    return NextResponse.json({ error: "Error al subir el archivo" }, { status: 500 });
  }
}
