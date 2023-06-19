import "./Property-List-Filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";
import { AxiosWeb } from "../../../../Axios";

const PropertiesListFilter = ({ setFilteredPropertyList }) => {
  const [searchInput, setSearchInput] = useState("");
  const [bedroomsInput, setBedroomsInput] = useState("");
  const [bathroomsInput, setBathroomsInput] = useState("");
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");

  const handleSearch = async (value) => {
    setSearchInput(value);
    try {
      const response = await AxiosWeb.get(`/properties?title=${value}`);
      setFilteredPropertyList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBedroomsChange = (value) => {
    setBedroomsInput(value);
    filterPropertiesByBedrooms(value);
  };

  const handleBathroomsChange = (value) => {
    setBathroomsInput(value);
    filterPropertiesByBathrooms(value);
  };

  const filterPropertiesByBedrooms = async (value) => {
    try {
      const response = await AxiosWeb.get(`/properties?bedrooms=${value}`);
      setFilteredPropertyList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterPropertiesByBathrooms = async (value) => {
    try {
      const response = await AxiosWeb.get(`/properties?bathrooms=${value}`);
      setFilteredPropertyList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMinPriceChange = (value) => {
    setMinPriceInput(value);
    filterPropertiesByPriceRange(minPriceInput, maxPriceInput);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPriceInput(value);
    filterPropertiesByPriceRange(minPriceInput, maxPriceInput);
  };

  const filterPropertiesByPriceRange = async (minPrice, maxPrice) => {
    let queryParams = "";

    if (minPrice && maxPrice) {
      queryParams = `?price=gte_${minPrice}_lte_${maxPrice}`;
    } else if (minPrice) {
      queryParams = `?price=gte_${minPrice}`;
    } else if (maxPrice) {
      queryParams = `?price=lte_${maxPrice}`;
    }
    try {
      const response = await AxiosWeb.get(`/properties${queryParams}`);
      setFilteredPropertyList(response.data.data);
    } catch (error) {
      console.log(error);
    }
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
              onChange={(e) => handleSearch(e.target.value)}
            />
            <label>
              <span className="flaticon-search"></span>
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
            />
            <span style={{ fontWeight: "600" }}>-</span>
            <input
              type="text"
              className="form-control ml-3"
              placeholder="Max"
              style={{ display: "inline-block", width: "90px" }}
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

        <div className="reset-area d-flex align-items-center justify-content-between">
          <a className="reset-button" href="#">
            <span className="flaticon-turn-back"></span>
            <u>Reset all filters</u>
          </a>
        </div>
      </div>
    </>
  );
};

export default PropertiesListFilter;
