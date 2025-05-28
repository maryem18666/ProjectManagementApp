import React, { useEffect, useState } from "react";
import API from "../services/api";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProject, setEditingProject] = useState(null); // Projet en cours d'édition

  // Récupération des projets depuis l'API
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await API.get("/projects");
        console.log("Données retournées :", response.data);
        setProjects(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des projets.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Fonction pour éditer un projet
  const handleEditProject = (project) => {
    setEditingProject(project);
  };

  // Fonction pour supprimer un projet
  const handleDeleteProject = async (projectId) => {
    try {
      await API.delete(`/projects/${projectId}`);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId)
      );
    } catch (err) {
      console.error("Erreur lors de la suppression du projet :", err);
    }
  };


  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Liste des Projets</h3>

      {/* Modal d'édition de projet */}
      {editingProject && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier le projet</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingProject(null)}
                ></button>
              </div>
              <div className="modal-body">
              <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await API.put(`/taskstotal/${editingProject._id}`, editingProject);
                setProjects((prevTasks) =>
                  prevTasks.map((task) =>
                    task._id === editingProject._id ? editingProject : task
                  )
                );
                setEditingProject(null);
              } catch (err) {
                console.error("Erreur lors de la mise à jour :", err);
              }
            }}
          >
                  <div className="mb-3">
                    <label className="form-label">Titre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingProject.title}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      value={editingProject.description}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date limite</label>
                    <input
                      type="date"
                      className="form-control"
                      value={new Date(editingProject.deadline).toISOString().substring(0, 10)}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          deadline: new Date(e.target.value),
                        })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Sauvegarder
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div>Chargement des projets...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="row">
          {projects.map((project) => (
            <div className="col-lg-4 col-md-6 mb-4" key={project._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h4 className="card-title">{project.title}</h4>
                  <p className="card-text">{project.description}</p>
                  <p className="card-text">
                    <strong>Date limite :</strong> {new Date(project.deadline).toLocaleDateString()}
                  </p>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleEditProject(project)}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteProject(project._id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
