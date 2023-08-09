import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"; 


  export const Login = () => {
    const { actions, store } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    const navigate = useNavigate();

    useEffect(() => {
      if (store.auth) navigate("/private");
    }, [store.auth]);
  
    const handleLogin = async (event) => {
      event.preventDefault();
  
      const email = event.target.email.value;
      const password = event.target.password.value;
  
      const success = await actions.login(email, password);
      if (!success) {
        setErrorMessage("Password or email incorrect");
      }
    };

    return (
      <div className="Container">
        <div className="row">
          <div className="form-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
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
  
              <button type="submit">Inicia sesión</button>
  
              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}
  
              {showSuccessMessage && (
                <div className="success-message">
                  Inicio de sesión exitoso!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  };