import "./Properties-List.css";
import PropertiesListFilter from "./Property-List-Filter";

const PropertiesList = () => {
  return (
    <div className="properties_container">
        <h3>Show All Properties</h3>
        <PropertiesListFilter/>
    </div>
  );
};

export default PropertiesList;
