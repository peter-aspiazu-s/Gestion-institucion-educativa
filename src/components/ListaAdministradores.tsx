import { obtenerAdministradores } from "@/actions/administradores";

export async function ListaAdministradores() {
  const { success, data, message } = await obtenerAdministradores();

  if (!success) return <p>Error: {message}</p>;

  return (
    <ul>
      {data!.map((admin) => (
        <li key={admin.id}>
          <div>Administrador: {admin.nombre}</div>
          <div>Correo del admin: {admin.email}</div>
          <br />
        </li>
      ))}
    </ul>
  );
}