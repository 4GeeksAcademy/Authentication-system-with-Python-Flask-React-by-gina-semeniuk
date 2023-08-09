import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Context } from "../store/appContext";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  useEffect(() => {
    actions.isAuthenticated();
    fetchUserName();
  }, []); 

  const fetchUserName = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/private/name`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const data = await response.json();
        setUserName(data.name);
      }
    } catch (error) {
      console.error("Error fetching user name", error);
    }
  };

  const signOut = () => {
    actions.signOut();
    navigate("/");
  };

  if (store.auth) {
    return (
      <div className="container">
        <h1>Welcome, {userName}</h1>
        <button type="button" className="btn btn-dark" onClick={signOut}>
          Sign Out
        </button>
      </div>
    );
  } else {
    return (
      <div className="container py-3">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <div>
            Error: You are not authenticated.... Please login...
          </div>
        </div>
      </div>
    );
  }
};