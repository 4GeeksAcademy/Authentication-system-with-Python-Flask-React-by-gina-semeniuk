import React, { useContext} from "react";
import { Context} from "../store/appContext";
import "../../styles/home.css";
import { Register } from "../component/register";
import { Login } from "../pages/login";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
  
	const handleRegisterClick = () => {
	  navigate("/register");

	}
	const handleLoginClick = () => {
			navigate("/login");
	  };
  
	  return (
		<div className="container">
		  <img src="https://img.freepik.com/fotos-premium/mensaje-bienvenida-sobre-fondo-color_27550-1065.jpg?w=2000" alt="Welcome Message" />
		  <div className="button-container">
			<button className="register" onClick={handleRegisterClick}>
			  Registrate!
			</button>
			<button className="login" onClick={handleLoginClick}>
			  Inicia sesión!
			</button>
		  </div>
		</div>
	  );
	};