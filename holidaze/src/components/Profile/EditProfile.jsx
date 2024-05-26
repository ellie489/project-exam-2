import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile, fetchUserProfile } from '../../services/api/profiles';
import styles from './EditProfile.module.css';

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
            const response = await updateUserProfile(username, { avatar: { url: avatarUrl }, bio, banner: { url: bannerUrl } });
            setSuccess(true);
            setError(null);
            navigate('/profile');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCancel = () => {
        navigate('/profile');
    };

    return (
        <div className={styles.formContainer}>
            <h2>Edit Profile</h2>
            {success && <p className="text-success">Profile updated successfully!</p>}
            {error && <p className="text-danger">Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-12 col-md-6">
                        <div className={`form-group ${styles.formGroup}`}>
                            <label>Avatar URL</label>
                            <input
                                type="url"
                                className={`form-control ${styles.inputField}`}
                                value={avatarUrl}
                                onChange={(e) => setAvatarUrl(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className={`form-group ${styles.formGroup}`}>
                            <label>Banner URL</label>
                            <input
                                type="url"
                                className={`form-control ${styles.inputField}`}
                                value={bannerUrl}
                                onChange={(e) => setBannerUrl(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12">
                        <div className={`form-group ${styles.formGroup}`}>
                            <label>Bio</label>
                            <textarea
                                className={`form-control ${styles.inputTextarea}`}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="row">
    <div className="col-12 d-flex flex-column flex-md-row justify-content-center align-items-center">
        <button type="submit" className="button large primary green mb-2 mb-md-0 me-md-2">Save Profile</button>
        <button type="button" onClick={handleCancel} className="button large secondary green">Cancel</button>
    </div>
</div>

            </form>
        </div>
    );
};

export default EditProfile;
