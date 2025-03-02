import { obtenerHorarios } from "@/actions/horarios";

export async function ListaHorarios() {
  const { success, data, message } = await obtenerHorarios();

  if (!success) return <p>Error: {message}</p>;

  return (
    <ul>
      {data!.map((horario) => (
        <li key={horario.id}>
          <div>Profesor: {horario.usuario.nombre}</div>
          <div>Correo del profesor: {horario.usuario.email}</div>
          <div> Materia: {horario.materia.nombre}</div>
          <div>
            Horario: Día {horario.dia} de {horario.horaInicio.toLocaleTimeString()} a {horario.horaFin.toLocaleTimeString()}
          </div>
          <br />
        </li>
      ))}
    </ul>
  );
}