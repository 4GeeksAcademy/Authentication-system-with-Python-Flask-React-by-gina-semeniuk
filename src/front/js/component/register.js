import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/register.css";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const userData = {
      email: email,
      password: password,
      name: name,
      last_name: last_name,
    };
  
    const response = await fetch(process.env.BACKEND_URL + "/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
  
    if (response.status === 200 && data.message === "User registered successfully") {
      setShowSuccessMessage(true);
      setAlertMessage("User registered successfully!");
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/login");
      }, 3000);
    } else {
      setAlertMessage(data.message);
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

            {alertMessage && (
              <div className="error-message">
                {alertMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};