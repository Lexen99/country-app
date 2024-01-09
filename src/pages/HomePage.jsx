import './HomePage.css';

import React from 'react';
import Navbar from '../components/Navbar';
import CountryCard from '../components/CountryCard';
import Search from '../components/Search';
import Dropdown from '../components/Dropdown';
import { useDarkMode } from '../components/DarkModeTheme';

import { useLoaderData } from 'react-router-dom';
import {useState} from 'react';


export const countriesLoader = async () => {
  try {
    const res = await fetch('https://restcountries.com/v3.1/all');

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const HomePage = () => {
  const allCountries = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(allCountries);
  const { isDarkMode } = useDarkMode();

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    const filtered = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleRegionChange = (countries) => {
    setFilteredCountries(countries);
  }

  return (
    <div className={`home-page ${isDarkMode ? "dark-mode" : ""}`}>
      <Navbar />
      <div className='search-dropdown'>
        <Search onSearch={handleSearch} />
        <Dropdown onRegionChange={handleRegionChange}/>
      </div>
      <div className='country-card-container'>
        {filteredCountries?.map((country) => (
          <CountryCard key={country.cca2} {...country}/>
        ))}
      </div>
    </div>
  );
};

export default HomePage;