import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTask = ({ onTaskAdded }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'low',
    status: 'in-progress', // statut par défaut
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/taskstotal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTask({ title: '', description: '', deadline: '', priority: 'low', status: 'in-progress' });

        // Appeler la fonction pour mettre à jour les tâches après ajout
        if (onTaskAdded) {
          onTaskAdded(newTask); // Ajoute la nouvelle tâche à l'état des tâches
        }

        // Naviguer vers la page taskstotal après l'ajout
        navigate("/taskstotal");
      } else {
        throw new Error('Erreur lors de l\'ajout de la tâche.');
      }
    } catch (error) {
      
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Titre de la tâche</label>
          <input
            type="text"
            name="title"
            id="title"
            value={task.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Entrez le titre de la tâche"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            name="description"
            id="description"
            value={task.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Entrez la description de la tâche"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="deadline" className="form-label">Date limite</label>
          <input
            type="date"
            name="deadline"
            id="deadline"
            value={task.deadline}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        

        <button type="submit" className="btn btn-success">Ajouter la tâche</button>
      </form>
    </div>
  );
};

export default AddTask;
