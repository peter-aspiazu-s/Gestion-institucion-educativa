import { obtenerEstudiantes } from "@/actions/estudiantes";

export async function ListaEstudiantes() {
  const { success, data, message } = await obtenerEstudiantes();

  if (!success) return <p>Error: {message}</p>;

  return (
    <ul>
      {data!.map((estudiante) => (
        <li key={estudiante.id}>
            <div>Estudiante: {estudiante.nombre}</div>
            <div>Correo del estudiante: {estudiante.email}</div>
            <div>Materia: {estudiante.materia.nombre}</div>
            <div>Horario: {estudiante.horario?.dia} de{" "} {estudiante.horario?.horaInicio.toLocaleTimeString()} a {estudiante.horario?.horaFin.toLocaleTimeString()}</div>
            <div>Nota: 
                {
                estudiante.Notas.length > 0 ? estudiante.Notas.map(nota => (<div key={nota.id}>{Number(nota.calificacion)}</div>))
                : 0
            }
            </div>
            <div>Profesor: {estudiante.profesor?.nombre}</div>
            <div>Correo del profesor: {estudiante.profesor?.email}</div><br />
        </li>
      ))}
    </ul>
  );
}
