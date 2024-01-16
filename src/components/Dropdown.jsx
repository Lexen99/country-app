import React, { useState, useEffect } from "react";
import "./Dropdown.css";
import { useDarkMode } from "./DarkModeTheme";

const Dropdown = ({ onRegionChange, onAllRegions }) => {
  const [region, setRegion] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        let apiUrl = "https://restcountries.com/v3.1/all";

        if (region) {
          apiUrl = `https://restcountries.com/v3.1/region/${region}`;
        }

        const res = await fetch(apiUrl);

        if (!res.ok) {
          throw new Error(`Could not get region: ${res.status}`);
        }

        const data = await res.json();

        const sortedCountries = data.sort((a, b) =>
          (a.name?.common || "").localeCompare(b.name?.common || "")
        );

        onRegionChange(sortedCountries);
      } catch (error) {
        console.error("Error fetching region:", error);
      }
    };

    fetchRegion();
  }, [region, onRegionChange]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    setRegion(value);
    toggleDropdown();
  };

  const handleAllRegionsClick = () => {
    setRegion("");
    toggleDropdown();
    onAllRegions();
  }

  return (
    <div className="custom-dropdown">
      <div
        className={`dropdown-header ${isDarkMode ? "dark-mode" : ""}`}
        onClick={toggleDropdown}
      >
        {region || "Filter by region"}
      </div>
      {isOpen && (
        <div className={`dropdown-options ${isDarkMode ? "dark-mode" : ""}`}>
          <div className={`regions-container ${isDarkMode ? "dark-mode" : ""}`}>
          <div
              className={`regions ${isDarkMode ? "dark-mode" : ""}`}
              onClick={handleAllRegionsClick}
            >
              All Regions
            </div>
            <div
              className={`regions ${isDarkMode ? "dark-mode" : ""}`}
              onClick={() => handleOptionClick("africa")}
            >
              Africa
            </div>
            <div
              className={`regions ${isDarkMode ? "dark-mode" : ""}`}
              onClick={() => handleOptionClick("America")}
            >
              America
            </div>
            <div
              className={`regions ${isDarkMode ? "dark-mode" : ""}`}
              onClick={() => handleOptionClick("Asia")}
            >
              Asia
            </div>
            <div
              className={`regions ${isDarkMode ? "dark-mode" : ""}`}
              onClick={() => handleOptionClick("europe")}
            >
              Europe
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
