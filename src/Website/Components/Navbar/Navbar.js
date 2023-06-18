import "./Navbar.css";

function handleLogout() {
  localStorage.removeItem("jwt"); // remove the JWT token from local storage
  window.location.href = "/login"; // redirect the user to the login page
}
const isLoggedIn = localStorage.getItem("jwt");

const Navbar = () => {
  return (
    <div className="row rowNav align-items-center justify-content-between">
      <div className="colnav col-auto">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logos mr35">
            <a className="header-logo logo1" href="/home">
              <img
                src="https://creativelayers.net/themes/homez-html/images/header-logo2.svg"
                alt="Header Logo"
              />
            </a>
          </div>
          <ul
            id="respMenu"
            className="ace-responsive-menu"
            data-menu-style="horizontal"
          >
            <li className="visible_list">
              {" "}
              <a className="list-item" href="/home">
                <span className="title">Home</span>
              </a>
            </li>
            <li className="megamenu_style">
              {" "}
              <a className="list-item" href="#">
                <span className="title">Profile</span>
              </a>
            </li>
            <li className="visible_list">
              {" "}
              <a className="list-item" href="#">
                <span className="title">Properties</span>
                <span className="arrow "></span>
              </a>
              <div className="sub-menu">
                <ul className="list-unstyled">
                  <li>
                    <a href="/properties">All Properties</a>
                  </li>
                  <li>
                    <a href="#">Properties for Rent</a>
                  </li>
                  <li>
                    <a href="#">Properties for Sale</a>
                  </li>
                  <li>
                    <a href="#">Most Popular</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="visible_list">
              {" "}
              <a className="list-item" href="#">
                <span className="title">Pages</span>
                <span className="arrow "></span>
              </a>
              <div className="sub-menu">
                <ul className="list-unstyled">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="visible_list">
              {" "}
              <a className="list-item" href="/register">
                <span className="title">Resgister</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="colnav col-auto">
        {isLoggedIn ? (
          <button className="btn btn-danger btnNav" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <a href="/login">
            <button className="btn btn-dark btnNav">Login</button>
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
