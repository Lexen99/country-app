import { useState } from "react";
import './Search.css'
import { DarkModeTheme, useDarkMode } from "./DarkModeTheme";

const Search = ({ onSearch }) => {
    const {isDarkMode} = useDarkMode();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

  return (
    <form onSubmit={handleSubmit} >
      <label >
        <input
          className={`search__bar ${isDarkMode ? 'dark-mode' : ''}`}
          placeholder="Search for a country..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
    </form>
  );
};

export default Search;