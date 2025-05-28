import React, { useState} from "react";

const Settings = () => {
  // Initialisation des valeurs par défaut du formulaire
  const [form, setForm] = useState({
    name: "nom d'utilisateur",  
    email: "",   
    password: "",    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });  // Mettre à jour l'état du formulaire
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Vérification de l'email
    if (!form.email) {
      alert("Nom d'utilisateur et email obligatoires.");
      return;
    }

    // Vérification du mot de passe
    if (form.password && form.password.length < 6) {
      alert("Mot de passe : 6 caractères minimum.");
      return;
    }

    try {
      // Envoi des données du formulaire au backend
      const response = await fetch('http://localhost:3000/updateSettings', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Paramètres mis à jour !");
      } else {
        const err = await response.json();
        alert(err.message || "Erreur lors de la mise à jour.");
      }
    } catch (error) {
      alert("Erreur serveur.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Modifier mes informations personnelles</h2>
      <form onSubmit={handleSave} className="w-75 mx-auto">
        {/* Nom d'utilisateur */}
        <div className="mb-3">
          <label className="form-label">Nom d'utilisateur</label>
          <input
            type="text"
            name="name"
            value={form.name}  
            onChange={handleChange}
            className="form-control"
            placeholder="Entrez votre nom d'utilisateur"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}  
            onChange={handleChange}
            className="form-control"
            placeholder="Entrez votre email"
            required
          />
        </div>

        {/* Mot de passe */}
        <div className="mb-3">
          <label className="form-label">Nouveau mot de passe</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Laissez vide si inchangé"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Sauvegarder
        </button>
      </form>
    </div>
  );
};

export default Settings;