import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="d-flex flex-column justify-content-start vh-100"
      style={{
        position: 'relative',
        backgroundImage: "url('project_management_coursefees.avif')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay sombre */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ombre semi-transparente
        }}
      ></div>

      <div className="text-center text-white position-relative p-4">
        {/* Titre positionné en haut */}
        <h1 className="display-5 fw-bold mb-4 mt-4">Bienvenue dans le Gestionnaire de Projets</h1>
        <p className="lead mb-8">
          Cette application vous permet de gérer vos projets, vos tâches, et de
          collaborer efficacement avec votre équipe.
        </p>
        
        <div className="d-flex justify-content-center mt-4">
          <Link to="/login" className="btn btn-primary me-3 btn-lg">
            Connexion
          </Link>
          <Link to="/register" className="btn btn-secondary btn-lg">
            Inscription
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
