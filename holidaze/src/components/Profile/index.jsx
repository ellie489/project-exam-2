import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../services/api/profiles';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import styles from './index.module.css';
import commonStyles from '../../scss/common.module.scss'
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
    <Container className={`${styles.profileContainer} ${commonStyles.commonTransparentContainer}`}>
      {user.banner && (
        <Image src={user.banner.url} alt={user.banner.alt} fluid className={`${styles.profileBanner} ${styles.mb4}`} />
      )}
      <Row className="align-items-center">
        <Col xs={12} md={3} className={styles.textCenter}>
          <Image src={user.avatar.url} alt={user.avatar.alt} roundedCircle className={styles.profileAvatar} />
          <h3 className={styles.mt3}>{user.name}</h3>
        </Col>
        <Col xs={12} md={7}className='mb-3'>
          <p>{user.bio}</p>
        </Col>
      <Col xs={12} md={2} className="text-center m-auto">
                    <Button onClick={handleEditProfile} className="button large primary blue mb-4">Edit Profile</Button>
        </Col> 
        </Row>
    </Container>
  );
};

export default Profile;
