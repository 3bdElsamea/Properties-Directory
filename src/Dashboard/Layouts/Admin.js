import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { Container } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import AdminNavbar from "../Components/Navbars/AdminNavbar.js";
import AdminFooter from "../Components/Footers/AdminFooter.js";
import Sidebar from "../Components/Sidebar/Sidebar.js";
import routes from "../../Routes.js";
import ErrorPage from "Dashboard/Pages/ErrorPage/ErrorPage.js";


const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/dashboard") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>

      <Sidebar

        {...props}
        routes={routes}
        logo={{
          innerLink: "/dashboard/index",
          imgSrc:
            "https://creativelayers.net/themes/homez-html/images/header-logo2.svg",
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <ToastContainer />
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />

        <Routes>
          {getRoutes(routes)}
          <Route
            path="*"
            element={<Navigate to="/dashboard/ErrorPage" replace />}
          />
        </Routes>

        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
