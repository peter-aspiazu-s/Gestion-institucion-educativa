"use server";

import prisma from "@/lib/prisma";

export async function obtenerMaterias() {
  try {
    // Obtiene todas las materias junto con los profesores asignados y los horarios.
    const materias = await prisma.materia.findMany({
      select: {
        id: true,
        nombre: true,
        ProfesorMateria: {
          select: {
            usuario: {
              select: {
                id: true,
                nombre: true,
                email: true,
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

    console.log(materias);
    return { success: true, data: materias };
  } catch (error) {
    console.error("Error al obtener materias:", error);
    return { success: false, message: "Error al obtener las materias" };
  }
}
