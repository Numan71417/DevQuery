import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";

import logo from "../../assets/logo.png";
import Avatar from "../../components/Avatar/Avatar";
import "./Navbar.css";
import { setCurrentUser } from "../../actions/currentUser";
import bars from "../../assets/bars-solid.svg";
import Notifications from "../../Pages/AddPosts/Notifications";

const Navbar = ({ handleSlideIn }) => {
  const dispatch = useDispatch();
  var User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [User?.token, dispatch]);

  return (
    <nav className="main-nav">
      <div className="navbar">
        <button className="slide-in-icon" onClick={() => handleSlideIn()}>
          <img src={bars} alt="bars" width="15" />
        </button>
        <div className="navbar-1">
          <Link to="/" className="nav-item nav-logo">
            <img src={logo} width={'80px'} alt="logo" />
          </Link>
          {/* <Link to="/" className="nav-item nav-btn res-nav abt">
            About
          </Link> */}
          {/* <Link to="/" className="nav-item nav-btn res-nav abt">
            Products
          </Link> */}
          <Link to="/Posts" className="nav-item nav-btn res-nav">
            Community
          </Link>
         
        </div>
        <div className="navbar-2">
          {User === null ? (
            <Link to="/Auth" className="nav-item nav-links">
              Log in
            </Link>
          ) : (
            <>
             {User?.result?.pic? 
             <Link
             to={`/Users/${User?.result?._id}`}
             style={{ color: "white", textDecoration: "none" }}
           >
              <img src={User?.result?.pic} alt="" width='30px' height='30px' style={{borderRadius:'50%'}} />
              </Link>
              :
              <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="6px"
                borderRadius="50%"
                color="white"
              >
                <Link
                  to={`/Users/${User?.result?._id}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {User?.result?.name.charAt(0).toUpperCase()}
                </Link>
              </Avatar>}
              <Notifications/>
              <button className="nav-item nav-links" onClick={handleLogout}>
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
