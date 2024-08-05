import LoginModal from '../components/LoginModal.tsx';
import ProfileMenu from '../components/ProfileMenu.tsx';
import Typography from '../components/Typography';
import { useLoginModal } from '../contexts/LoginModalContext.tsx';

const BaseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoginModalOpen } = useLoginModal();

  return (
    <>
      <header className="border-b border-teal-500">
        <div className="h-20 container mx-auto flex justify-between items-center">
          <Typography>Numuw Chat</Typography>
          <ProfileMenu />
        </div>
      </header>

      <main className="flex-grow py-5">
        <div className="container flex-grow mx-auto">{children}</div>
      </main>

      <footer className="h-32 bg-slate-400">
        <div className="container mx-auto pt-5">This is the footer</div>
      </footer>

      {isLoginModalOpen && <LoginModal />}
    </>
  );
};

export default BaseLayout;
