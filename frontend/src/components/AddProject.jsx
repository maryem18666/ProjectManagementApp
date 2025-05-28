import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddProject({ onAdd }) {
  const [form, setForm] = useState({ 
    title: "", 
    description: "", 
    deadline: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.title || !form.description || !form.deadline) {
      alert("Tous les champs du projet sont requis !");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await API.post("/projects/add", form); // Envoi des données
      
      if (response.status === 201) { // Vérification du statut
        alert("Projet ajouté avec succès !");
        if (onAdd) onAdd();
        navigate("/projects");
      } else {
        throw new Error(response.data.message || "Erreur inconnue");
      }
    } catch (error) {
      console.error("Erreur détaillée:", error.response?.data || error.message);
      alert(`Erreur: ${error.response?.data?.message || "Échec de l'ajout"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Ajouter un projet</h3>

      <form onSubmit={handleSubmit} className="w-75 mx-auto">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Titre du projet</label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            name="description"
            id="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            rows="4"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="deadline" className="form-label">Date limite</label>
          <input
            type="date"
            name="deadline"
            id="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="form-control"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="d-grid gap-2">
          <button 
            type="submit" 
            className="btn btn-success"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." : "Ajouter le projet"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;