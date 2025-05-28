import React from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import StatsDashboard from "./StatsDashboard";

import Taskadmin from "./Taskadmin";

const DashContent = () => {

  return (
    <div className="d-flex">
      <Sidebar role="admin"/>
      <div className="flex-grow-1 p-4 bg-light" style={{ paddingTop: "70px" }}>
        <Navbar />
        <StatsDashboard />
       
        <Taskadmin/>

      </div>
    </div>
  );
};

const Dash = () => {
  
  return (
      <DashContent />
  );
};

export default Dash;