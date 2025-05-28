import React from "react";

import { useNavigate } from "react-router-dom";
import "./navbar.css"

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimez le token ou toute donnée utilisateur stockée
    localStorage.removeItem("123456"); // Remplacez "token" par votre clé de stockage
    // Redirigez l'utilisateur vers la page de connexion
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <a className="navbar-brand" href="/">
          MonApplication
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">


            <li className="nav-item">
              <button className="btn logout-btn" onClick={handleLogout}>
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

};

export default Navbar;


  
