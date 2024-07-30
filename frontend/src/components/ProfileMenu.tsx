import React, { useState } from 'react';
import Button from './Button.tsx';
import { useLoginModal } from '../LoginModalContext.tsx';

// Define the type of userObj here. Replace `UserType` with the actual type.
type UserType = {
  // properties of the user object
};

function ProfileMenu() {
  const [userObj, setUserObj] = useState<UserType | null>(null);
  const { openLoginModal } = useLoginModal();

  const handleLogin = () => {
    openLoginModal();
  };

  return userObj ? (
    <h1>User object available</h1>
  ) : (
    <Button onClick={handleLogin}>Log in</Button>
  );
}

export default ProfileMenu;
