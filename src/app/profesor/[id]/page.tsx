import { Profesor } from "@/components/Profesor";


interface Props {
    params: {
      id: string;
    };
  }

export default function Profesores({params}: Props) {
    return(
        <>
            <p>Profesor</p>
            <br />
            <Profesor id={params.id} />
        </>
    )
}