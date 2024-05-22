import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../services/api/profiles';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const username = localStorage.getItem('username');
                const profileData = await fetchUserProfile(username);
                setUser(profileData.data);
            } catch (error) {
                setError(error.message);
            }
        };

        loadUserProfile();
    }, []);

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile">
            <div className="profile-banner">
                <img src={user.banner.url} alt={user.banner.alt} />
            </div>
            <div className="profile-avatar">
                <img src={user.avatar.url} alt={user.avatar.alt} />
            </div>
            <div className="profile-info">
                <h2>{user.name}</h2>
                <p>{user.bio}</p>
            </div>
            <button onClick={handleEditProfile} className="btn btn-primary">Edit Profile</button>
        </div>
    );
};

export default Profile;
