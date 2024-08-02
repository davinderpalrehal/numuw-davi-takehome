import { LoginModalProvider, useLoginModal } from './LoginModalContext.tsx';
import LoginModal from './components/LoginModal.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import ProfileMenu from './components/ProfileMenu.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Chat from './pages/Chat.tsx';
import { useDispatch } from 'react-redux';
import { fetchUserDetails, setToken } from './state/user/userSlice.ts';
import { useEffect } from 'react';

function BaseLayout({ children }) {
  const { showLoginModal } = useLoginModal();

  return (
    <>
      <header className="border-b border-teal-500">
        <div className="h-20 container mx-auto flex justify-between items-center">
          <h1 className="font-sans text-xl">Numuw Chat</h1>
          <ProfileMenu />
        </div>
      </header>
      <main className="flex-grow py-5">
        <div className="container flex-grow mx-auto">{children}</div>
      </main>
      <footer className="h-32 bg-slate-400">
        <div className="container mx-auto pt-5">This is the footer</div>
      </footer>
      {showLoginModal && <LoginModal />}
    </>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUserDetails());
      dispatch(setToken(token));
    }
  }, [dispatch]);

  return (
    <LoginModalProvider>
      <BrowserRouter>
        <BaseLayout>
          <Routes>
            <Route index element={<Home />} />
            {/* TODO: This should be a protected route*/}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat/:therapistId/:patientId" element={<Chat />} />
          </Routes>
        </BaseLayout>
      </BrowserRouter>
    </LoginModalProvider>
  );
}

export default App;
