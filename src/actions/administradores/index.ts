"use server";

import prisma from "@/lib/prisma";

export async function obtenerAdministradores() {
    try {
        // Obtiene todos los administradores de la base de datos.
        const administradores = await prisma.usuario.findMany({
          where: {
            rol: "admin",
          },
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        });
    
        console.log({administradores});
        return { success: true, data: administradores };
      } catch (error) {
        console.error("Error al obtener administradores:", error);
        return { success: false, message: "Error al obtener los administradores" };
      }
}