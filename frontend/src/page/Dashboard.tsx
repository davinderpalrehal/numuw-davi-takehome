import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import TherapistDashboard from './TherapistDashboard.tsx';
import ParentDashboard from './ParentDashboard.tsx';

const Dashboard: React.FC = () => {
  const { user, setUser, setToken } = useAuth();

  useEffect(() => {
    const fetchData = async (token: string) => {
      // TODO: Check this out
      // const userDetails = await fetchUserDetails(token);
      // setToken(token);
      // setUser(userDetails);
    };

    const token = localStorage.getItem('token');
    if (token && !user) fetchData(token);
  }, [user, setUser, setToken]);

  return (
    <>
      {user && user.user_type === 'therapist' ? (
        <TherapistDashboard />
      ) : (
        <ParentDashboard />
      )}
    </>
  );
};

export default Dashboard;
