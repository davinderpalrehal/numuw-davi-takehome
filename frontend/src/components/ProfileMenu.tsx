import React, { useState } from 'react';
import Button from './Button.tsx';
import { useLoginModal } from '../LoginModalContext.tsx';
import { useDispatch, useSelector } from 'react-redux';
import Typography from './Typography.tsx';

function ProfileMenu() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { openLoginModal } = useLoginModal();

  const handleLogin = () => {
    openLoginModal();
  };

  return user ? (
    <div className="flex items-center">
      <Typography variant="buttonText" className="mr-2">
        {user.first_name} {user.last_name}
      </Typography>
      <img
        src={`${import.meta.env.VITE_API_URL}${user.profile_picture}`}
        alt=""
        className="rounded-full w-10 h-10"
      />
    </div>
  ) : (
    <Button onClick={handleLogin}>Log in {JSON.stringify(user)}</Button>
  );
}

export default ProfileMenu;
