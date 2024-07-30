import Typography from './Typography.tsx';
import Button from './Button.tsx';
import { useLoginModal } from '../LoginModalContext.tsx';

function LoginModal({ onClose }) {
  const { closeLoginModal } = useLoginModal();

  const handleClose = () => {
    console.log('Closing the modal');
    closeLoginModal();
  };

  const handleLogin = () => {
    // TODO: Implement login functionality here
    console.log('Handle the login');
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
      <div className="bg-white rounded shadow">
        <div className="px-6 pt-6 pb-3 border-b border-blue-300">
          <Typography variant="subtitle">Login</Typography>
        </div>
        <div className="p-6 min-w-[300px] max-w-[500px] w-screen">
          <input
            type="text"
            placeholder="username"
            className="block p-4 my-2 w-full"
          />
          <input
            type="password"
            placeholder="password"
            className="block p-4 my-2 w-full"
          />
          <div className="flex justify-between pt-10">
            <Button onClick={handleClose} variant="danger">
              Close
            </Button>
            <Button onClick={handleLogin}>Login</Button>
          </div>
        </div>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full -z-10 bg-slate-900/70 backdrop-blur"
        onClick={handleClose}
      ></div>
    </div>
  );
}

export default LoginModal;
