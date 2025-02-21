import prisma from '../lib/prisma';
import { initialData } from './seed';

async function main() {
    // Borrar registros previos
    await prisma.$transaction([
        prisma.historial_Nota.deleteMany(),
        prisma.nota.deleteMany(),
        prisma.estudiante.deleteMany(),
        prisma.horario.deleteMany(),
        prisma.profesor_Materia.deleteMany(),
        prisma.materia.deleteMany(),
        prisma.usuario.deleteMany(),
    ]);

    // Insertar usuarios
    await prisma.usuario.createMany({
        data: initialData.usuarios.map(({ nombre, email, password, rol }) => ({
            nombre,
            email,
            password,
            rol
        }))
    });

    // Insertar materias
    await prisma.materia.createMany({
        data: initialData.materias.map(({ nombre }) => ({
            nombre,
        })),
    });

    // Obtener usuarios y materias creados
    const usuarios = await prisma.usuario.findMany();
    const materias = await prisma.materia.findMany();

    // console.log("Usuarios:", usuarios);
    // console.log("Materias:", materias);

    // Obtener usuarios con rol profesor
    const profesores = usuarios.filter(u => u.rol === "profesor");

    // Obtener ids de usuarios y materias
    const usuarioMap = Object.fromEntries(profesores.map(u => [u.email, u.id]));
    const materiaMap = Object.fromEntries(materias.map(m => [m.nombre, m.id]));
    // console.log({usuarioMap});
    // console.log({materiaMap});

    // Asignar una materia a cada profesor (cíclicamente)
    const profesorMateriaData = profesores.map((profesor, index) => ({
        usuarioId: profesor.id,
        materiaId: materias[index % materias.length].id, // Asigna materias en ciclo
    }));

    // Insertar las relaciones en la tabla Profesor_Materia
    await prisma.profesor_Materia.createMany({
        data: profesorMateriaData,
    });

    // console.log("Materias asignadas a profesores:", profesorMateriaData);

    // Obtener las relaciones Profesor_Materia insertadas
    const profesorMateria = await prisma.profesor_Materia.findMany();
    // console.log(profesorMateria);

    // Insertar horarios utilizando los ids correctos de Profesor_Materia
    const horarioData = initialData.horarios.map(({ dia, horaInicio, horaFin }, index) => {
        // Obtener un profesor-materia de los asignados (en ciclo)
        const profesorMateriaEntry = profesorMateria[index % profesorMateria.length];
        // console.log(profesorMateriaEntry);
        return {
            usuarioId: profesorMateriaEntry.usuarioId,
            materiaId: profesorMateriaEntry.materiaId,
            dia,
            horaInicio,
            horaFin,
        };
    });

    // Insertando horarios en db
    await prisma.horario.createMany({
        data: horarioData,
    });

    // console.log('Horarios insertados:', horarioData);


    // Obtener horarios insertados
    const horarios = await prisma.horario.findMany();
    //   console.log(horarios);


    // Asignar los datos de los horarios a los estudiantes
    const estudianteData = initialData.estudiantes.map((estudiante, index) => {
        const horario = horarios[index]; // Asigna el horario en orden

        return {
            nombre: estudiante.nombre,
            email: estudiante.email,
            usuarioId: horario.usuarioId, // Profesor asignado
            materiaId: horario.materiaId, // Materia asignada
            horarioId: horario.id, // Horario correspondiente
        };
    });
    // console.log(estudianteData);

    // Insertar estudiantes
    await prisma.estudiante.createMany({
        data: estudianteData,
    });

    // console.log('Estudiantes insertados:', estudianteData);

    // Obtener estudiantes creados
    const estudiantes = await prisma.estudiante.findMany();
    //   console.log(estudiantes);

    // Mapear IDs correctos de estudiantes y materias
    const estudianteMap = Object.fromEntries(estudiantes.map(e => [e.email, { id: e.id, materiaId: e.materiaId }]));
    // console.log(estudianteMap);

    // Insertar notas
    const notasData = initialData.notas.map(({ estudianteId, materiaId, calificacion }, index) => ({
        estudianteId: estudiantes[index].id,
        materiaId: estudiantes[index].materiaId,
        calificacion,
    }));
    // console.log(notasData);

    await prisma.nota.createMany({
        data: notasData,
    });

    // Obtener notas creadas
    const notas = await prisma.nota.findMany();
    // console.log(notas);

    // Insertar historial de notas
    const historialNotasData = initialData.notas.flatMap((nota, index) =>
        nota.historialNotas.map(({ calificacionAnterior, fechaModificacion }) => ({
            notaId: notas[index].id, // Obtener el id real de la nota
            calificacionAnterior,
            fechaModificacion,
        }))
    );
    // console.log(historialNotasData);
    
    await prisma.historial_Nota.createMany({
        data: historialNotasData,
    });


    console.log('Seed ejecutado correctamente');
}

(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();
