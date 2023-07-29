import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/register.css";

export const Register = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleRegister = async () => {
    const userData = {
      email: email,
      password: password,
      name: name,
      last_name: last_name,
    };

    try {
      await actions.registerUser(userData);
      setShowSuccessMessage(true); 
    } catch (error) {
      console.error("Error al registrar el usuario", error);
    }
  };

  return (
    <div className="Container">
      <div className="row">
        <div className="form-container">
          <h2>Registro</h2>
          <form>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="last_name">Apellido</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="button" onClick={handleRegister}>
              Registrar
            </button>

            {showSuccessMessage && (
              <div className="success-message">
                ¡Usuario registrado exitosamente!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};