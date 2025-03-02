import { obtenerProfesor } from "@/actions/profesor";

interface Props {
    id: string
}

export const Profesor = async({id}:Props) => {

    const { success, data, message } = await obtenerProfesor({id});
    
      if (!success) return <p>Error: {message}</p>;

  return (
    <div>
        <div>Nombre: {data?.nombre}</div>
        <div>Correo: {data?.email}</div>
        <div>Materias:{" "} {
            data?.ProfesorMateria?.length
            ? data?.ProfesorMateria.map(({materia}) => (
                <div key={materia.id}>{materia.nombre}</div>
            ))
            : "No tiene materia asignada"
        }</div>
        <div>Horarios:{" "} {
            data?.Horarios?.length
            ? data?.Horarios.map((horario) => (
                <div key={horario.id}>Día {horario.dia} de {horario.horaInicio.toLocaleTimeString()} a {horario.horaFin.toLocaleTimeString()}</div>
            ))
            : "No tiene horario asignado"
        }</div>
    </div>
  )
}
