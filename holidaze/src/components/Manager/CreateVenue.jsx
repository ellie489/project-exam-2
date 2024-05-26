import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { createVenue } from '../../services/api/venues';
import 'leaflet/dist/leaflet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from './Form.module.css';

const CreateVenue = () => {
    const [venueData, setVenueData] = useState({
        name: '',
        description: '',
        media: [{ url: '', alt: '' }],
        price: '',
        maxGuests: '',
        rating: 0,
        meta: {
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false,
        },
        location: {
            address: '',
            city: '',
            zip: '',
            country: '',
            continent: '',
            lat: 0,
            lng: 0,
        },
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

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
            setErrors(newErrors);
            return;
        }

        const venueDataToSend = {
            ...venueData,
            price: Number(venueData.price),
            maxGuests: Number(venueData.maxGuests),
        };

        try {
            const response = await createVenue(venueDataToSend);
            setSuccess('Venue created successfully!');
            setErrors({});
            navigate(`/create-venue-success/${response.data.id}`);
        } catch (error) {
            setErrors({ form: error.message });
            setSuccess(null);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const incrementGuests = () => {
        setVenueData((prevData) => ({
            ...prevData,
            maxGuests: prevData.maxGuests + 1,
        }));
    };

    const decrementGuests = () => {
        setVenueData((prevData) => ({
            ...prevData,
            maxGuests: Math.max(prevData.maxGuests - 1, 1),
        }));
    };

    return (
        <div className={styles.formBox}>
            <h2>Create a New Venue</h2>
            {errors.form && <p className="text-danger">Error: {errors.form}</p>}
            {success && <p className="text-success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Name</label>
                    <input
                        type="text"
                        className={styles.inputField}
                        name="name"
                        value={venueData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <p className="text-danger">{errors.name}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label>Description</label>
                    <textarea
                        className={styles.inputField}
                        name="description"
                        value={venueData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                    {errors.description && <p className="text-danger">{errors.description}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label>Price</label>
                    <input
                        type="number"
                        className={styles.inputField}
                        name="price"
                        value={venueData.price}
                        onChange={handleChange}
                        required
                    />
                    {errors.price && <p className="text-danger">{errors.price}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label>Max Guests</label>
                    <div className={styles.guestsInputContainer}>
                        <button
                            type="button"
                            className={styles.guestsButton}
                            onClick={decrementGuests}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <input
                            type="number"
                            className={styles.guestsInput}
                            name="maxGuests"
                            value={venueData.maxGuests}
                            onChange={handleChange}
                            min="1"
                        />
                        <button
                            type="button"
                            className={styles.guestsButton}
                            onClick={incrementGuests}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                    {errors.maxGuests && <p className="text-danger">{errors.maxGuests}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label>Media</label>
                    {venueData.media.map((media, index) => (
                        <div key={index} className={styles.mediaInputGroup}>
                            <input
                                type="url"
                                className={styles.inputField}
                                name={`media.${index}.url`}
                                value={media.url}
                                onChange={handleChange}
                                placeholder="Image URL"
                            />
                            <input
                                type="text"
                                className={styles.inputField}
                                name={`media.${index}.alt`}
                                value={media.alt}
                                onChange={handleChange}
                                placeholder="Alt Text"
                            />
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleRemoveMedia(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleAddMedia}
                    >
                        Add More
                    </button>
                </div>
                <div className={styles.formGroup}>
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
                <div className={styles.formGroup}>
                    <label>Location</label>
                    <input
                        type="text"
                        className={styles.inputField}
                        name="location.address"
                        value={venueData.location.address}
                        onChange={handleChange}
                        placeholder="Address"
                    />
                    <input
                        type="text"
                        className={styles.inputField}
                        name="location.city"
                        value={venueData.location.city}
                        onChange={handleChange}
                        placeholder="City"
                    />
                    <input
                        type="text"
                        className={styles.inputField}
                        name="location.zip"
                        value={venueData.location.zip}
                        onChange={handleChange}
                        placeholder="Zip"
                    />
                    <input
                        type="text"
                        className={styles.inputField}
                        name="location.country"
                        value={venueData.location.country}
                        onChange={handleChange}
                        placeholder="Country"
                    />
                    <input
                        type="text"
                        className={styles.inputField}
                        name="location.continent"
                        value={venueData.location.continent}
                        onChange={handleChange}
                        placeholder="Continent"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Map Location</label>
                    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
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
                <button type="submit" className={`${styles.submitButton} button primary green large`}>Create Venue</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default CreateVenue;
