import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './UserProfile.css';

const UserProfile = () => {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch('https://room-booking-backend-std3.onrender.com/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="profile-not-authenticated">
        <h2>Please log in to view your profile</h2>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-error">
        <h2>Could not load profile data</h2>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <h1>{profile.name}</h1>
        </div>
        
        <div className="profile-details">
          <div className="profile-detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{profile.email}</span>
          </div>
          
          <div className="profile-detail-item">
            <span className="detail-label">Account Status:</span>
            <span className="detail-value">Active</span>
          </div>
          
          <div className="profile-detail-item">
            <span className="detail-label">Member Since:</span>
            <span className="detail-value">
              {profile._id ? new Date(parseInt(profile._id.substring(0, 8), 16) * 1000).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
