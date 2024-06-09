import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, FormControl, Button, Spinner } from 'react-bootstrap';
import ErrorBox from '../ErrorBox';

const Search = ({ onSearchResults, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    try {
      await onSearchResults(searchTerm);
      setError(null);
    } catch (err) {
      setError('An error occurred during the search.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <InputGroup className="search-component mb-3">
        <FormControl
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Search for venues..."
          disabled={loading}
        />
        <Button onClick={handleSearch} variant="primary" disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Search'}
        </Button>
      </InputGroup>
      {error && <ErrorBox message={error} />}
    </>
  );
};

Search.propTypes = {
  onSearchResults: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Search;
