import { ChangeEvent, useEffect, useState } from "react";
import { useFetchGet } from "../hooks/useFetchGet";
import { IUsuario } from "../interfaces/usuario.interface";

interface IComboUsuariosProps {
	setSelected: ({ target }: React.ChangeEvent<HTMLSelectElement>) => void;
	activa?: string;
}

export const ComboUsuarios = ({ setSelected, activa }: IComboUsuariosProps) => {
	const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
	const { data, status } = useFetchGet<IUsuario[]>(
		"http://localhost:3000/api/usuarios",
		true
	);

	useEffect(() => {
		if (status === 200) {
			setUsuarios(data);
			console.log(data[0]);
		}
	}, [status]);
	const selectedUsuario = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelected(e);
	};

	return (
		<>
			{usuarios && status === 200 && (
				<>
					<label htmlFor="usuario">Asignar a:</label>
					<select
						className="form-select"
						required
						id="usuario"
						onChange={selectedUsuario}
						value={activa}
					>
						{usuarios.map((x) => (
							<option key={x._id} value={x._id}>
								{x.nombre}
							</option>
						))}
					</select>
				</>
			)}
		</>
	);
};
