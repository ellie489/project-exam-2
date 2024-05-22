import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile, fetchUserProfile } from '../../services/api/profiles';

const EditProfile = () => {
    const [avatarUrl, setAvatarUrl] = useState('');
    const [bio, setBio] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const username = localStorage.getItem('username');
                const profileData = await fetchUserProfile(username);
                setAvatarUrl(profileData.data.avatar.url || ''); 
                setBio(profileData.data.bio || ''); 
                setBannerUrl(profileData.data.banner.url || ''); 
            } catch (error) {
                setError(error.message);
            }
        };

        loadUserProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!avatarUrl && !bio && !bannerUrl) {
            setError('Please fill at least one field to update your profile.');
            return;
        }

        try {
            const username = localStorage.getItem('username');
            console.log('Updating profile for username:', username); 
            console.log('Profile data:', { avatar: { url: avatarUrl }, bio, banner: { url: bannerUrl } }); 

            const response = await updateUserProfile(username, { avatar: { url: avatarUrl }, bio, banner: { url: bannerUrl } });
            console.log('Response from updating profile:', response); 

            setSuccess(true);
            setError(null);
            navigate('/profile');
        } catch (error) {
            console.error('Error updating profile:', error); 
            setError(error.message);
        }
    };

    return (
        <div className="edit-profile-form">
            <h2>Edit Profile</h2>
            {success && <p className="text-success">Profile updated successfully!</p>}
            {error && <p className="text-danger">Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Avatar URL</label>
                    <input
                        type="url"
                        className="form-control"
                        value={avatarUrl}
                        onChange={(e) => {
                            console.log('Avatar URL changed:', e.target.value); 
                            setAvatarUrl(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Bio</label>
                    <textarea
                        className="form-control"
                        value={bio}
                        onChange={(e) => {
                            console.log('Bio changed:', e.target.value); 
                            setBio(e.target.value);
                        }}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Banner URL</label>
                    <input
                        type="url"
                        className="form-control"
                        value={bannerUrl}
                        onChange={(e) => {
                            console.log('Banner URL changed:', e.target.value); 
                            setBannerUrl(e.target.value);
                        }}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;
