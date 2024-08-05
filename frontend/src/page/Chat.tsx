import { useEffect, useState } from 'react';
import { User, UserType } from '../types';
import TherapistChat from './TherapistChat.tsx';
import ParentChat from './ParentChat.tsx';
import { useParams } from 'react-router-dom';

const Chat: React.FC = () => {
  const { therapistId, parentId } = useParams<{
    therapistId: string;
    parentId: string;
  }>();
  const [user, setUser] = useState<User | null>(null); // TODO: Do I really need this?

  useEffect(() => {
    setUser({
      id: 1,
      username: 'johndoe',
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@me.com',
      user_type: UserType.Therapist,
      picture: 'image-url',
    });
  }, []);

  return (
    <>
      {user?.user_type === UserType.Therapist ? (
        <TherapistChat />
      ) : (
        <ParentChat />
      )}
    </>
  );
};

export default Chat;
