import { useState } from "react";
import './Search.css'
import { DarkModeTheme, useDarkMode } from "./DarkModeTheme";

const Search = ({ onSearch }) => {
    const {isDarkMode} = useDarkMode();
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
      const newSearchTerm = e.target.value;
      setSearchTerm(newSearchTerm);
      onSearch(newSearchTerm);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
    }

  return (
    <form onSubmit={handleSubmit} >
      <label >
        <input
          className={`search__bar ${isDarkMode ? 'dark-mode' : ''}`}
          placeholder="Search for a country..."
          type="text"
          value={searchTerm}
          onChange={handleChange}
        />
      </label>
    </form>
  );
};

export default Search;