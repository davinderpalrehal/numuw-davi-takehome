import { useAuth } from '../contexts/AuthContext.tsx';
import { useLoginModal } from '../contexts/LoginModalContext.tsx';
import Button from './Button.tsx';
import Typography from './Typography.tsx';

const ProfileMenu: React.FC = () => {
  const { user } = useAuth();
  const { setLoginModalOpen } = useLoginModal();

  const handleLogin = () => {
    setLoginModalOpen(true);
  };

  return user ? (
    <div className="flex items-center">
      <Typography variant="buttonText" className="mr-2">
        {user.first_name} {user.last_name}
      </Typography>
      <img
        src={import.meta.env.VITE_API_URL + user.profile_picture}
        alt={`${user.first_name} ${user.last_name}'s profile picture`}
        className="rounded-full w-10 h-10"
      />
    </div>
  ) : (
    <Button onClick={handleLogin}>Log in</Button>
  );
};

export default ProfileMenu;
