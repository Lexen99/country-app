import "./HomePage.css";

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import CountryCard from "../components/CountryCard";
import Search from "../components/Search";
import Dropdown from "../components/Dropdown";
import { useDarkMode } from "../components/DarkModeTheme";

import { useLoaderData } from "react-router-dom";
import { useState } from "react";

export const countriesLoader = async () => {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const HomePage = () => {
  const allCountries = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const sortedAllCountries = allCountries.sort((a, b) => (a.name?.common || '').localeCompare(b.name?.common || ''));
    setFilteredCountries(sortedAllCountries)
  }, [allCountries])

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    const filtered = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedCountries = filtered.sort((a, b) =>
      (a.name.common || '').localeCompare(b.name.common || '')
    );
    setFilteredCountries(sortedCountries);
  };

  const handleRegionChange = (countries) => {
    const filteredCountriesFromRegion = countries.filter((country) => 
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filteredCountriesFromRegion);
  };

  const handleAllRegions = () => {
    setFilteredCountries(allCountries)
  }

  return (
    <div className={`home-page ${isDarkMode ? "dark-mode" : ""}`}>
      <Navbar />
      <div className="search-dropdown">
        <Search onSearch={handleSearch} />
        <Dropdown onRegionChange={handleRegionChange} onAllRegions={handleAllRegions} />
      </div>
      <div className="country-card-container">
        {filteredCountries?.map((country) => (
          <CountryCard key={country.cca2} {...country} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
