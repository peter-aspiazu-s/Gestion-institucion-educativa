import { obtenerProfesores } from "@/actions/profesores";

export async function ListaProfesores() {
  const { success, data, message } = await obtenerProfesores();

  if (!success) return <p>Error: {message}</p>;

  return (
    <ul>
      {data!.map((profesor) => (
        <li key={profesor.id}>
          <div>Profesor: {profesor.nombre}</div>
          <div>Correo del profesor: {profesor.correo}</div>
          <div>
            Materias:{" "}
            {profesor.materias.length > 0
              ? profesor.materias.map((profesorMateria) => (
                <div key={profesorMateria.id}>
                  <div>Nombre de la materia: {profesorMateria.materia}</div>
                  <div>Horarios:{" "}
                  {profesorMateria.horario.length > 0
                    ? profesorMateria.horario.map((horario) => (
                  <div key={horario.id}>Día {horario.dia} de {horario.horaInicio.toLocaleTimeString()} a {horario.horaFin.toLocaleTimeString()}</div>
                    ))
                    : "No asignados"}
                  </div>
                  <div>Estudiantes:{" "}
                    {profesorMateria.estudiantes.length > 0
                      ? profesorMateria.estudiantes.map((estudiante) => (
                      <div key={estudiante.id}>
                        <div>{estudiante.nombre}</div>
                        <div>{estudiante.correo}</div>
                        <div></div>
                      </div>
                      ))
                      : "No asignados"}
                  </div>
                </div>
              ))
              : "No asignadas"}
          </div>
          <br />
        </li>
      ))}
    </ul>
  );
}