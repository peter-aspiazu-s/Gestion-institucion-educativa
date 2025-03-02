import prisma from '../lib/prisma';
import { initialData } from './seed';

async function main() {
    // Borrar registros previos
    await prisma.$transaction([
        prisma.historial_Nota.deleteMany(),
        prisma.nota.deleteMany(),
        prisma.estudiante_Materia.deleteMany(),
        prisma.horario.deleteMany(),
        prisma.profesor_Materia.deleteMany(),
        prisma.materia.deleteMany(),
        prisma.usuario.deleteMany(),
    ]);

    // Insertar usuarios
    const usuariosData = initialData.usuarios.map(({ nombre, email, password, rol }) => ({
        nombre,
        email,
        password,
        rol,
    }));
    
    await prisma.usuario.createMany({
        data: usuariosData,
    });

    // console.log({usuariosData});

    // Insertar materias
    const materiasData = initialData.materias.map(({ nombre }) => ({
        nombre,
    }));

    await prisma.materia.createMany({
        data: materiasData,
    });

    // console.log({materiasData});

    // Obtener Usuarios con Rol profesor y estudiante.
    // Obtener profesores
    const profesores = await prisma.usuario.findMany({
        where: { rol: "profesor" }, // Filtramos solo los profesores
        select: { id: true, email: true, nombre: true },
    });

    // Obtener estudiantes
    const estudiantes = await prisma.usuario.findMany({
        where: { rol: "estudiante" }, // Filtramos solo los estudiantes
        select: { id: true, email: true, nombre: true },
    });

    // console.log({profesores});
    // console.log({estudiantes});

    // Obtener materias
    const materias = await prisma.materia.findMany({
        select: { id: true, nombre: true },
    });
    
    // console.log({materias});
    

    // Insertar horarios
    const horariosData = initialData.horarios.map(({ dia, horaInicio, horaFin }, index) => {
        const profesor = profesores[index % profesores.length]; // Se asigna un profesor de forma cíclica
        const estudiante = estudiantes[index % estudiantes.length]; // Se asigna un estudiante de forma cíclica
        const materia = materias[index % materias.length]; // Se asigna una materia de forma cíclica
    
        return [
            {
                usuarioId: profesor.id, // Horario para profesor
                materiaId: materia.id,
                dia,
                horaInicio,
                horaFin,
            },
            {
                usuarioId: estudiante.id, // Horario para estudiante
                materiaId: materia.id,
                dia,
                horaInicio,
                horaFin,
            }
        ];
    }).flat(); // Aplanamos el array para que quede en una sola lista

    await prisma.horario.createMany({
        data: horariosData,
    });
    
    // console.log({ horariosData });

    // Insertar las materias a los profesores
    const profesorMateriasData = materias.map((materia, index) => ({
        usuarioId: profesores[index % profesores.length].id, // Asigna un profesor de forma cíclica
        materiaId: materia.id, // Relacionar con el ID de la materia obtenida
    }));
    
    await prisma.profesor_Materia.createMany({
        data: profesorMateriasData,
    });
    
    // console.log({ profesorMateriasData });

    // Insertar las materias a los profesores
    const estudianteMateriasData = materias.map((materia, index) => ({
        usuarioId: estudiantes[index % estudiantes.length].id, // Asigna un profesor de forma cíclica
        materiaId: materia.id, // Relacionar con el ID de la materia obtenida
    }));
    
    await prisma.estudiante_Materia.createMany({
        data: estudianteMateriasData,
    });

    // console.log({ estudianteMateriasData });

    // Obtener relaciones estudiante-materia
    const estudianteMateria = await prisma.estudiante_Materia.findMany({
        select: { id: true, usuarioId: true, materiaId: true },
    });

    // Insertar notas a estudiantes
    const notasData = initialData.notas.map(({ calificacion }, index) => ({
        estudianteMateriaId: estudianteMateria[index % estudianteMateria.length].id,
        calificacion,
    }));

    await prisma.nota.createMany({
        data: notasData,
    });

    // console.log({notasData});


    // Obtener notas
    const notas = await prisma.nota.findMany({
        select: { id: true, estudianteMateriaId: true, calificacion: true }
    });

    console.log({ notas });

    // Insertar el historial de notas
    const historialNotasData = initialData.notas.flatMap((nota, index) => {
        return nota.historialNotas?.map(({ calificacionAnterior, fechaModificacion }) => ({
            notaId: notas[index % notas.length].id, // Asignación cíclica
            calificacionAnterior,
            fechaModificacion,
        })) || [];
    });

    await prisma.historial_Nota.createMany({
        data: historialNotasData,
    });

    console.log({historialNotasData});

    console.log('Seed ejecutado correctamente');
}

(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();
