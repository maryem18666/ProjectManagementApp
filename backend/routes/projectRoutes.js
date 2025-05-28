const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const User = require("../models/user");

const mongoose = require("mongoose");

// Route pour ajouter un projet
router.post("/add", async (req, res) => {
  try {
    const { title, description, deadline, tasks } = req.body;

    // Vérifier que les champs nécessaires sont présents
    if (!title || !description || !deadline) {
      return res.status(400).json({ message: "Tous les champs sont requis !" });
    }

    // Si des tâches sont envoyées, traiter chaque tâche
    let tasksWithUserIds = [];

    if (tasks && Array.isArray(tasks) && tasks.length > 0) {
      console.log("Tâches reçues :", tasks);

      tasksWithUserIds = await Promise.all(
        tasks.map(async (task) => {
          // Si la tâche a un utilisateur assigné, récupérer cet utilisateur par ID
          if (task.assignedTo) {
            console.log(
              `Recherche de l'utilisateur avec l'ID : ${task.assignedTo}`
            );
            const user = await User.findById(task.assignedTo);

            if (!user) {
              console.error(`⚠️ Utilisateur non trouvé : ${task.assignedTo}`);
              // Retourner la tâche avec l'ID assigné même si l'utilisateur n'est pas trouvé
              return { ...task, assignedTo: task.assignedTo };
            }
            return { ...task, assignedTo: user.id }; // Retourner la tâche avec l'ID de l'utilisateur
          }
          return task; // Retourner la tâche sans assignation si pas d'utilisateur
        })
      );

      console.log("Tâches après traitement :", tasksWithUserIds);
    }

    // Créer un projet avec les tâches assignées
    const project = new Project({
      title,
      description,
      deadline,
      tasks: tasksWithUserIds,
    });
    // Sauvegarder le projet dans la base de données
    const savedProject = await project.save();
    console.log("✅ Projet enregistré :", savedProject);

    res.status(201).json(savedProject); // Retourner le projet créé
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    // Récupérer les projets avec les utilisateurs assignés aux tâches
    const projects = await Project.find().populate("tasks.assignedTo", "email");
    console.log("Projets récupérés :", projects);
    res.status(200).json(projects);
  } catch (error) {
    console.error("Erreur lors de la récupération des projets :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID du projet à supprimer (serveur) :", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID du projet invalide !" });
    }

    const deletedProject = await Project.findByIdAndDelete(id);
    console.log("Projet supprimé (serveur) :", deletedProject);

    if (!deletedProject) {
      return res.status(404).json({ message: "Projet non trouvé !" });
    }

    res.status(200).json({ message: "Projet supprimé avec succès." });
  } catch (error) {
    console.error("Erreur serveur lors de la suppression du projet :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// Route pour mettre à jour un projet existant
router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ message: "Projet non trouvé." });
    }
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour du projet." });
  }
});

module.exports = router;
