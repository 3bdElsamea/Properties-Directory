import "./Property-List-Filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const PropertiesListFilter = () => {
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
            />
            <label>
              <span className="flaticon-search"></span>
            </label>
          </div>
        </div>
        <div className="widget-wrapper">
          <h6 className="list-title">Listing Status</h6>
          <div className="radio-element">
            <div className="form-check d-flex align-items-center mb10">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault4"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault4">
                Buy
              </label>
            </div>
            <div className="form-check d-flex align-items-center mb10">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault5"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault5">
                Rent
              </label>
            </div>
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault6"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault6">
                Sold
              </label>
            </div>
          </div>
        </div>
        <div className="widget-wrapper">
          <h6 className="list-title">Property Type</h6>
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              Houses
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="custom_checkbox">
              Apartments
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="custom_checkbox">
              Office
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="custom_checkbox">
              Villa
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="custom_checkbox">
              Townhome
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        <div className="widget-wrapper">
          <h6 className="list-title">Price Range</h6>
          <div className="range-slider-style2">
            <div className="range-wrapper">
              <div className="mb30 mt35" id="slider"></div>
              <div className="d-flex align-items-center">
                <span id="slider-range-value1"></span>
                <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon"></i>
                <span id="slider-range-value2"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="widget-wrapper">
          <h6 className="list-title">Bedrooms</h6>
          <div className="d-flex">
            <div className="selection">
              <input id="any2" name="beds" type="radio" />
              <label htmlFor="any2">Any</label>
            </div>
            <div className="selection">
              <input id="one2" name="beds" type="radio" />
              <label htmlFor="one2">1+</label>
            </div>
            <div className="selection">
              <input id="two2" name="beds" type="radio" />
              <label htmlFor="two2">2+</label>
            </div>
            <div className="selection">
              <input id="three2" name="beds" type="radio" />
              <label htmlFor="three2">3+</label>
            </div>
            <div className="selection">
              <input id="three2" name="beds" type="radio" />
              <label htmlFor="three2">4+</label>
            </div>
          </div>
        </div>
        <div className="widget-wrapper">
          <h6 className="list-title">Bathrooms</h6>
          <div className="d-flex">
            <div className="selection">
              <input id="any3" name="baths" type="radio" />
              <label htmlFor="any3">Any</label>
            </div>
            <div className="selection">
              <input id="one3" name="baths" type="radio" />
              <label htmlFor="one3">1+</label>
            </div>
            <div className="selection">
              <input id="two3" name="baths" type="radio" />
              <label htmlFor="two3">2+</label>
            </div>
            <div className="selection">
              <input id="three3" name="baths" type="radio" />
              <label htmlFor="three3">3+</label>
            </div>
            <div className="selection">
              <input id="four3" name="baths" type="radio" />
              <label htmlFor="four3">4+</label>
            </div>
          </div>
        </div>
        <div className="widget-wrapper">
          <h6 className="list-title">Amenities</h6>
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              Air Conditioning
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="custom_checkbox">
              Swimming Pool
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="custom_checkbox">
              Laundry Room
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="custom_checkbox">
              Gym
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <label className="custom_checkbox">
              Parking
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        <div className="widget-wrapper mb20">
          <div className="btn-area d-grid align-items-center">
            <button className="ud-btn btn-thm">
              <span className="flaticon-search align-text-top pr10"></span>
              <FontAwesomeIcon icon={faSearch} /> Search
            </button>
          </div>
        </div>
        <div className="reset-area d-flex align-items-center justify-content-between">
          <a className="reset-button" href="#">
            <span className="flaticon-turn-back"></span>
            <u>Reset all filters</u>
          </a>
          <a className="reset-button" href="#">
            <span className="flaticon-favourite"></span>
            <u>Save Search</u>
          </a>
        </div>
      </div>
    </>
  );
};

export default PropertiesListFilter;
