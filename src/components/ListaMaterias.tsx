import { obtenerMaterias } from "@/actions/materias";

export async function ListaMaterias() {
  const { success, data, message } = await obtenerMaterias();

  if (!success) return <p>Error: {message}</p>;

  return (
    <ul>
      {data!.map((materia) => (
        <li key={materia.id}>
          <div>Materia: {materia.nombre}</div>
          <div>Horario: 
            {
                materia.Horarios.length > 0 
                ? materia.Horarios.map(horario => (
                    <div>Día {horario.dia} de {horario.horaInicio.toLocaleTimeString()} a {horario.horaFin.toLocaleTimeString()}</div>
                ))
                : "No tiene horario asignado"
            }
            </div>
            <div>Profesor:
                {
                    materia.ProfesorMateria.length > 0
                    ?   materia.ProfesorMateria.map(profesor => (
                        <div key={profesor.usuario.id}>
                            <div>nombre: {profesor.usuario.nombre}</div>
                            <div>email: {profesor.usuario.email}</div>
                        </div>
                    ))
                    : "No tiene profesor asignado"
                }
            </div>
          <br />
        </li>
      ))}
    </ul>
  );
}