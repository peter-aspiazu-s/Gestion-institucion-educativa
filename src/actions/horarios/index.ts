"use server";

import prisma from "@/lib/prisma";

export async function obtenerHorarios() {
  try {
    // Obtiene todos los horarios junto con la información de la materia y el profesor asignado.
    const horarios = await prisma.horario.findMany({
      select: {
        id: true,
        dia: true,
        horaInicio: true,
        horaFin: true,
        materia: {
          select: {
            id: true,
            nombre: true,
          },
        },
        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
      },
    });

    console.log(horarios);
    return { success: true, data: horarios };
  } catch (error) {
    console.error("Error al obtener horarios:", error);
    return { success: false, message: "Error al obtener los horarios" };
  }
}
