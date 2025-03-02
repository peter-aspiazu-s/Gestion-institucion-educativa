"use server";

import prisma from "@/lib/prisma";

export async function obtenerProfesores() {
    try {
        // Obtiene todos los profesores de la base de datos.
        const profesores = await prisma.usuario.findMany({
          where: { rol: "profesor" },
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
                    Horarios: {
                      select: {
                          id: true,
                          dia: true,
                          horaInicio: true,
                          horaFin: true,
                      },
                    },
                    Estudiantes: {
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
                  },
                },
              },
            },
          },
        });


        // Formatear la data según la estructura requerida
        const resultado = profesores.map(profesor => ({
          id: profesor.id,
          nombre: profesor.nombre,
          correo: profesor.email,
          materias: profesor.ProfesorMateria.map(({ materia }) => ({
              id: materia.id,
              materia: materia.nombre,
              horario: materia.Horarios.map(horario => ({
                  id: horario.id,
                  dia: horario.dia,
                  horaInicio: horario.horaInicio,
                  horaFin: horario.horaFin,
              })),
              estudiantes: materia.Estudiantes.map(est => ({
                id: est.usuario.id,
                nombre: est.usuario.nombre,
                correo: est.usuario.email,
            })),
          })),
      }));
    
        // console.log({profesores});
        console.log({resultado});
        return { success: true, data: resultado };
      } catch (error) {
        console.error("Error al obtener profesores:", error);
        return { success: false, message: "Error al obtener los profesores" };
      }
}