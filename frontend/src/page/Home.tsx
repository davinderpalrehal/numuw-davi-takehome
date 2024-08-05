import { useAuth } from '../contexts/AuthContext.tsx';
import { useLoginModal } from '../contexts/LoginModalContext.tsx';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.tsx';
import Typography from '../components/Typography.tsx';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { setLoginModalOpen } = useLoginModal();
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoginModalOpen(true);
  };

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <Typography variant="displayMedium">
          Supporting Children Empowering Families
        </Typography>

        <Typography variant="subtitle">
          Welcome to Numuw, a specialized platform dedicated to your child's
          development and behavioural health
        </Typography>

        <Typography variant="body">
          Explore how our unique approach can support your family.
        </Typography>

        {user ? (
          <Button className="mt-5" onClick={navigateToDashboard}>
            Go to Dashboard
          </Button>
        ) : (
          <Button className="mt-5" onClick={handleLogin}>
            Login to get started
          </Button>
        )}
      </div>

      <div className="bg-green-100">Side bar content here</div>
    </div>
  );
};

export default Home;
