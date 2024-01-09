import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "./DarkModeTheme";
import "./CountryCard.css";

const CountryCard = ({ name, population, flags, region, capital, cca2 }) => {
  const { isDarkMode } = useDarkMode();
  return (
    <Link className={`country__card ${isDarkMode ? "dark-mode" : ""}`} key={name.common} to={`/${cca2}`}>
      <img src={flags.png} alt={`${name.common} Flag`} className="flag" />
      <div className="info-container">
        <h3>{name.common}</h3>
        <p>
          <strong>Population:</strong> {population.toLocaleString("en-US")}
        </p>
        <p>
          <strong>Region:</strong> {region}
        </p>
        <p>
          <strong>Capital:</strong> {capital}
        </p>
      </div>
    </Link>
  );
};

export default CountryCard;