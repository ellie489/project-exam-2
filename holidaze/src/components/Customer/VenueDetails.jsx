import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVenueById } from '../../services/api/venues';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  
import BookingForm from '../Booking/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './VenueDetails.module.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

const CustomerVenueDetails = () => {
    const { id } = useParams();
    const [venue, setVenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const loadVenue = async () => {
        try {
          const venueData = await fetchVenueById(id);
          setVenue(venueData.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      loadVenue();
    }, [id]);
  
    if (loading) {
      return <p>Loading venue details...</p>;
    }
  
    if (error) {
      return <p className="text-danger">Error: {error}</p>;
    }
  
    const hasCoordinates = venue && venue.location.lat && venue.location.lng;
  
    return (
      <Container>
        {venue && (
          <>
            <Row>
              <Col>
                {venue.media && venue.media.length > 0 ? (
                  venue.media.length > 1 ? (
                    <Carousel>
                      {venue.media.map((image, index) => (
                        <Carousel.Item key={index} className={styles.carouselItem}>
                          <img
                            className="d-block w-100"
                            src={image.url}
                            alt={image.alt || `Image ${index + 1}`}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <img
                      className="d-block w-100"
                      src={venue.media[0].url}
                      alt={venue.media[0].alt || 'Venue Image'}
                    />
                  )
                ) : (
                  <p>No image available</p>
                )}
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={6}>
                <div className="venue-details">
                  <h1>{venue.name}</h1>
                  <p><strong>Description:</strong> {venue.description}</p>
                  <p><strong>Price:</strong> ${venue.price}</p>
                  <p><strong>Max Guests:</strong> {venue.maxGuests}</p>
                  <p><strong>Rating:</strong> {venue.rating}</p>
                  <p><strong>Created:</strong> {new Date(venue.created).toLocaleDateString()}</p>
                  <p><strong>Updated:</strong> {new Date(venue.updated).toLocaleDateString()}</p>
                  <div>
                    <strong>Meta:</strong>
                    <ul className={styles.metaList}>
                        <li>
                          <FontAwesomeIcon icon={venue.meta.wifi ? faCircleCheck : faCircleXmark} style={{ color: venue.meta.wifi ? 'green' : 'red' }} /> WiFi
                        </li>
                        <li>
                          <FontAwesomeIcon icon={venue.meta.parking ? faCircleCheck : faCircleXmark} style={{ color: venue.meta.parking ? 'green' : 'red' }} /> Parking
                        </li>
                        <li>
                          <FontAwesomeIcon icon={venue.meta.breakfast ? faCircleCheck : faCircleXmark} style={{ color: venue.meta.breakfast ? 'green' : 'red' }} /> Breakfast 
                        </li>
                        <li>
                          <FontAwesomeIcon icon={venue.meta.pets ? faCircleCheck : faCircleXmark} style={{ color: venue.meta.pets ? 'green' : 'red' }} /> Pets
                        </li>
                      </ul>
                  </div>
                  <div>
                    <strong>Location:</strong>
                    <p>{venue.location.address}, {venue.location.city}, {venue.location.zip}, {venue.location.country}, {venue.location.continent}</p>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <BookingForm venueId={id} />
              </Col>
            </Row>
            {hasCoordinates && (
              <Row className="mt-4">
                <Col>
                  <div className="map-container">
                    <MapContainer center={[venue.location.lat, venue.location.lng]} zoom={13} style={mapContainerStyle}>
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={[venue.location.lat, venue.location.lng]}>
                        <Popup>
                          {venue.name} <br /> {venue.location.city}, {venue.location.country}
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </Col>
              </Row>
            )}
          </>
        )}
      </Container>
    );
};

export default CustomerVenueDetails;