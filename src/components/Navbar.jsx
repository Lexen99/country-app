import "./Navbar.css";
import { useDarkMode } from "./DarkModeTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import logoDark from "../assets/techover-logo-dark.png";
import logoWhite from "../assets/techover-logo.png";

const Navbar = () => {
  const { toggleDarkMode, isDarkMode } = useDarkMode();

  const logoColor = isDarkMode ? logoWhite : logoDark;

  return (
    <nav className={`navbar ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="elements-container">
        <h3 className="app-name">Flag App</h3>
        <img className="techover-logo" src={logoColor} alt="" />
        <button className="dark-light-button" onClick={toggleDarkMode}>
          <FontAwesomeIcon
            style={{ fontSize: "25px", marginRight: "10px" }}
            icon={faMoon}
            color={isDarkMode ? "#fff" : "#000"}
          />
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;