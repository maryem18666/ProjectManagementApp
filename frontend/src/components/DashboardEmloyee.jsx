import React from "react";


import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import StatsDashboard from "./StatsDashboard";
import TaskAdmin from "./Taskadmin";

const DashContent = () => {

  return (
    <div className="d-flex">
      <Sidebar role="user" />
      <div className="flex-grow-1 p-4 bg-light" style={{ paddingTop: "70px" }}>
        <Navbar />
        <StatsDashboard />
        <TaskAdmin />
      

      </div>
    </div>
  );
};

const DashboardEmloyee = () => {
  return (
      <DashContent />
  );
};

export default DashboardEmloyee;