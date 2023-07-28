import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";



export const Register = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [last_name, setLastName] = useState("");

	const handleRegister = () => {

		const userData = {
			email: email,
			password: password,
			name: name,
			last_name: last_name,
		};

	
		actions.registerUser(userData);
	};

	return (
		<div className="text-center mt-5">
			<img src={rigoImageUrl} alt="Rigo Baby" />

			{/* Formulario de registro */}
			<form>
				<div className="form-group">
					<input
						type="email"
						className="form-control"
						placeholder="Correo electrónico"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						className="form-control"
						placeholder="Contraseña"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						className="form-control"
						placeholder="Nombre"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						className="form-control"
						placeholder="Apellido"
						value={last_name}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<button type="button" className="btn btn-primary" onClick={handleRegister}>
					Registrarse
				</button>
			</form>
		</div>
	);
};