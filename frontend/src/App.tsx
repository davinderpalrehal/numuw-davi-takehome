import { useAuth } from './contexts/AuthContext.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './page/Dashboard.tsx';
import { useEffect } from 'react';
import BaseLayout from './layout/BaseLayout.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Chat from './page/Chat.tsx';
import Home from './page/Home.tsx';

const App: React.FC = () => {
  const { user, setUser, setToken } = useAuth();

  useEffect(() => {
    const fetchData = async (token: string) => {
      const user = await fetchUserDetails(token);
      setToken(token);
      setUser(user);
    };

    const token = localStorage.getItem('token');
    if (token && !user) fetchData(token);
  }, [setUser, setToken]);

  return (
    <BrowserRouter>
      <BaseLayout>
        <Routes>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat/:therapistId/:patientId" element={<Chat />} />
          </Route>
        </Routes>
      </BaseLayout>
    </BrowserRouter>
  );
};

export default App;
