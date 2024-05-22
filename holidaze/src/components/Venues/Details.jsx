// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchVenueById } from '../../services/api';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { Carousel } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
// import VenueCalendar from '../Calendar';
// import BookingForm from '../Booking/Form';

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//     iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//     shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

// const mapContainerStyle = {
//   height: '400px',
//   width: '100%',
// };

// const VenueDetails = () => {
//     const { id } = useParams();
//     const [venue, setVenue] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const loadVenue = async () => {
//             try {
//                 const venueData = await fetchVenueById(id);
//                 setVenue(venueData.data);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadVenue();
//     }, [id]);

//     if (loading) {
//         return <p>Loading venue details...</p>;
//     }

//     if (error) {
//         return <p className="text-danger">Error: {error}</p>;
//     }

//     const hasCoordinates = venue && venue.location.lat && venue.location.lng;

//     return (
//         <div className="venue-details">
//             {venue && (
//                 <>
//                     <h2>{venue.name}</h2>
//                     {venue.media && venue.media.length > 0 ? (
//                         venue.media.length > 1 ? (
//                             <Carousel>
//                                 {venue.media.map((image, index) => (
//                                     <Carousel.Item key={index}>
//                                         <img
//                                             className="d-block w-100"
//                                             src={image.url}
//                                             alt={image.alt || `Image ${index + 1}`}
//                                         />
//                                     </Carousel.Item>
//                                 ))}
//                             </Carousel>
//                         ) : (
//                             <img
//                                 className="d-block w-100"
//                                 src={venue.media[0].url}
//                                 alt={venue.media[0].alt || 'Venue Image'}
//                             />
//                         )
//                     ) : (
//                         <p>No image available</p>
//                     )}
//                     <p><strong>Description:</strong> {venue.description}</p>
//                     <p><strong>Price:</strong> ${venue.price}</p>
//                     <p><strong>Max Guests:</strong> {venue.maxGuests}</p>
//                     <p><strong>Rating:</strong> {venue.rating}</p>
//                     <p><strong>Created:</strong> {new Date(venue.created).toLocaleDateString()}</p>
//                     <p><strong>Updated:</strong> {new Date(venue.updated).toLocaleDateString()}</p>
//                     <div>
//                         <strong>Meta:</strong>
//                         <ul>
//                             <li>WiFi: {venue.meta.wifi ? 'Yes' : 'No'}</li>
//                             <li>Parking: {venue.meta.parking ? 'Yes' : 'No'}</li>
//                             <li>Breakfast: {venue.meta.breakfast ? 'Yes' : 'No'}</li>
//                             <li>Pets: {venue.meta.pets ? 'Yes' : 'No'}</li>
//                         </ul>
//                     </div>
//                     <div>
//                         <strong>Location:</strong>
//                         <p>{venue.location.address}, {venue.location.city}, {venue.location.zip}, {venue.location.country}, {venue.location.continent}</p>
//                     </div>
//                     {hasCoordinates ? (
//                         <div className="map-container">
//                             <MapContainer center={[venue.location.lat, venue.location.lng]} zoom={13} style={mapContainerStyle}>
//                                 <TileLayer
//                                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                                 />
//                                 <Marker position={[venue.location.lat, venue.location.lng]}>
//                                     <Popup>
//                                         {venue.name} <br /> {venue.location.city}, {venue.location.country}
//                                     </Popup>
//                                 </Marker>
//                             </MapContainer>
//                         </div>
//                     ) : (
//                         <p>Map not available for this venue</p>
//                     )}
//                     <VenueCalendar venueId={id} />
//                     <BookingForm venueId={id} />
//                 </>
//             )}
//         </div>
//     );
// };

// export default VenueDetails;