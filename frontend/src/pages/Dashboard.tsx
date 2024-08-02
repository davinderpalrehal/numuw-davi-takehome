import React, { useEffect, useState } from 'react';
import TherapistView from '../components/TherapistView.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, setToken } from '../state/user/userSlice.ts';

function Dashboard() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      dispatch(fetchUserDetails());
      dispatch(setToken(token));
    }
  }, [dispatch]);

  return (
    <>
      {user && user.user_type === 'therapist' ? (
        <TherapistView />
      ) : (
        'Patient view'
      )}
    </>
  );
}

export default Dashboard;
