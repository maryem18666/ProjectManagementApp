import React from "react";
import { FaTasks, FaProjectDiagram,  FaUsers,  FaCogs } from "react-icons/fa";
import { Link } from "react-router-dom";

import './sidebar.css' ;



const Sidebar = ({ role }) => {
  return (
    <div className="d-flex flex-column sidebar  p-3 shadow-lg">
      <h2 className="text-center mb-4">Managem</h2>
      <ul className="nav flex-column">
        <li className="nav-item mb-3">
            <FaTasks className="me-2" />
            Tableau de bord
        </li>

        <li className="nav-item mb-3">
          <Link to="/projectsbar" className="nav-link text-white d-flex align-items-center">
            <FaProjectDiagram className="me-2" />
            Projets
          </Link>
        </li>
        

        {role === "admin" && (
          <>
          <li className="nav-item mb-3">
            <Link to="/AddTaskAdmin" className="nav-link text-white d-flex align-items-center">
              <FaTasks className="me-2" />
              Taches
            </Link>
          </li>
          </>
        )}
        

        {role === "admin" && (
          <>
            <li className="nav-item mb-3">
              <Link to="/clients" className="nav-link text-white d-flex align-items-center">
                <FaUsers className="me-2" />
                Clients
              </Link>
            </li>
          </>
        )}

        
      </ul>
    </div>
  );
};

export default Sidebar;
