import React, { useState } from 'react';
import Button from './Button.tsx';
import { useLoginModal } from '../LoginModalContext.tsx';
import { useDispatch, useSelector } from 'react-redux';

// Define the type of userObj here. Replace `UserType` with the actual type.
type UserType = {
  // properties of the user object
};

function ProfileMenu() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { openLoginModal } = useLoginModal();

  const handleLogin = () => {
    openLoginModal();
  };

  return user ? (
    <h1>User object available {JSON.stringify(user)}</h1>
  ) : (
    <Button onClick={handleLogin}>Log in {JSON.stringify(user)}</Button>
  );
}

export default ProfileMenu;
