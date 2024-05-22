import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearchResults(searchTerm);
    }
  };

  const handleSearchClick = () => {
    onSearchResults(searchTerm);
  };

  return (
    <div className="search-component">
      <input
        type="text"
        className="form-control"
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Search for venues..."
      />
      <button onClick={handleSearchClick} className="btn btn-primary">Search</button>
    </div>
  );
};

Search.propTypes = {
  onSearchResults: PropTypes.func.isRequired,
};

export default Search;
