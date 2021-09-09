import MyMap from "../../components/MyMap";
import Options from "../../components/Options";
import "./Menu.css";

const Menu = () => {
  return (
    <div className="grid-container">
      <div className="grid-item">
        <Options></Options>
      </div>
      <div className="grid-item">
        <MyMap></MyMap>
      </div>
    </div>
  );
};

export default Menu;
