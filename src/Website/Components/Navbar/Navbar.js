import React, { useState } from "react";
import "./Navbar.css";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

function handleLogout() {
  localStorage.removeItem("jwt"); // remove the JWT token from local storage
  window.location.href = "/login"; // redirect the user to the login page
}

const isLoggedIn = localStorage.getItem("jwt");

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className={`navbar ${menuVisible ? "menu-open" : ""}`}>
      <div className="navbar-container">
        <div className="logo-container">
          <a className="header-logo logo1" href="/home">
            <img
              src="https://creativelayers.net/themes/homez-html/images/header-logo2.svg"
              alt="Header Logo"
            />
          </a>
        </div>
        <div className={`nav-menu ${menuVisible ? "active" : ""}`}>
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <a href="/profile">Profile</a>
                </li>
                <li>
                  <a href="/my-requests">My Requests</a>
                </li>
              </>
            )}
            <li>
              <a href="#">
                Properties
                <span className="arrow"></span>
              </a>
              <ul className="sub-menu">
                <li>
                  <a href="/properties">All Properties</a>
                </li>
                <li>
                  <a href="#">Properties for Rent</a>
                </li>
                <li>
                  <a href="#">Properties for Sale</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">
                Pages
                <span className="arrow"></span>
              </a>
              <ul className="sub-menu">
                <li>
                  <a href="about">About Us</a>
                </li>
                <li>
                  <a href="/contact-us">Contact Us</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="nav-buttons">
          {isLoggedIn ? (
            <button
              className="btn btn-danger btnNav"
              onClick={handleLogout}
              style={{ backgroundColor: "#EB6753" }}
            >
              Logout
            </button>
          ) : (
            <a href="/login">
              <button className="btn btn-dark btnNav">Login</button>
            </a>
          )}
        </div>
        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          {menuVisible ? (
            <AiOutlineClose className="close-icon" />
          ) : (
            <AiOutlineMenu className="menu-icon" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
