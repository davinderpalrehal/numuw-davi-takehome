import Typography from '../components/Typography.tsx';
import Button from '../components/Button.tsx';
import { useLoginModal } from '../LoginModalContext.tsx';

function Home() {
  const { openLoginModal } = useLoginModal();

  const handleLogin = () => {
    openLoginModal();
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <Typography variant="displayMedium">
          Supporting Children Empowering Families
        </Typography>
        <Typography variant="subtitle">
          Welcome to Numuw, a specialized platform dedicated to your child's
          development and behavioral health
        </Typography>
        <Typography variant="body">
          Explore how our unique approach can support your family
        </Typography>
        <Button className="mt-5" onClick={handleLogin}>
          Login to get started
        </Button>
      </div>
      <div className="bg-green-100"></div>
    </div>
  );
}

export default Home;
