"use server";

import prisma from "@/lib/prisma";

interface Data{
    id?: string,
    nombre?: string,
    email?: string,
}

export async function obtenerProfesor({id, nombre, email}: Data) {
  try {
    // Buscar un profesor con los criterios especificados
    const profesor = await prisma.usuario.findFirst({
      where: {
        rol: "profesor", // Asegura que solo se obtengan profesores
        // Si id tiene un valor, se agrega { id } al objeto where.
        // Si id es undefined o null, no se agrega nada.
        ...(id && { id: Number(id) }),
        // lo mismo que con id
        ...(nombre && { nombre }),
        ...(email && { email }),
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        ProfesorMateria: {
          select: {
            materia: {
              select: {
                id: true,
                nombre: true,
              },
            },
          },
        },
        Horarios: {
          select: {
            id: true,
            dia: true,
            horaInicio: true,
            horaFin: true,
          },
        },
      },
    });

    if (!profesor) {
      return { success: false, message: "No se encontró el profesor" };
    }

    return { success: true, data: profesor };
  } catch (error) {
    console.error("Error al obtener profesor:", error);
    return { success: false, message: "Error al obtener el profesor" };
  }
}