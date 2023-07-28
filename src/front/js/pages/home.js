import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Register } from "../component/register";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
		
			<h1>Bienvenido a la página de inicio</h1>
			

		
			<Register />
		</div>
	);
};