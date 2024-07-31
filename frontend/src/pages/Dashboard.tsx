import React, { useEffect, useState } from 'react';
import TherapistView from '../components/TherapistView.tsx';

function Dashboard() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser({
      id: 1,
      username: 'johndoe',
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@me.com',
      user_type: 'therapist',
      picture: 'image-url',
    });
  }, []);

  return (
    <>
      {user.user_type === 'therapist' ? (
        <TherapistView user={user} />
      ) : (
        'Patient view'
      )}
    </>
  );
}

export default Dashboard;
