import "./Navbar.css";

function handleLogout() {
  localStorage.removeItem("jwt"); // remove the JWT token from local storage
  window.location.href = "/login"; // redirect the user to the login page
}
const isLoggedIn = localStorage.getItem("jwt");

const Navbar = () => {
  return (

    <div class="row rowNav align-items-center justify-content-between">
      <div class="colnav col-auto">
        <div class="d-flex align-items-center justify-content-between">
          <div class="logos mr35">
            <a class="header-logo logo1" href="/home">
              <img
                src="https://creativelayers.net/themes/homez-html/images/header-logo2.svg"
                alt="Header Logo"
              />
            </a>
          </div>
          <ul
            id="respMenu"
            class="ace-responsive-menu"
            data-menu-style="horizontal"
          >
            <li class="visible_list">
              {" "}
              <a class="list-item" href="/home">
                <span class="title">Home</span>
              </a>
            </li>
            <li class="megamenu_style">
              {" "}
              <a class="list-item" href="#">
                <span class="title">Profile</span>
              </a>
            </li>
            <li class="visible_list">
              {" "}
              <a class="list-item" href="#">
                <span class="title">Properties</span>
                <span class="arrow "></span>
              </a>
              <div class="sub-menu">
                <ul class="list-unstyled">
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
            <li class="visible_list">
              {" "}
              <a class="list-item" href="#">
                <span class="title">Pages</span>
                <span class="arrow "></span>
              </a>
              <div class="sub-menu">
              <ul class="list-unstyled">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
              </div>
            </li>
            <li class="visible_list">
              {" "}
              <a class="list-item" href="/register">
                <span class="title">Resgister</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="colnav col-auto">
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
