import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Search from '../Search';
import { fetchVenues, searchVenues } from '../../services/api/venues';
import { truncateText } from '../../services/api/utils';

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
    <Container fluid className="venues-list">
      <Row>
        <Col>
          <h2>Top Stays</h2>
          <Search onSearchResults={handleSearchResults} />
          {loading && <p>Loading venues...</p>}
          {error && <p className="text-danger">Error: {error}</p>}
        </Col>
      </Row>
      <Row>
        {venues.map((venue) => (
          <Col xs={12} sm={6} md={4} lg={3} key={venue.id} className="mb-4 d-flex justify-content-center">
            <Card className="custom-card">
              <Link to={`/venues/customer/${venue.id}`} className="custom-card-link">
                {venue.media && venue.media.length > 0 && (
                  <img src={venue.media[0].url} alt={venue.media[0].alt} className="custom-card-img img-fluid" />
                )}
                <Card.Body>
                  <Card.Title>{truncateText(venue.name, 25)}</Card.Title>
                  <Card.Text>
                    Price per night: <span className="price">{truncateText(`$${venue.price}`, 30)}</span>
                    <br />
                    <span className="other-text">{truncateText(`Location: ${venue.location.city}, ${venue.location.country}`, 30)}</span>
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VenuesList;