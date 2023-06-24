import "./Header.css";
import { AiOutlineSearch } from "react-icons/ai";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosWeb } from "../../../Axios";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();


//   const handleSearch = (event) => {
//     event.preventDefault();
//     const searchQueryLowercase = searchQuery.toLowerCase(); // Convert search query to lowercase
//     const queryString = `/properties/search?title=${encodeURIComponent(searchQueryLowercase)}&caseInsensitive=true`;
//     navigate(queryString);
//   };
   

const handleSearch = (event) => {
  event.preventDefault();
  const queryString = `/properties/search?title=${encodeURIComponent(searchQuery)}`;
  navigate(queryString);
};


  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="hero">
      <div className="content">
        <h1>Find the perfect place</h1>
        <p className="search-text">
          Search the largest selection of luxury high-rise apartments,
          multi-family homes, and luxury homes.
        </p>
        <form className="search">
          <div>
            <input
              type="text"
              placeholder="Enter Keyword.."
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
          <div className="radio">
            <button type="submit" onClick={handleSearch}>
              <AiOutlineSearch className="icon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header;
