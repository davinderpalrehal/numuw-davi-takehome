import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TherapistChat from '../components/TherapistChat.tsx';

function Chat() {
  const { therapistId, patientId } = useParams();
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
        <TherapistChat user={user} />
      ) : (
        'Patient view'
      )}
    </>
  );
}

export default Chat;
