import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import AddClient from "./components/AddClient";
import AddProject from "./components/AddProject";
import AddTask from "./components/AddTask";
import AddTaskAdmin from "./components/AddTaskAdmin";
import Clients from "./components/Client";
import DashboardEmloyee from "./components/DashboardEmloyee";
import Footer from "./components/Footer";
import Gamification from "./components/Gamification";
import Header from "./components/Header";
import Home from "./components/Home";
import Dash from "./components/HomeAdmin";
import Login from "./components/Login";

import Navbar from "./components/Navbar";

import Profile from "./components/profile";
import Projectbar from "./components/Projectbar";
import ProjectList from "./components/ProjectList";
import Register from "./components/Register";
import Settings from "./components/Settings";
import TasksTable from './components/TasksTable';
import Tasks from './components/tasktotal';
import TaskAdmin from "./components/Taskadmin";
import TaskTableAdmin from './components/TaskTableAdmin';
import UpdateProject from "./components/UpdateProject";

const userId = "67913e1f55ead5e532726e9b"; // Remplace par l'ID de l'utilisateur connecté


function App() {
  return (

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Dash" element={<Dash />} />
          <Route path="/DashEmployee" element={<DashboardEmloyee />} />
          <Route path="/Header" element={<Header />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/add" element={<AddProject />} />
          <Route path="/projects/:id/edit" element={<UpdateProject />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/AddTask" element={<AddTask />} />
          <Route path="/AddTaskAdmin" element={<AddTaskAdmin />} />
          <Route path="/taskstotal" element={<Tasks />} />
          <Route path="/taskstable" element={<TasksTable />} />
          <Route path="/TaskAdmin" element={<TaskAdmin />} />
          <Route path="/tasktableadmin" element={<TaskTableAdmin />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/add" element={<AddClient />} />
 
        
          <Route path="/projectsbar" element={<Projectbar />} />
          <Route path="/gamification" element={<Gamification />} />
        </Routes>
      </Router>
 
  );
}

export default App;
