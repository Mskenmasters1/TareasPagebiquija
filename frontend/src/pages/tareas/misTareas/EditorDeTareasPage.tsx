import { useEffect } from "react"
import { aplicacion } from "../../MainApp"
import { Header } from "../../../components/Header";
import { TareasForm } from "./TareasForm";

export const EditorDeTareasPage = () => {
	useEffect(() => {
		document.title = 'Editor de tareas - ' + aplicacion;
	});
	return (
		<>
		<Header />
		<h1>Editor de tareas</h1>
		<TareasForm />
		</>
	)
}