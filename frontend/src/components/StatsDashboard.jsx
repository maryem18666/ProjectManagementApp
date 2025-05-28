import React, { useEffect, useState } from "react";
import { FaProjectDiagram, FaShoppingCart, FaTasks, FaUsers } from "react-icons/fa";
import API from "../services/api";
import "./statsDashboard.css";

const StatsDashboard = ({ userRole }) => { // Ajoutez userRole en tant que prop ou récupérez-le via un contexte ou un hook
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
    totalClients: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError("");
      try {
        let totalProjects = 0,
          totalTasks = 0,
          completedTasks = 0,
          overdueTasks = 0,
          totalClients = 0;

        // Récupération des projets et tâches associées
        const projectsResponse = await API.get("/projects");
        if (projectsResponse?.data) {
          totalProjects = projectsResponse.data.length;
        }
        const tasksResponse = await API.get("/taskstotal");
        if (tasksResponse?.data) {
          const tasks = tasksResponse.data;
          totalTasks = tasks.length;
          completedTasks = tasks.filter((task) => task.status === "completed").length;
          // Tâches en retard (deadline < date actuelle, et non terminées)
          overdueTasks = tasks.filter((task) => {
            const deadline = new Date(task.deadline);
            return (
              task.status !== "completed" &&
              task.deadline && // Vérifie que la deadline est définie
              !isNaN(deadline) && // Vérifie que la deadline est une date valide
              deadline < new Date() // Compare la deadline à la date actuelle
            );
          }).length;
        }

        // Récupération des clients
        if (userRole === "admin") {  // Vérification du rôle avant de récupérer les clients
          const clientsResponse = await API.get("/clients");
          if (clientsResponse?.data) {
            totalClients = clientsResponse.data.length;
          }
        }

        setStats({
          totalProjects,
          totalTasks,
          completedTasks,
          overdueTasks,
          totalClients,
        });
      } catch (err) {
        setError("Une erreur est survenue lors du chargement des statistiques.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userRole]); // Ajout de userRole dans les dépendances pour recharger les stats si le rôle change

  if (loading) {
    return <div>Chargement des statistiques...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        {error}
      </div>
    );
  }

  const dynamicStats = [
    { icon: <FaProjectDiagram />, value: stats.totalProjects, label: "Projets", color: "#15615" },
    { icon: <FaTasks />, value: stats.totalTasks, label: "Tâches totales", color: "#28a745" },
    { icon: <FaTasks />, value: stats.completedTasks, label: "Tâches terminées", color: "#ffc107" },
    { icon: <FaTasks />, value: stats.overdueTasks, label: "Tâches en retard", color: "#dc3545" },
    ...(userRole === "admin" ? [{ icon: <FaShoppingCart />, value: stats.totalClients, label: "Clients", color: "#007bff" }] : []),  // Affiche les clients uniquement si admin
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Statistiques Dynamiques</h2>
      <div className="row">
        {dynamicStats.map((stat, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div
              className="card shadow border-0 h-100"
              style={{ borderLeft: `5px solid ${stat.color}` }}
            >
              <div className="card-body d-flex align-items-center gap-4">
                <div
                  className="display-4"
                  style={{ color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div>
                  <h3 className="card-title">{stat.value}</h3>
                  <p className="card-text">{stat.label}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsDashboard;
