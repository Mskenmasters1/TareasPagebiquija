import { useEffect } from "react"
import { aplicacion } from "../../MainApp"
import { TareasForm } from "./TareasForm";

export const EditorDeTareasPage = () => {
	useEffect(() => {
		document.title = 'Editor de tareas - ' + aplicacion;
	});
	return (
		<>
		<h1>Editor de tareas</h1>
		<TareasForm />
		</>
	)
}