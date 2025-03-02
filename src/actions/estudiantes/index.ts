// Indica que es un server action
"use server";

import prisma from "@/lib/prisma";


export async function obtenerEstudiantes() {
  try {
    // Obtiene todos los estudiantes de la base de datos.
    const estudiantes = await prisma.estudiante.findMany({
      include: {
        // Obtiene el nombre y el email del estudiante.
        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
        // Obtiene el nombre de la materia asociada.
        materia: {
          select: {
            id: true,
            nombre: true,
          },
        },
        horario: {
            select: {
              id: true,
              dia: true,
              horaInicio: true,
              horaFin: true,
            },
          },
          Notas: {
            select: {
              id: true,
              calificacion: true,
            },
          },
      },
    });
    // console.log({estudiantes});

    // Obtiene la información del profesor para cada estudiante
    const estudiantesConProfesor = await Promise.all(
        estudiantes.map(async (est) => {
          const profesor = await prisma.usuario.findUnique({
            where: { id: est.usuarioId }, // usuarioId es el ID del profesor
            select: {
              id: true,
              nombre: true,
              email: true,
            },
          });
  
          return {
            ...est,
            profesor, // Agrega la info del profesor al objeto del estudiante
          };
        })
      );
    //   console.log({estudiantesConProfesor});

    return { success: true, data: estudiantesConProfesor };
  } catch (error) {
    console.error("Error al obtener estudiantes:", error);
    return { success: false, message: "Error al obtener los estudiantes" };
  }
}