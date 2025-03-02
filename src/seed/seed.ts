interface SeedUsuarios {
    nombre: string;
    email: string;
    password: string;
    rol: Rol;
    profesorMaterias?: SeedProfesorMaterias[];
    estudianteMaterias?: SeedEstudianteMateria[];
}

interface SeedMaterias {
    nombre: string;
    profesorMaterias?: SeedProfesorMaterias[];
    estudianteMaterias?: SeedEstudianteMateria[];
}

interface SeedProfesorMaterias {
    profesorId: number;
    materiaId: number;
}

interface SeedEstudianteMateria {
    estudianteId: number;
    materiaId: number;
}

interface SeedHorario {
    usuarioId: number;
    materiaId: number;  
    dia: Dia;
    horaInicio: Date;
    horaFin: Date;
}

interface SeedNota {
    estudianteMateriaId: number;
    calificacion: number;
    historialNotas?: SeedHistorialNota[];
}

interface SeedHistorialNota {
    notaId: number;
    calificacionAnterior: number;
    fechaModificacion?: Date;
}

enum Rol {
    PROFESOR = "profesor",
    ADMIN = "admin",
    ESTUDIANTE = "estudiante",
}

enum Dia {
    LUNES = "Lunes",
    MARTES = "Martes",
    MIERCOLES = "Miercoles",
    JUEVES = "Jueves",
    VIERNES = "Viernes",
    SABADO = "Sabado",
    DOMINGO = "Domingo",
}

interface SeedData {
    usuarios: SeedUsuarios[];
    materias: SeedMaterias[];
    horarios: SeedHorario[];
    notas: SeedNota[];
}

export const initialData: SeedData = {
    usuarios: [
        { nombre: "Peter Aspiazu", email: "paspiazu@google.com", password: "123456", rol: Rol.ADMIN },
        { nombre: "Miguel Aspiazu", email: "maspiazu@google.com", password: "123456", rol: Rol.ADMIN },
        { nombre: "Luis Aspiazu", email: "laspiazu@google.com", password: "123456", rol: Rol.ADMIN },
        { nombre: "Edith Valencia", email: "evalencia@google.com", password: "123456", rol: Rol.PROFESOR},
        { nombre: "Jose Romero", email: "jromero@google.com", password: "123456", rol: Rol.PROFESOR },
        { nombre: "Milsa Sabando", email: "msabando@google.com", password: "123456", rol: Rol.PROFESOR },
        { nombre: "Felipe Caicedo", email: "fcaicedo@google.com", password: "123456", rol: Rol.PROFESOR },
        { nombre: "Estudiante 1", email: "estudiante1@google.com", password: "123456", rol: Rol.ESTUDIANTE,
            estudianteMaterias: [
                { 
                    estudianteId: 1, // referencia para typscript
                    materiaId: 1, // referencia para typscript
                    
                }
            ],
        },
        { 
            nombre: "Estudiante 2", email: "estudiante2@google.com", password: "123456", rol: Rol.ESTUDIANTE,
            estudianteMaterias: [
                { 
                    estudianteId: 9, // referencia para typscript
                    materiaId: 2, // referencia para typscript
                }
            ]
        },
        { 
            nombre: "Estudiante 3", email: "estudiante3@google.com", password: "123456", rol: Rol.ESTUDIANTE,
            estudianteMaterias: [
                { 
                    estudianteId: 9, // referencia para typscript
                    materiaId: 2, // referencia para typscript
                }
            ]
        },
        { 
            nombre: "Estudiante 4", email: "estudiante4@google.com", password: "123456", rol: Rol.ESTUDIANTE,
            estudianteMaterias: [
                { 
                    estudianteId: 9, // referencia para typscript
                    materiaId: 2, // referencia para typscript
                }
            ]
        },
    ],
    materias: [
        { 
            nombre: "Matemáticas Avanzadas", 
            profesorMaterias: [{ 
                profesorId: 4, // referencia para typscript
                materiaId: 1 // referencia para typscript
            }], 
            estudianteMaterias: [{ 
                estudianteId: 8, // referencia para typscript
                materiaId: 1 // referencia para typscript
            }],
        },
        { 
            nombre: "Física Cuántica", 
            profesorMaterias: [{ 
                profesorId: 5, // referencia para typscript
                materiaId: 2 // referencia para typscript
            }], 
            estudianteMaterias: [{ 
                estudianteId: 9, // referencia para typscript
                materiaId: 2 // referencia para typscript
            }],
        },
        { 
            nombre: "Literatura Griega", 
            profesorMaterias: [{ 
                profesorId: 5, // referencia para typscript
                materiaId: 2 // referencia para typscript
            }], 
            estudianteMaterias: [{ 
                estudianteId: 9, // referencia para typscript
                materiaId: 2 // referencia para typscript
            }],
        },
        { 
            nombre: "Antropología", 
            profesorMaterias: [{ 
                profesorId: 5, // referencia para typscript
                materiaId: 2 // referencia para typscript
            }], 
            estudianteMaterias: [{ 
                estudianteId: 9, // referencia para typscript
                materiaId: 2 // referencia para typscript
            }],
        },
    ],
    horarios: [
        { 
            usuarioId: 1, // referencia para typscript
            materiaId: 1, // referencia para typscript
            dia: Dia.LUNES, horaInicio: new Date("2024-02-19T08:00:00"), horaFin: new Date("2024-02-19T10:00:00") 
        },
        { 
            usuarioId: 1, // referencia para typscript
            materiaId: 1, // referencia para typscript
            dia: Dia.MARTES, horaInicio: new Date("2024-02-19T08:00:00"), horaFin: new Date("2024-02-19T10:00:00") 
        },
        { 
            usuarioId: 1, // referencia para typscript
            materiaId: 1, // referencia para typscript
            dia: Dia.MIERCOLES, horaInicio: new Date("2024-02-19T08:00:00"), horaFin: new Date("2024-02-19T10:00:00") 
        },
        { 
            usuarioId: 1, // referencia para typscript
            materiaId: 1, // referencia para typscript
            dia: Dia.JUEVES, horaInicio: new Date("2024-02-19T08:00:00"), horaFin: new Date("2024-02-19T10:00:00") 
        },
    ],
    notas: [
        { 
            estudianteMateriaId: 1, // referencia para typscript
            calificacion: 85.5,
            historialNotas:[{ 
                notaId: 1, // referencia para typscript
                calificacionAnterior: 80.9, 
                fechaModificacion: new Date("2024-02-15T10:00:00") 
            }],
        },
        { 
            estudianteMateriaId: 1, // referencia para typscript
            calificacion: 87.5,
            historialNotas:[{ 
                notaId: 1, // referencia para typscript
                calificacionAnterior: 81.0, 
                fechaModificacion: new Date("2024-02-15T10:00:00") 
            }],
        },
        { 
            estudianteMateriaId: 1, // referencia para typscript
            calificacion: 75.5,
            historialNotas:[{ 
                notaId: 1, // referencia para typscript
                calificacionAnterior: 80.5, 
                fechaModificacion: new Date("2024-02-15T10:00:00") 
            }],
        },
        { 
            estudianteMateriaId: 1, // referencia para typscript
            calificacion: 95.5,
            historialNotas:[{ 
                notaId: 1, // referencia para typscript
                calificacionAnterior: 88.7, 
                fechaModificacion: new Date("2024-02-15T10:00:00") 
            }],
        },
    ],
};