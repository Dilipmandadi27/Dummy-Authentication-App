import React from 'react'
import { useEffect, useState } from 'react';

    const ProfilePage = ({ user, handleLogout }) => {
        const [profile, setProfile] = useState(null);
      
        useEffect(() => {
          const fetchProfileData = async () => {
            if (user) {
              try {
                const response = await fetch(`https://dummyjson.com/users/${user.id}`);
                const result = await response.json();
      
                if (response.ok) {
                  setProfile(result);
                } else {
                  handleLogout();
                }
              } catch (err) {
                handleLogout();
              }
            }
          };
      
          fetchProfileData();
        }, [user, handleLogout]);
      
        if (!profile) return <div>Loading...</div>;
      

  return (
 <div className="profile-container">
      <h2>Profile Page</h2>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>First Name:</strong> {profile.firstName}</p>
      <p><strong>Last Name:</strong> {profile.lastName}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default ProfilePage
