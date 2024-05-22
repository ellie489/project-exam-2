import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search';
import { fetchVenues, searchVenues } from '../../services/api/venues';

const VenuesList = () => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const loadVenues = async () => {
        try {
          const venuesData = await fetchVenues();
          setVenues(venuesData.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      loadVenues();
    }, []);
  
    const handleSearchResults = async (searchTerm) => {
      if (!searchTerm.trim()) {
     
        setLoading(true);
        try {
          const venuesData = await fetchVenues();
          setVenues(venuesData.data);
          setError(null);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
       
        setLoading(true);
        try {
          const searchResults = await searchVenues(searchTerm);
          setVenues(searchResults.data);
          setError(null);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };
  
    return (
      <div className="venues-list">
        <h2>Venues</h2>
        <Search onSearchResults={handleSearchResults} />
        {loading && <p>Loading venues...</p>}
        {error && <p className="text-danger">Error: {error}</p>}
        <ul>
          {venues.map((venue) => (
            <li key={venue.id}>
              <Link to={`/venues/customer/${venue.id}`}>
                <h3>{venue.name}</h3>
                {venue.media && venue.media.length > 0 && (
                  <img src={venue.media[0].url} alt={venue.media[0].alt} />
                )}
                <p>Price: ${venue.price}</p>
                <p>Location: {venue.location.city}, {venue.location.country}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default VenuesList;
  