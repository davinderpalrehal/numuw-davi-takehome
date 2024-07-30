import { LoginModalProvider, useLoginModal } from './LoginModalContext.tsx';
import LoginModal from './components/LoginModal.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import ProfileMenu from './components/ProfileMenu.tsx';

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
      <footer className="h-48 bg-slate-400">
        <div className="container mx-auto pt-5">This is the footer</div>
      </footer>
      {showLoginModal && <LoginModal />}
    </>
  );
}

function App() {
  return (
    <LoginModalProvider>
      <BrowserRouter>
        <BaseLayout>
          <Routes>
            <Route index element={<Home />} />
          </Routes>
        </BaseLayout>
      </BrowserRouter>
    </LoginModalProvider>
  );
}

export default App;
