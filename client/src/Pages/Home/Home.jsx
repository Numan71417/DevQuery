import React from "react";

import "../../App.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";

import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";

const Home = ({ slideIn }) => {
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} />
      <div className="home-container-2 bg-body">
        <HomeMainbar />
        
      </div>
    </div>
  );
};

export default Home;
