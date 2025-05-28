import React, { useEffect, useState } from "react";
import API from "../services/api"; // Assurez-vous que `API` pointe vers l'instance Axios configurée
import { Link } from "react-router-dom";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Récupération des clients au chargement
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        const response = await API.get("/clients"); // Assurez-vous que l'URL de votre API est correcte
        setClients(response.data);
      } catch (error) {
        setError("Erreur lors de la récupération des clients.");
        console.error("Erreur lors de la récupération des clients.", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Supprimer un client
  const handleDelete = async (clientId) => {
    console.log("Suppression du client avec ID :", clientId); // Vérification de l'ID
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      try {
        const response = await API.delete(`/clients/${clientId}`); // Assurez-vous que vous utilisez DELETE
        if (response.status === 200) {
          setClients(clients.filter(client => client._id !== clientId));
          alert("Client supprimé avec succès.");
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message || "Erreur inconnue";
        setError(`Erreur lors de la suppression du client: ${errorMsg}`);
        console.error("Erreur lors de la suppression du client:", errorMsg);
      }
    }
  };
  
  
  
  
  

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Liste des Clients</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      {/* Lien vers le formulaire d'ajout */}
      <div className="text-right mb-4">
        <Link to="/clients/add" className="btn btn-primary">Ajouter un Client</Link>
      </div>

      {/* Chargement des données */}
      {isLoading ? (
        <p className="text-center">Chargement des clients...</p>
      ) : (
        <div>
          {clients.length === 0 ? (
            <p className="text-center text-muted">Aucun client trouvé.</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client._id}>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => handleDelete(client._id)}
                      >
                        Supprimer
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Clients;
