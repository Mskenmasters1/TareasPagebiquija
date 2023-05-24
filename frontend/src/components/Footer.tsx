export const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		< >
			<footer>
				<div className="container">
					<div className="row">
						<div className="col">
							<p>&copy; {currentYear} Gestor de Tareas. Proyecto realizado por Bilal, Pablo, Quico, Javi, Georgiana.</p>
							<p>Accede al <a href="https://github.com/Mskenmasters1/TareasPagebiquija" target="_blank">
								repositorio del gestor de tareas
							</a></p>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}