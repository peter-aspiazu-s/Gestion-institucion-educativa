interface SeedUsuarios {
    id?: number;
    nombre: string;
    email: string;
    password: string;
    rol: validRol;
    profesorMateria: SeedProfesorMaterias[];
    horario: SeedHorarios[];
    estudiantes: SeedEstudiantes[];
}

interface SeedEstudiantes {
    nombre: string;
    email: string;
    materiaId: number;
    usuarioId: number;
    horarioId?: number;
    notas: SeedNotas[];
}

interface SeedMaterias {
    nombre: string;
    profesorMateria: SeedProfesorMaterias[];
    horarios: SeedHorarios[];
    notas: SeedNotas[];
}

interface SeedProfesorMaterias {
    usuarioId: number;
    materiaId: number;
}

interface SeedHorarios {
    usuarioId: number;
    materiaId: number;
    dia: validDia;
    horaInicio: Date;
    horaFin: Date;
    estudiantes: SeedEstudiantes[];
}

interface SeedNotas {
    estudianteId: number;
    materiaId: number;
    calificacion: number;
    historialNotas: SeedHistorialNotas[];
}

interface SeedHistorialNotas {
    notaId: number;
    calificacionAnterior: number;
    fechaModificacion?: Date;
}

type validRol = "profesor" | "admin";
type validDia = "Lunes" | "Martes" | "Miercoles" | "Jueves" | "Viernes" | "Sabado" | "Domingo";

interface SeedData {
    usuarios: SeedUsuarios[];
    estudiantes: SeedEstudiantes[];
    materias: SeedMaterias[];
    horarios: SeedHorarios[];
    notas: SeedNotas[];
}

export const initialData: SeedData = {
    usuarios: [
        {
            nombre: "Peter Aspiazu",
            email: "paspiazu@google.com",
            password: "123456",
            rol: "admin",
            profesorMateria: [],
            horario: [],
            estudiantes: [],
        },
        {
            id: 2,
            nombre: "Miguel Aspiazu",
            email: "maspiazu@google.com",
            password: "123456",
            rol: "profesor",
            profesorMateria: [],
            horario: [],
            estudiantes: [],
        },
        {   
            id: 3,
            nombre: "Luis Aspiazu",
            email: "laspiazu@google.com",
            password: "123456",
            rol: "profesor",
            profesorMateria: [],
            horario: [],
            estudiantes: [],
        },
    ],
    estudiantes: [
        {
            nombre: "Juan Pérez",
            email: "juanperez@school.com",
            materiaId: 1,
            usuarioId: 2,
            horarioId: 1,
            notas: [],
        },
        {
            nombre: "María Gómez",
            email: "mariagomez@school.com",
            materiaId: 2,
            usuarioId: 3,
            horarioId: 2,
            notas: [],
        },
    ],
    materias: [
        {
            nombre: "Matemáticas Avanzadas",
            profesorMateria: [{ usuarioId: 1, materiaId: 1 }],
            horarios: [],
            notas: [],
        },
        {
            nombre: "Física Cuántica",
            profesorMateria: [{ usuarioId: 1, materiaId: 2 }],
            horarios: [],
            notas: [],
        },
    ],
    horarios: [
        {
            usuarioId: 1,
            materiaId: 1,
            dia: "Lunes",
            horaInicio: new Date("2024-02-19T08:00:00"),
            horaFin: new Date("2024-02-19T10:00:00"),
            estudiantes: [],
        },
        {
            usuarioId: 1,
            materiaId: 2,
            dia: "Miercoles",
            horaInicio: new Date("2024-02-21T10:00:00"),
            horaFin: new Date("2024-02-21T12:00:00"),
            estudiantes: [],
        },
    ],
    notas: [
        {
            estudianteId: 1,
            materiaId: 1,
            calificacion: 85.5,
            historialNotas: [
                {
                    notaId: 1,
                    calificacionAnterior: 80.0,
                    fechaModificacion: new Date("2024-02-15T10:00:00"),
                },
            ],
        },
        {
            estudianteId: 2,
            materiaId: 2,
            calificacion: 90.0,
            historialNotas: [
                {
                    notaId: 2,
                    calificacionAnterior: 88.0,
                    fechaModificacion: new Date("2024-02-16T11:00:00"),
                },
            ],
        },
    ],
}