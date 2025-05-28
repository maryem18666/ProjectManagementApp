import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  console.log("🚀 ~ Register ~ form:", form)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      navigate("/login");
    } catch (error) {
      
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Image à gauche */}
      <div
        className="col-lg-6 col-md-6 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: "url('cardsignup.svg')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%',
        }}
      >
      </div>
    {/* Formulaire à droite */}
    <div className="col-lg-6 col-md-6 d-flex justify-content-center align-items-center bg-light">
        <div className="w-75">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Rôle</label>
          <select
            className="form-select"
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="employee">Employee</option>
            <option value="admin">Administrateur</option>
            
          </select>
        </div>
        <button type="submit" className="btn btn-primary">S'inscrire</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Register;
