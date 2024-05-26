import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { fetchVenueById, updateVenue } from '../../services/api/venues';
import 'leaflet/dist/leaflet.css';
import ErrorBox from '../ErrorBox'; 
import styles from './Form.module.css'
const EditVenue = () => {
    const { id } = useParams();
    const [venueData, setVenueData] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadVenue = async () => {
            try {
                const response = await fetchVenueById(id, { _bookings: false });
                setVenueData(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        loadVenue();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setVenueData((prevData) => ({
                ...prevData,
                meta: {
                    ...prevData.meta,
                    [name]: checked,
                },
            }));
        } else if (name.startsWith('location.')) {
            const key = name.split('.')[1];
            setVenueData((prevData) => ({
                ...prevData,
                location: {
                    ...prevData.location,
                    [key]: value,
                },
            }));
        } else if (name.startsWith('media.')) {
            const [_, index, key] = name.split('.');
            const newMedia = [...venueData.media];
            newMedia[index] = { ...newMedia[index], [key]: value };
            setVenueData((prevData) => ({
                ...prevData,
                media: newMedia,
            }));
        } else {
            setVenueData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleMapClick = (e) => {
        setVenueData((prevData) => ({
            ...prevData,
            location: {
                ...prevData.location,
                lat: e.latlng.lat,
                lng: e.latlng.lng,
            },
        }));
    };

    const MapClickHandler = () => {
        useMapEvents({
            click: handleMapClick,
        });
        return null;
    };

    const handleAddMedia = () => {
        setVenueData((prevData) => ({
            ...prevData,
            media: [...prevData.media, { url: '', alt: '' }],
        }));
    };

    const handleRemoveMedia = (index) => {
        setVenueData((prevData) => ({
            ...prevData,
            media: prevData.media.filter((_, i) => i !== index),
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!venueData.name) newErrors.name = 'Name is required';
        if (!venueData.description) newErrors.description = 'Description is required';
        if (!venueData.price) newErrors.price = 'Price is required';
        if (!venueData.maxGuests) newErrors.maxGuests = 'Max Guests is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

    
        const venueDataToSend = {
            ...venueData,
            price: Number(venueData.price),
            maxGuests: Number(venueData.maxGuests),
        };

        try {
            await updateVenue(id, venueDataToSend);
            setSuccess('Venue updated successfully!');
            setError(null);
            navigate(`/venues/manager/${id}`);
        } catch (error) {
            setError(error.message);
            setSuccess(null);
        }
    };

    const handleCancel = () => {
        navigate(-1); 
    };

    if (!venueData) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.formBox}>
            <h2>Edit Venue</h2>
            {error && <p className="text-danger">Error: {error}</p>}
            {success && <p className="text-success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={venueData.name}
                        onChange={handleChange}
                        required
                    />
                    {error?.name && <p className="text-danger">{error.name}</p>}
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={venueData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                    {error?.description && <p className="text-danger">{error.description}</p>}
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={venueData.price}
                        onChange={handleChange}
                        required
                    />
                    {error?.price && <p className="text-danger">{error.price}</p>}
                </div>
                <div className="form-group">
                    <label>Max Guests</label>
                    <input
                        type="number"
                        className="form-control"
                        name="maxGuests"
                        value={venueData.maxGuests}
                        onChange={handleChange}
                        required
                    />
                    {error?.maxGuests && <p className="text-danger">{error.maxGuests}</p>}
                </div>
                <div className="form-group">
                    <label>Media</label>
                    {venueData.media.map((media, index) => (
                        <div key={index} className="media-input-group">
                            <input
                                type="url"
                                className="form-control"
                                name={`media.${index}.url`}
                                value={media.url}
                                onChange={handleChange}
                                placeholder="Image URL"
                            />
                            <input
                                type="text"
                                className="form-control"
                                name={`media.${index}.alt`}
                                value={media.alt}
                                onChange={handleChange}
                                placeholder="Alt Text"
                            />
                            <button
                                type="button"
                                className="button small primary red py-2 mt-2"
                                onClick={() => handleRemoveMedia(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="button small primary green py-2 mt-2"
                        onClick={handleAddMedia}
                    >
                        Add More
                    </button>
                </div>
                <div className="form-group">
                    <label>Meta</label>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="wifi"
                            checked={venueData.meta.wifi}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">WiFi</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="parking"
                            checked={venueData.meta.parking}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Parking</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="breakfast"
                            checked={venueData.meta.breakfast}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Breakfast</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="pets"
                            checked={venueData.meta.pets}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Pets</label>
                    </div>
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        className="form-control"
                        name="location.address"
                        value={venueData.location.address}
                        onChange={handleChange}
                        placeholder="Address"
                    />
                    <input
                        type="text"
                        className="form-control"
                        name="location.city"
                        value={venueData.location.city}
                        onChange={handleChange}
                        placeholder="City"
                    />
                    <input
                        type="text"
                        className="form-control"
                        name="location.zip"
                        value={venueData.location.zip}
                        onChange={handleChange}
                        placeholder="Zip"
                    />
                    <input
                        type="text"
                        className="form-control"
                        name="location.country"
                        value={venueData.location.country}
                        onChange={handleChange}
                        placeholder="Country"
                    />
                    <input
                        type="text"
                        className="form-control"
                        name="location.continent"
                        value={venueData.location.continent}
                        onChange={handleChange}
                        placeholder="Continent"
                    />
                </div>
                <div className="form-group">
                    <label>Map Location</label>
                    <MapContainer center={[venueData.location.lat || 51.505, venueData.location.lng || -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <MapClickHandler />
                        {venueData.location.lat !== 0 && venueData.location.lng !== 0 && (
                            <Marker position={[venueData.location.lat, venueData.location.lng]} />
                        )}
                    </MapContainer>
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
            {error && <ErrorBox message={error} />}
        </div>
    );
};

export default EditVenue;
