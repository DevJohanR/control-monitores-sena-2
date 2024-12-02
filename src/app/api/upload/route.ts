import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "cloudinary";

const prisma = new PrismaClient();

// Configuración directa de Cloudinary con las credenciales proporcionadas
cloudinary.v2.config({
  cloud_name: "dpdwap5il", // Tu Cloud Name
  api_key: "137812973758369", // Tu API Key
  api_secret: "BfYkKWvvX8nKZhyUrFAedN8XCo4", // Tu API Secret
});

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

    // Convertir el archivo en un buffer para subirlo a Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());

    // Subir el archivo a Cloudinary usando `upload`
    const uploadResult = await cloudinary.v2.uploader.upload(
      `data:${file.type};base64,${buffer.toString("base64")}`,
      {
        resource_type: "raw", // Para archivos PDF u otros no estándar
        folder: "uploads",
        public_id: `${Date.now()}-${file.name}`.replace(/\s+/g, "_"),
      }
    );

    // Verificar que se obtuvo la URL segura
    if (!uploadResult.secure_url) {
      throw new Error("Error al subir archivo a Cloudinary");
    }

    // Guardar la información del archivo en la base de datos
    const newArchivo = await prisma.archivo.create({
      data: {
        nombre: file.name,
        ruta: uploadResult.secure_url,
        programaPerteneciente: programaPerteneciente.toUpperCase().trim(),
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
