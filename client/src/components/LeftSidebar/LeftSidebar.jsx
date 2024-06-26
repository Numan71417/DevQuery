import React from "react";
import "./LeftSidebar.css";
import { NavLink } from "react-router-dom";
import Globe from "../../assets/Globe.svg";
import  publicicon  from "../../assets/publicicon.png";

const LeftSidebar = ({ slideIn, handleSlideIn }) => {
  const slideInStyle = {
    transform: "translateX(0%)",
  };

  const slideOutStyle = {
    transform: "translateX(-100%)",
  };

  return (
    <div
      className="left-sidebar"
      style={slideIn ? slideInStyle : slideOutStyle}
    >
      <nav className="side-nav">
        <button onClick={() => handleSlideIn()} className="nav-btn">
          <NavLink to="/" className="side-nav-links" activeclassname="active">
            <p>Home</p>
          </NavLink>
        </button>
        <div className="side-nav-div">
          <div>
            <p>PUBLIC</p>
          </div>

          <button onClick={() => handleSlideIn()} className="nav-btn">
            <NavLink
              to="/Questions"
              className="side-nav-links"
              activeclassname="active"
            >
              <img src={Globe} style={{filter:'invert(100%)'}} alt="Globe" />
              <p style={{ paddingLeft: "10px" }}> Questions </p>
            </NavLink>
          </button>

          <button onClick={() => handleSlideIn()} className="nav-btn">
            <NavLink
              to="/Posts"
              className="side-nav-links"
              activeclassname="active"
            >
              <img src={publicicon} alt="public" style={{filter:'invert(100%)'}} width="30px" />
              <p style={{ paddingLeft: "10px" }}> Community </p>
            </NavLink>
          </button>

         
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
