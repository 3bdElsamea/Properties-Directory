import "./Property-List-Filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import React, { useState, useEffect } from "react";
import { AxiosWeb } from "../../../../Axios";

const PropertiesListFilter = ({ setFilteredPropertyList }) => {
  const [searchInput, setSearchInput] = useState("");
  const [bedroomsInput, setBedroomsInput] = useState("");
  const [bathroomsInput, setBathroomsInput] = useState("");
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [minAreaInput, setMinAreaInput] = useState("");
  const [maxAreaInput, setMaxAreaInput] = useState("");
  const [initialData, setInitialData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await AxiosWeb.get("/properties");
      setInitialData(response.data.data);
    } catch (error) {
      setErrorMessage("Failed to fetch data.");
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const queryParams = [];
      
      if (searchInput) {
        queryParams.push(`title=${searchInput}`);
      }
      if (bedroomsInput) {
        queryParams.push(`bedrooms=${bedroomsInput}`);
      }
      if (bathroomsInput) {
        queryParams.push(`bathrooms=${bathroomsInput}`);
      }
      if (minPriceInput && maxPriceInput) {
        queryParams.push(`price=gte_${minPriceInput}_lte_${maxPriceInput}`);
      } else if (minPriceInput) {
        queryParams.push(`price=gte_${minPriceInput}`);
      } else if (maxPriceInput) {
        queryParams.push(`price=lte_${maxPriceInput}`);
      }
      if (minAreaInput && maxAreaInput) {
        queryParams.push(`area=gte_${minAreaInput}_lte_${maxAreaInput}`);
      } else if (minAreaInput) {
        queryParams.push(`area=gte_${minAreaInput}`);
      } else if (maxAreaInput) {
        queryParams.push(`area=lte_${maxAreaInput}`);
      }

      const queryString = queryParams.length> 0 ? `?${queryParams.join("&")}` : "";
      const response = await AxiosWeb.get(`/properties${queryString}`);
      setFilteredPropertyList(response.data.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Only numbers are allowed");
      console.log(error);
    }
  };

  const handleBedroomsChange = (value) => {
    setBedroomsInput(value);
  };

  const handleBathroomsChange = (value) => {
    setBathroomsInput(value);
  };

  const handleMinPriceChange = (value) => {
    setMinPriceInput(value);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPriceInput(value);
  };

  const handleMinAreaChange = (value) => {
    setMinAreaInput(value);
  };

  const handleMaxAreaChange = (value) => {
    setMaxAreaInput(value);
  };

  const resetFilters = () => {
    setFilteredPropertyList(initialData);
    setSearchInput("");
    setBedroomsInput("");
    setBathroomsInput("");
    setMinPriceInput("");
    setMaxPriceInput("");
    setMinAreaInput("");
    setMaxAreaInput("");
  };

  return (
    <>
      <div className="hsidebar-content">
        <div className="widget-wrapper">
          <h6 className="list-title">Find your home</h6>
          <div className="search_area">
            <input
              type="text"
              className="form-control"
              placeholder="What are you looking for?"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <label>
              <FontAwesomeIcon icon={faSearch} />
            </label>
          </div>
        </div>
        <div
          className="widget-wrapper"
          style={{
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <h6
            className="list-title"
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Price Range
          </h6>
          <div className="search_area">
            <input
              type="text"
              className="form-control"
              placeholder="Min"
              style={{ display: "inline-block", width: "90px" }}
              value={minPriceInput}
              onChange={(e) => handleMinPriceChange(e.target.value)}
            />
            <span style={{ fontWeight: "600" }}>-</span>
            <input
              type="text"
              className="form-control ml-3"
              placeholder="Max"
              style={{ display: "inline-block", width: "90px" }}
              value={maxPriceInput}
              onChange={(e) => handleMaxPriceChange(e.target.value)}
            />
          </div>
        </div>

        <div
          className="widget-wrapper"
          style={{
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <h6
            className="list-title"
            style={{
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Area
          </h6>
          <div className="search_area">
            <input
              type="text"
              className="form-control"
              placeholder="Min"
              style={{ display: "inline-block", width: "90px" }}
              value={minAreaInput}
              onChange={(e) => handleMinAreaChange(e.target.value)}
            />
            <span style={{ fontWeight: "600" }}>-</span>
            <input
              type="text"
              className="form-control ml-3"
              placeholder="Max"
              style={{ display: "inline-block", width: "90px" }}
              value={maxAreaInput}
              onChange={(e) => handleMaxAreaChange(e.target.value)}
            />
          </div>
        </div>

        <div className="bedrooms mb-3">
          <h6>Bedrooms:</h6>
          <select
            className="form-control"
            value={bedroomsInput}
            onChange={(e) => handleBedroomsChange(e.target.value)}
          >
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </div>
        <div className="bathrooms">
          <h6>Bathrooms:</h6>
          <select
            className="form-control"
            value={bathroomsInput}
            onChange={(e) => handleBathroomsChange(e.target.value)}
          >
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </div>
        <div className="reset-btn">
          <button className="btn btn-default" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
        <div className="filter-btn">
          <button className="btn btn-default" onClick={handleSearch}>
            Filter
          </button>
        </div>
        {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
      </div>
    </>
  );
};

export default PropertiesListFilter;
