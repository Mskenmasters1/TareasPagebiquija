import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useFetchGet } from "../hooks/useFetchGet";
import { IUsuario } from "../interfaces/usuario.interface";
import { AppContext } from "../context/AppContext";
import { IUsuarioInfoContext } from "../interfaces/context.interface";

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
	const { usuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
console.log(usuarioInfo)
	useEffect(() => {
		if (status === 200) {
			setUsuarios(data);
			console.log(data[0]);
		}
	}, [status]);

	const selectedUsuario = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelected(e);
		console.log(e);
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
						value={usuarioInfo._id}
					>
						{usuarios.map((x) => (
							x.nombre === usuarioInfo.nombre ? (
									<option key={x._id} value={x._id}>
										A mí
									</option>
						)
						: (
								<option key={x._id} value={x._id}>{x.nombre}</option>
						)
						))}
					</select>
				</>
			)}
		</>
	);
};
