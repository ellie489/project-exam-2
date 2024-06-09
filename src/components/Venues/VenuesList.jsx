import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Search from '../Search';
import { fetchVenues, searchVenues } from '../../services/api/venues';
import { truncateText } from '../../services/api/utils';
import ErrorBox from '../ErrorBox';

const VenuesList = () => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noResults, setNoResults] = useState(false);

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
        setLoading(true);
        try {
            const searchResults = searchTerm.trim()
                ? await searchVenues(searchTerm)
                : await fetchVenues();

            setVenues(searchResults.data);
            setError(null);
            setNoResults(searchResults.data.length === 0);
        } catch (err) {
            setError(err.message);
            setVenues([]);
            setNoResults(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="venues-list mt-4">
            <Row>
                <Col>
                    <Search className="mb-3" onSearchResults={handleSearchResults} />
                    {loading && (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                            <Spinner animation="border" role="status">
                            </Spinner>
                        </div>
                    )}
                    {error && <ErrorBox message={error} />}
                    {noResults && <p>No matching venues found.</p>}
                    {!loading && !error && !noResults && <h2 className="mt-4">Top Stays</h2>}
                </Col>
            </Row>
            <Row>
                {venues.map((venue) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={venue.id} className="mb-4 d-flex justify-content-center">
                        <div className="custom-card">
                            <Link to={`/venues/customer/${venue.id}`} className="custom-card-link">
                                {venue.media && venue.media.length > 0 && (
                                    <img
                                        src={venue.media[0].url}
                                        alt={venue.media[0].alt}
                                        className="custom-card-img img-fluid rounded"
                                    />
                                )}
                                <div className="card-body">
                                    <div className="card-title">{truncateText(venue.name, 25)}</div>
                                    <div className="card-text">
                                        Price per night: <span className="price">{truncateText(`$${venue.price}`, 30)}</span>
                                        <br />
                                        <span className="other-text">{truncateText(`Location: ${venue.location.city}, ${venue.location.country}`, 30)}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default VenuesList;
